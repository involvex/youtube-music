# Upstream Integration Plan: pear-desktop → youtube-music

## Overview

Integrate 319 upstream commits from `pear-devs/pear-desktop` into local `involvex/youtube-music` while preserving 39 local custom commits.

**Key decisions:**

- **Merge strategy**: Interactive merge (resolve conflicts manually)
- **Linter**: Keep local ESLint (reject upstream oxlint migration)
- **Bun support**: Keep all Bun-related files and scripts
- **Winget workflows**: Keep deleted (not re-added)
- **Branding**: Preserve "YTMusic Involvex-Edition"

---

## Pre-Merge Safety

```bash
# 1. Create backup branch
git branch backup/pre-upstream-merge-$(Get-Date -Format 'yyyyMMdd')

# 2. Verify clean working tree
git status
```

---

## Phase 1: Start the Merge

```bash
git merge upstream/master --no-commit
```

This will produce ~50+ conflicts. Do NOT commit yet.

---

## Phase 2: Resolve Conflicts by Category

### Step 2.1 — Delete unwanted files (upstream adds but we reject)

```powershell
# Reject oxlint config files (keeping ESLint)
Remove-Item -Path ".oxfmtrc.json" -ErrorAction SilentlyContinue
Remove-Item -Path ".oxlintrc.json" -ErrorAction SilentlyContinue

# Delete winget workflows (keeping deleted)
Remove-Item -Path ".github/workflows/winget-cla.yml" -ErrorAction SilentlyContinue
Remove-Item -Path ".github/workflows/winget-submission.yml" -ErrorAction SilentlyContinue
Remove-Item -Path "src/plugins/shortcuts/mpris-service.d.ts" -ErrorAction SilentlyContinue

# Stage deletions
git add -u
```

### Step 2.2 — Accept upstream version for i18n resources

All translation files (`src/i18n/resources/*.json`) should use the upstream version since upstream has 100+ Weblate translation updates:

```powershell
# Accept upstream for ALL translation files
$translationFiles = git diff --name-only --diff-filter=U -- "src/i18n/resources/*.json"
foreach ($file in $translationFiles) {
    git checkout --theirs $file
    git add $file
}
```

### Step 2.3 — Accept upstream for binary assets

All icons, tray images, etc. — take upstream's updated versions:

```powershell
# Accept upstream for all binary/asset files
$assetFiles = git diff --name-only --diff-filter=U -- "assets/**"
foreach ($file in $assetFiles) {
    git checkout --theirs $file
    git add $file
}
```

### Step 2.4 — Accept upstream for changelog

```powershell
git checkout --theirs changelog.md
git add changelog.md
```

### Step 2.5 — Keep local for custom-only files

These files exist only locally or contain significant local customizations that upstream doesn't have. Use `--ours` to keep:

```powershell
# Custom files to keep as-is (ours)
$keepLocalFiles = @(
    "eslint.config.mjs"
    "BUN_README.md"
    "CONTRIBUTING.md"
    "AGENTS.md"
    "postcss.config.cjs"
    "cspell.config.json"
    "bun-plugins/solid.config.js"
    "bun.lock"
    "bunfig.toml"
    "tsconfig.bun.json"
    ".env.development"
    ".env.example"
    ".env.production"
    "plans/bun-configuration-plan.md"
    "src/index-fixed.ts"
    "src/mdui.d.ts"
    "src/electron-is.d.ts"
    "src/zlib-shim.ts"
    "src/dev-server.ts"
    "simple-server.ts"
    "test-dev-server.js"
    "test-server-simple.js"
    "test-server.ts"
    "test-typescript.mjs"
    "src/plugins/activity-guardian/index.ts"
    "src/plugins/activity-guardian/main.ts"
    "src/plugins/activity-guardian/menu.ts"
    "src/plugins/activity-guardian/renderer.ts"
    "src/plugins/ad-speedup/index.ts"
    "src/plugins/adblocker/index.ts"
    "src/plugins/downloader/main/network-utils.ts"
    "src/plugins/downloader/types.ts"
    "src/plugins/example-plugin/index.ts"
)

foreach ($file in $keepLocalFiles) {
    git checkout --ours $file 2>$null
    git add $file 2>$null
}
```

### Step 2.6 — Keep local docs directory

```powershell
# Keep local docs/ entirely
$docFiles = git diff --name-only --diff-filter=U -- "docs/"
foreach ($file in $docFiles) {
    git checkout --ours $file 2>$null
    git add $file 2>$null
}
```

---

## Phase 3: Manual Conflict Resolution

### 3.1 — `package.json` (CRITICAL)

Resolution strategy: **Hybrid merge** — keep local branding, merge dependencies and scripts.

**Keep LOCAL:**

- `name`: `"ytmusic-involvex"`
- `desktopName`: `"com.github.involvex.ytmusic"`
- `productName`: `"YTMusic Involvex-Edition"`
- `repository`: `"https://github.com/involvex/youtube-music"`
- `author.name`: `"involvex"`, `author.email`: `"lukaswill97@gmail.com"`, `author.url`: `"https://involvex.github.io/Involvex/"`
- `workspaces`: `["docs"]`
- `pnpm.neverBuiltDependencies`: `[]`

**Keep LOCAL scripts (add to upstream's script list):**

- `lint`: `"pnpm eslint src/ electron.vite.config.mts"` (NOT oxlint)
- `lint:fix`: `"pnpm eslint src/ electron.vite.config.mts --fix"`
- `format`: `"pnpm prettier --write ."` (NOT oxfmt)
- `format:check`: `"pnpm prettier --check ."`
- `prebuild`: `"pnpm format && pnpm lint:fix && pnpm typecheck"`
- All `docs:*` scripts
- All `bun:*` scripts
- `dev:standalone*` scripts

**Accept UPSTREAM scripts (add new ones):**

- `postinstall`: `"pnpm install-electron"`
- `check`: `"pnpm lint && pnpm format:check && pnpm typecheck"`

**Accept UPSTREAM versions for ALL dependencies** (major upgrades):

- electron: 39 → 42.5.0
- electron-vite: 5.0.0 → 6.0.0-beta.1
- vite: rolldown-vite → 8.1.0
- typescript: 5.9.3 → 7.0.1-rc
- solid-js: 1.9.10 → 1.9.13
- hono: 4.11.1 → 4.12.27
- i18next: 25.7.3 → 26.3.3
- youtubei.js: 16.0.1 → 17.2.0
- And all other version bumps from upstream

**Keep LOCAL devDependencies (for ESLint):**

- `@eslint/js`
- `eslint`
- `eslint-config-prettier`
- `eslint-import-resolver-exports`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `eslint-plugin-prettier`
- `eslint-plugin-solid`
- `prettier`
- `typescript-eslint`
- Add back any local-only devDeps that upstream removed

**Add UPSTREAM new devDependencies:**

- `oxfmt`, `oxlint`, `oxlint-tsgolint` — **SKIP (keeping ESLint)**
- `@types/ws`
- `eslint-plugin-perfectionist`
- Version bumps for existing deps

**Set `engines.pnpm` to `>=10`** (keep local, upstream wants >=11)

### 3.2 — `tsconfig.json`

Take upstream version with one modification: keep local path aliases (already identical in both). The upstream version adds `"playwright.config.ts"` to the `include` array — accept this.

```powershell
git checkout --theirs tsconfig.json
git add tsconfig.json
```

Then verify path aliases are intact: `"@/*": ["./src/*"]`, `"@assets/*": ["./assets/*"]`

### 3.3 — `electron.vite.config.mts`

Manual merge needed. Upstream migrated to Vite 8/Rolldown. Key differences:

- Upstream uses `rolldown-vite` instead of `vite`
- Upstream removed some Vite plugins that local depends on
- Keep local Vite plugins (i18n-importer, plugin-importer)

**Resolution**: Start from upstream, re-add local plugin imports and configuration.

### 3.4 — `electron-builder.yml`

Take upstream version, then re-add any local customizations:

```powershell
git checkout --theirs electron-builder.yml
git add electron-builder.yml
```

### 3.5 — `pnpm-workspace.yaml`

Keep local version (has docs workspace):

```powershell
git checkout --ours pnpm-workspace.yaml
git add pnpm-workspace.yaml
```

### 3.6 — `src/config/store.ts`

Merge both versions:

- Accept upstream's `>=3.12.0` migration (adblocker → do-not-track)
- Accept upstream's require() pattern for electron-store (Rolldown compatibility)
- Keep local import of `DefaultPresetList` from downloader/types
- Accept upstream's additional imports (do-not-track types)

### 3.7 — `src/config/plugins.ts`

Take upstream version (it properly imports `allPlugins` from `virtual:plugins`):

```powershell
git checkout --theirs src/config/plugins.ts
git add src/config/plugins.ts
```

### 3.8 — `src/index.ts` (CRITICAL — 1006 lines local)

This is the most complex conflict. Manual resolution needed.

**Keep LOCAL:**

- WM_CLASS: `'com.github.th_ch.pear_music'` → change to `'com.github.involvex.ytmusic'`
- Shortcut description: `'Pear Desktop App...'` → `'YTMusic Involvex-Edition...'`
- App description in shortcut: Update branding
- Custom `removeContentSecurityPolicy` implementation (upstream uses `@jellybrick/electron-better-web-request`)
- The inline `enhanceWebRequest` function (local workaround)
- Commented-out auto-updater code

**Accept UPSTREAM:**

- Import order (alphabetical)
- `APPLICATION_NAME` from `@/i18n`
- `electronUpdater` import (proper named import)
- Updated `BetterSession` type usage
- Any new feature additions (do-not-track integration, etc.)

### 3.9 — `src/renderer.ts`

Merge both:

- Accept upstream rendering improvements
- Keep any local customizations

### 3.10 — `src/loader/renderer.ts`

Take upstream version:

```powershell
git checkout --theirs src/loader/renderer.ts
git add src/loader/renderer.ts
```

### 3.11 — `src/loader/main.ts`

Manual merge — both sides have changes:

- Accept upstream's loader improvements
- Keep local plugin loading if customized

### 3.12 — `src/tray.ts`

Merge both:

- Accept upstream tray improvements
- Verify local icon paths are correct

### 3.13 — Plugin conflicts (resolve individually)

| Plugin               | Strategy      | Notes                                                |
| -------------------- | ------------- | ---------------------------------------------------- |
| `album-actions`      | Take upstream | Template updates                                     |
| `album-color-theme`  | Take upstream | Bug fixes                                            |
| `auth-proxy-adapter` | Merge         | Accept upstream backend changes, keep local types    |
| `discord`            | Merge         | Accept upstream memory leak fix, keep local branding |
| `downloader`         | Merge         | Accept upstream changes, keep local network-utils    |
| `in-app-menu`        | Merge         | Accept upstream TitleBar changes                     |
| `navigation`         | Take upstream | Navigation improvements                              |
| `precise-volume`     | Take upstream | Override fixes                                       |
| `shortcuts/mpris.ts` | Take upstream | Version bump fixes                                   |
| `synced-lyrics`      | Take upstream | LRC parser, romanization improvements                |
| `visualizer`         | Take upstream | Refactored implementations                           |
| `transparent-player` | Take upstream | Linux/macOS support                                  |

For each plugin:

```powershell
git checkout --theirs <plugin-file-path>
git add <plugin-file-path>
```

### 3.14 — Type definitions

| File                               | Strategy                          |
| ---------------------------------- | --------------------------------- |
| `src/types/contexts.ts`            | Merge — add upstream type changes |
| `src/types/datahost-get-state.ts`  | Take upstream                     |
| `src/types/get-player-response.ts` | Take upstream                     |

### 3.15 — CI/CD Workflows

| File                                       | Strategy                                               |
| ------------------------------------------ | ------------------------------------------------------ |
| `.github/workflows/build.yml`              | Merge — keep local triggers, accept security hardening |
| `.github/workflows/dependency-review.yml`  | Take upstream (action version updates)                 |
| `.github/workflows/pr-build-artifacts.yml` | Take upstream                                          |
| `.github/workflows/reviewdog.yml`          | Take upstream (improvements)                           |

### 3.16 — `src/providers/song-info-front.ts`

Take upstream version:

```powershell
git checkout --theirs src/providers/song-info-front.ts
git add src/providers/song-info-front.ts
```

### 3.17 — `src/utils/index.ts`

Take upstream version:

```powershell
git checkout --theirs src/utils/index.ts
git add src/utils/index.ts
```

### 3.18 — Vite plugins

| File                               | Strategy                                         |
| ---------------------------------- | ------------------------------------------------ |
| `vite-plugins/i18n-importer.mts`   | Merge — accept upstream fixes, keep local config |
| `vite-plugins/plugin-importer.mts` | Merge — accept upstream fixes, keep local config |

### 3.19 — `tests/index.test.js`

Take upstream version:

```powershell
git checkout --theirs tests/index.test.js
git add tests/index.test.js
```

### 3.20 — Remaining miscellaneous files

| File                              | Strategy                                       |
| --------------------------------- | ---------------------------------------------- |
| `.gitignore`                      | Merge — keep local additions + accept upstream |
| `.github/FUNDING.yml`             | Delete (local customization)                   |
| `.github/ISSUE_TEMPLATE/*`        | Take upstream                                  |
| `.npmrc`                          | Take upstream                                  |
| `.prettierrc`                     | Keep local                                     |
| `.vscode/launch.json`             | Take upstream                                  |
| `license`                         | Take upstream (same MIT, minor format changes) |
| `patches/mdui@2.1.4.patch`        | Keep local                                     |
| `patches/file-type@16.5.4.patch`  | Delete (upstream removed)                      |
| `src/config/defaults.ts`          | Take upstream                                  |
| `src/config/index.ts`             | Take upstream                                  |
| `src/custom-electron-prompt.d.ts` | Merge                                          |
| `src/i18n/index.ts`               | Take upstream (APPLICATION_NAME export)        |
| `src/menu.ts`                     | Merge                                          |
| `src/navigation.d.ts`             | Keep local                                     |
| `src/preload.ts`                  | Take upstream                                  |
| `src/reset.d.ts`                  | Take upstream                                  |
| `src/types/plugins.ts`            | Take upstream                                  |
| `src/types/queue.ts`              | Take upstream                                  |
| `src/types/music-player.ts`       | Take upstream                                  |
| `src/types/web-request.d.ts`      | Delete (upstream removed)                      |
| `src/utils/trusted-types.ts`      | Delete (upstream removed)                      |

---

## Phase 4: Post-Merge Cleanup

### 4.1 — Regenerate lockfile

```powershell
Remove-Item -Path "pnpm-lock.yaml" -ErrorAction SilentlyContinue
pnpm install
```

### 4.2 — Fix any missing dependencies

```powershell
# Check if electron-builder needs reinstall
pnpm install
```

### 4.3 — Run quality checks

```powershell
pnpm lint
pnpm format
pnpm typecheck
```

### 4.4 — Verify branding consistency

Search for any remaining upstream branding:

```powershell
# Search for upstream branding to replace
rg "Pear Desktop" --type-add 'code:*.{ts,tsx,js,jsx,json,yml,yaml,html}' -t code
rg "pear-desktop" --type-add 'code:*.{ts,tsx,js,jsx,json,yml,yaml}' -t code
rg "th-ch" --type-add 'code:*.{ts,tsx,js,jsx,json,yml,yaml}' -t code
```

Replace with local branding as needed.

### 4.5 — Verify build

```powershell
pnpm build
```

### 4.6 — Commit the merge

```powershell
git add -A
git commit -m "merge: integrate upstream pear-desktop v3.12.0 changes

- Absorbed 319 upstream commits including:
  - New plugins: clock widget, do-not-track
  - Synced lyrics: Hindi/Bengali romanization, Chinese converter, LRC parser fixes
  - API server: WebSocket auth, HTTPS support, queue/next endpoint
  - Transparent player: Linux/macOS support
  - Dependency updates: electron 42, vite 8, typescript 7, hono, youtubei.js 17
  - 100+ i18n translation updates
  - CI/CD security hardening

- Preserved local customizations:
  - YTMusic Involvex-Edition branding
  - Custom plugins: activity-guardian, ad-speedup, adblocker
  - ESLint/Prettier toolchain (not migrated to oxlint)
  - Bun runtime support
  - Custom documentation (AGENTS.md, CONTRIBUTING.md, BUN_README.md)
  - Custom environment configuration
  - Custom docs workspace"
```

---

## Phase 5: Verification Checklist

- [ ] `pnpm lint` passes
- [ ] `pnpm format:check` passes
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` succeeds
- [ ] No upstream branding leaks ("Pear Desktop", "pear-desktop", "th-ch")
- [ ] All custom plugins present (activity-guardian, ad-speedup, adblocker)
- [ ] All custom files present (AGENTS.md, BUN_README.md, CONTRIBUTING.md, docs/)
- [ ] ESLint config works (eslint.config.mjs)
- [ ] Bun scripts work (`bun run bun:dev`)
- [ ] Dev server starts (`pnpm dev`)
