# Fix ESLint Error for 'document' is not defined

## Tasks:
- [x] Examine current ESLint configuration
- [x] Identify the root cause of the 'document' not defined error
- [x] Fix the ESLint configuration to include browser globals
- [x] Verify the fix by running ESLint
- [x] Test the build process to ensure no errors
- [ ] Commit the changes

## Details:
- File: docs/assets/js/main.js
- Error: Line 6: 'document' is not defined
- Root Cause: ESLint doesn't recognize browser globals like 'document'
- Solution: Update ESLint configuration to include browser globals

## Changes Made:
- Updated `eslint.config.mjs` to include comprehensive browser globals for JavaScript files
- Added common browser objects like `document`, `window`, `navigator`, `localStorage`, etc.
- Added Node.js globals like `module`, `exports`, `require` for testing support
- These globals are now properly recognized in `.js` files and won't trigger "not defined" errors
- Verified the fix works - ESLint now passes without errors
- Tested build process - both `npm run lint` and `npm run format` complete successfully
