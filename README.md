# YTMusic Involvex-Edition

[![Version](https://img.shields.io/badge/version-3.12.9-blue.svg)](https://github.com/involvex/youtube-music/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)]()

A powerful, feature-rich desktop client for YouTube Music with extensive customization options, plugins, and enhanced user experience.

![YTMusic Screenshot](web/screenshot.png)

## ✨ Features

### 🎵 Core Music Features

- **High-Quality Audio**: Enjoy YouTube Music with enhanced audio quality
- **Advanced Playback Controls**: Next/Previous, Play/Pause, Seek, Volume control
- **Queue Management**: View and manage your music queue
- **Search & Discovery**: Powerful search functionality with smart suggestions
- **Mini Player**: Compact player mode for multitasking

### 🔌 Extensible Plugin System

- **40+ Built-in Plugins** including:
  - 🎛️ **Audio Effects**: Equalizer, Crossfade, Audio Compressor, Volume Booster
  - 🚫 **Ad Management**: Ad Blocker, Ad Speedup
  - 📱 **Integration**: Discord Rich Presence, Media Controls, Picture-in-Picture
  - 🎨 **Visual**: Music Visualizer, Ambient Mode, Album Color Themes
  - ⌨️ **Enhancement**: Keyboard Shortcuts, Custom Output Device
  - 📥 **Utilities**: Music Downloader, Scrobbler, Lyrics Sync
  - 🛡️ **Privacy**: SponsorBlock, Skip Disliked Songs

### 🌍 Internationalization

- **30+ Languages Supported** with full RTL support
- Dynamic language switching without restart
- Community-driven translations

### 🎨 Customization

- **Themes**: Dark/Light modes with custom color schemes
- **Layout**: Compact sidebar, customizable interface
- **Keyboard Shortcuts**: Fully customizable hotkeys
- **Performance**: Optimized for smooth operation

### 🔧 Technical Features

- **Cross-Platform**: Windows, macOS, Linux support
- **Native Integration**: System tray, notifications, media keys
- **Performance**: Optimized with modern web technologies
- **Security**: Built with security best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

#### From Source

```bash
# Clone the repository
git clone https://github.com/involvex/youtube-music.git
cd youtube-music

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

#### Build for Production

```bash
# Build the application
pnpm build

# Create distributables
pnpm dist
```

#### Platform-Specific Builds

```bash
# Windows
pnpm dist:win

# macOS (Intel)
pnpm dist:mac

# macOS (Apple Silicon)
pnpm dist:mac:arm64

# Linux
pnpm dist:linux
```

## 📖 Usage

### Basic Controls

- **Play/Pause**: Space bar or click play button
- **Next/Previous**: Arrow keys or media keys
- **Volume**: Mouse wheel or volume slider
- **Search**: Ctrl+F or click search bar

### Plugin Management

1. Open Settings (Ctrl+,)
2. Navigate to Plugins tab
3. Enable/disable plugins as needed
4. Configure plugin settings individually

### Keyboard Shortcuts

| Action             | Shortcut     |
| ------------------ | ------------ |
| Play/Pause         | `Space`      |
| Next Track         | `Ctrl+Right` |
| Previous Track     | `Ctrl+Left`  |
| Volume Up          | `Ctrl+Up`    |
| Volume Down        | `Ctrl+Down`  |
| Search             | `Ctrl+F`     |
| Settings           | `Ctrl+,`     |
| Toggle Mini Player | `Ctrl+M`     |

## 🛠️ Development

### Project Structure

```
youtube-music/
├── src/                    # Source code
│   ├── config/            # Configuration management
│   ├── i18n/              # Internationalization
│   ├── loader/            # Module loaders
│   ├── plugins/           # Plugin system
│   ├── providers/         # Data providers
│   ├── types/             # TypeScript definitions
│   └── utils/             # Utility functions
├── assets/                # Static assets
├── docs/                  # Documentation
├── web/                   # Web assets
└── patches/               # Dependency patches
```

### Available Scripts

```bash
# Development
pnpm dev                   # Start development server
pnpm dev:debug            # Start with debug logging
pnpm build                # Build for production
pnpm start                # Preview production build

# Code Quality
pnpm lint                 # Run ESLint
pnpm format               # Format with Prettier
pnpm typecheck            # TypeScript type checking
pnpm test                 # Run tests

# Building
pnpm dist                 # Build all platforms
pnpm dist:win            # Build Windows
pnpm dist:mac            # Build macOS
pnpm dist:linux          # Build Linux
```

### Plugin Development

Create your own plugins following our plugin API:

1. Copy the example plugin:

   ```bash
   cp -r src/plugins/example-plugin src/plugins/your-plugin
   ```

2. Implement your plugin functionality
3. Add proper TypeScript types
4. Test your plugin
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed development guidelines.

## 🌍 Supported Languages

| Language              | Code  | Status      | Contributors |
| --------------------- | ----- | ----------- | ------------ |
| English               | en    | ✅ Complete | Core Team    |
| German                | de    | ✅ Complete | Community    |
| Spanish               | es    | ✅ Complete | Community    |
| French                | fr    | ✅ Complete | Community    |
| Chinese (Simplified)  | zh-CN | ✅ Complete | Community    |
| Chinese (Traditional) | zh-TW | ✅ Complete | Community    |
| Japanese              | ja    | ✅ Complete | Community    |
| Korean                | ko    | ✅ Complete | Community    |
| Russian               | ru    | ✅ Complete | Community    |
| Portuguese            | pt    | ✅ Complete | Community    |

And 20+ more languages! See [src/i18n/resources/](src/i18n/resources/) for the complete list.

## 🔌 Featured Plugins

### Audio Enhancement

- **Equalizer**: 10-band parametric equalizer
- **Crossfade**: Smooth transitions between tracks
- **Audio Compressor**: Dynamic range compression
- **Precise Volume**: Fine-grained volume control

### User Experience

- **Ambient Mode**: Adaptive themes based on album art
- **Compact Sidebar**: Space-efficient interface
- **Blur Navigation Bar**: Modern visual effects
- **Transparent Player**: Customizable transparency

### Integration

- **Discord Rich Presence**: Show current track on Discord
- **Media Controls**: System-wide media key support
- **Picture-in-Picture**: Watch videos while using other apps
- **Taskbar Media Control**: Windows taskbar integration

### Content Management

- **Music Downloader**: Download tracks for offline listening
- **Synced Lyrics**: Real-time lyrics synchronization
- **SponsorBlock**: Skip sponsored content
- **Skip Disliked**: Automatic filtering of disliked songs

## 🐛 Troubleshooting

### Common Issues

**Application won't start:**

- Ensure Node.js 22+ is installed
- Run `pnpm install` to reinstall dependencies
- Check system compatibility

**Audio issues:**

- Check system audio device settings
- Restart the application
- Update audio drivers

**Plugin conflicts:**

- Disable plugins one by one to identify conflicts
- Check plugin compatibility in settings
- Restart application after enabling/disabling plugins

**Performance issues:**

- Close unnecessary plugins
- Check system resource usage
- Restart the application

### Getting Help

- 📋 Check existing [Issues](https://github.com/involvex/youtube-music/issues)
- 💬 Join our [Discussions](https://github.com/involvex/youtube-music/discussions)
- 📧 Contact: [lukaswill97@gmail.com](mailto:lukaswill97@gmail.com)

## 🤝 Contributing

We welcome contributions from everyone! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- Setting up the development environment
- Code style and standards
- Testing procedures
- Plugin development
- Translation contributions
- Issue reporting

### Ways to Contribute

- 🐛 **Report bugs** and suggest features
- 💻 **Code contributions** (plugins, bug fixes, features)
- 🌍 **Translations** for new and existing languages
- 📚 **Documentation** improvements
- 🎨 **UI/UX** enhancements
- 🧪 **Testing** on different platforms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **YouTube Music** for the amazing service
- **Electron** team for the cross-platform framework
- **Vite** for the blazing fast build tool
- **Community contributors** for plugins, translations, and feedback
- **Open source community** for inspiration and tools

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/involvex/youtube-music?style=social)
![GitHub forks](https://img.shields.io/github/forks/involvex/youtube-music?style=social)
![GitHub issues](https://img.shields.io/github/issues/involvex/youtube-music)
![GitHub pull requests](https://img.shields.io/github/issues-pr/involvex/youtube-music)

---

<div align="center">
  <strong>Made with ❤️ by the Involvex Team</strong><br>
  <a href="https://involvex.github.io/Involvex/">Website</a> •
  <a href="https://github.com/involvex/youtube-music">GitHub</a> •
  <a href="mailto:lukaswill97@gmail.com">Contact</a>
</div>
