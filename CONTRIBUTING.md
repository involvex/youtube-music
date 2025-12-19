# Contributing to YouTube Music Desktop

Thank you for your interest in contributing to YouTube Music Desktop! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Building and Running](#building-and-running)
- [Git Workflow](#git-workflow)
- [Contributing Areas](#contributing-areas)
- [Plugin Development](#plugin-development)
- [Translation Contributions](#translation-contributions)
- [Issue Reporting](#issue-reporting)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to the principles of open collaboration and respect. Please read and follow our code of conduct:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the community and project goals
- Help newcomers learn and grow

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (preferred package manager)
- Git

### Repository Setup

1. **Fork the repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/youtube-music.git
   cd youtube-music
   ```

2. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/involvex/youtube-music.git
   ```

3. **Sync your fork**
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```

## Development Setup

### 1. Install Dependencies

```bash
# Install all dependencies including workspaces
pnpm install
```

### 2. Environment Configuration

The application should work out of the box, but you can create a `.env` file if needed for custom configuration.

### 3. Run in Development Mode

```bash
# Start the development server
pnpm dev

# Or run specific parts
pnpm dev:renderer  # Frontend only
pnpm dev:main      # Main process only
```

## Project Structure

```
youtube-music/
├── src/                    # Main source code
│   ├── config/            # Configuration management
│   ├── i18n/              # Internationalization
│   ├── loader/            # Module loaders
│   ├── plugins/           # Core plugins
│   ├── providers/         # Data providers
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── assets/                # Static assets
├── docs/                  # Documentation
├── test-results/          # Test outputs
└── web/                   # Web-specific files
```

### Key Directories

- **`src/plugins/`**: Contains all plugins (adblocker, downloader, equalizer, etc.)
- **`src/i18n/resources/`**: Translation files for different languages
- **`src/providers/`**: Data providers for songs, controls, and app state
- **`assets/`**: Icons, CSS, and other static resources

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper types and interfaces
- Use strict mode configurations
- Avoid `any` types unless absolutely necessary

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Check code quality
pnpm lint

# Format code
pnpm format

# Type checking
pnpm type-check
```

### Naming Conventions

- **Files**: kebab-case (`song-controls.ts`)
- **Classes**: PascalCase (`SongControls`)
- **Functions**: camelCase (`getSongInfo`)
- **Constants**: UPPER_SNAKE_CASE (`DEFAULT_VOLUME`)

### Git Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(plugins): add new audio compressor plugin
fix(i18n): correct German translation for "pause"
docs(readme): update installation instructions
```

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test tests/index.test.js
```

### Writing Tests

- Write tests for new features and bug fixes
- Place test files in the `tests/` directory
- Use descriptive test names
- Mock external dependencies when appropriate

## Building and Running

### Development Build

```bash
# Build for development
pnpm build:dev

# Start electron in development
pnpm electron:dev
```

### Production Build

```bash
# Build for production
pnpm build

# Create distributables
pnpm dist
```

### Platform-Specific Builds

```bash
# Windows
pnpm build:win

# macOS
pnpm build:mac

# Linux
pnpm build:linux
```

## Git Workflow

### Branch Strategy

1. **main**: Production-ready code
2. **develop**: Integration branch for features
3. **feature/**: Feature branches
4. **fix/**: Bug fix branches
5. **hotfix/**: Critical production fixes

### Development Process

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following our standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**

   ```bash
   pnpm lint
   pnpm format
   pnpm type-check
   pnpm test
   pnpm build
   ```

4. **Commit and push**

   ```bash
   git add -A
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

## Contributing Areas

We welcome contributions in many areas:

### 🎵 Core Features

- Music playback functionality
- User interface improvements
- Performance optimizations

### 🔌 Plugins

- New plugin development
- Plugin improvements and fixes
- Plugin documentation

### 🌍 Translations

- Add new languages
- Improve existing translations
- Fix translation errors

### 🐛 Bug Reports

- Reproduce and report bugs
- Test bug fixes
- Provide detailed issue reports

### 📚 Documentation

- Improve README and guides
- Add code comments
- Create tutorials

## Plugin Development

### Creating a New Plugin

1. **Generate plugin structure**

   ```bash
   # Copy the example plugin
   cp -r src/plugins/example-plugin src/plugins/your-plugin-name
   ```

2. **Update plugin metadata**
   - Edit `package.json` if needed
   - Update plugin interface implementation
   - Add proper TypeScript types

3. **Implement plugin functionality**
   - Follow the plugin API patterns
   - Use existing providers and utilities
   - Implement proper cleanup

4. **Test your plugin**
   - Add unit tests
   - Test with the development build
   - Verify plugin doesn't break existing functionality

### Plugin Guidelines

- **Single Responsibility**: Each plugin should have one clear purpose
- **Performance**: Avoid blocking the main thread
- **Memory Management**: Properly clean up resources
- **Error Handling**: Handle errors gracefully
- **User Experience**: Provide clear feedback to users

### Plugin API Reference

Plugins have access to:

- App state and configuration
- Player controls and events
- UI components and styling
- Storage and persistence
- Other plugins (through proper APIs)

## Translation Contributions

### Adding a New Language

1. **Create language file**

   ```bash
   # Copy an existing translation as template
   cp src/i18n/resources/en.json src/i18n/resources/your-lang.json
   ```

2. **Translate content**
   - Translate all string values
   - Maintain placeholder variables (`{volume}`)
   - Preserve formatting and structure

3. **Add language to configuration**
   - Update language selection UI
   - Add RTL support if needed
   - Test with the application

### Translation Guidelines

- Maintain consistent terminology
- Consider cultural context
- Use formal or informal language appropriately
- Test in the actual application
- Coordinate with existing translators

### String Management

When adding new strings to the application:

1. **Add to English template** (`en.json`)
2. **Use in code** with i18n functions
3. **Update other languages** (use tools like `i18next`)

## Issue Reporting

### Bug Reports

When reporting bugs, include:

- **Operating System**: Windows, macOS, Linux
- **Application Version**: Check About dialog
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Console Logs**: From Developer Tools

### Feature Requests

For feature requests:

- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Any other solutions considered?
- **Additional Context**: Any other relevant information

### Issue Templates

Use the provided issue templates when creating new issues.

## Pull Request Process

### Before Submitting

1. **Update your fork**

   ```bash
   git checkout main
   git merge upstream/main
   ```

2. **Run the full test suite**

   ```bash
   pnpm lint
   pnpm format
   pnpm type-check
   pnpm test
   pnpm build
   ```

3. **Write clear commit messages**
4. **Ensure all tests pass**

### Pull Request Guidelines

- **Small, Focused Changes**: Keep PRs focused on one feature/fix
- **Clear Description**: Explain what and why
- **Link Issues**: Reference related issues
- **Screenshots/Videos**: For UI changes
- **Breaking Changes**: Note any breaking changes

### PR Template

Follow the provided pull request template:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] Cross-platform testing (if applicable)

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: Maintainers review code quality and design
3. **Testing**: Changes are tested in development builds
4. **Approval**: At least one maintainer approval required
5. **Merge**: Squash and merge into main branch

### After Merge

- **Cleanup**: Delete feature branch
- **Monitoring**: Watch for any issues in production
- **Documentation**: Update relevant documentation

## Development Tips

### Debugging

```bash
# Run with debug flags
pnpm electron:dev --inspect-brk

# Open Developer Tools
# Menu: View > Toggle Developer Tools
```

### Performance Profiling

```bash
# Enable performance monitoring
# In Developer Tools > Performance tab
```

### Hot Reloading

- Most changes auto-reload in development mode
- Main process changes require app restart
- Plugin changes may require full restart

## Questions?

- **Documentation**: Check this file and README.md
- **Issues**: Search existing issues first
- **Discussions**: Use GitHub Discussions for questions
- **Community**: Join our community channels

## Recognition

Contributors are recognized in:

- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (see LICENSE file).

---

Thank you for contributing to YouTube Music Desktop! Your involvement helps make this project better for everyone.
