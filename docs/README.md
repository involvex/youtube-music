# YTMusic Involvex-Edition Documentation

Modern, responsive documentation website for the YTMusic Involvex-Edition project, featuring dark/light mode toggle, comprehensive guides, and automated GitHub Pages deployment.

## 🚀 Live Documentation

**📄 [View Live Documentation](https://ytmusic-involvex.github.io/youtube-music/)**

The documentation is automatically deployed to GitHub Pages and updated with every commit to the main branch.

## 📋 Features

- **🎨 Modern Design**: Clean, professional interface with beautiful animations
- **🌙 Dark/Light Mode**: System-aware theme switching with smooth transitions
- **📱 Responsive**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Loading**: Optimized assets and lazy loading for quick page loads
- **🔍 SEO Optimized**: Proper meta tags and structured content
- **♿ Accessible**: WCAG compliant with keyboard navigation support
- **🔄 Auto-Deploy**: GitHub Pages deployment on every commit

## 🏗️ Project Structure

```
docs/
├── index.html              # Main documentation page
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet with responsive design
│   ├── js/
│   │   ├── main.js         # Core functionality and interactions
│   │   ├── plugins.js      # Plugin data and rendering
│   │   └── releases.js     # Release information and downloads
│   └── images/             # Static assets and icons
├── .github/
│   └── workflows/
│       ├── deploy.yml      # GitHub Pages deployment workflow
│       └── test.yml        # Documentation testing workflow
└── README.md               # This file
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ytmusic-involvex/youtube-music.git
   cd youtube-music/docs
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:

   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

### Package.json Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint CSS and JavaScript
- `npm run validate` - Validate HTML and structure

## 🎨 Design System

### Color Palette

The documentation uses a carefully crafted color system:

- **Primary**: Indigo (`#6366f1`) - Main brand color
- **Accent**: Cyan (`#06b6d4`) - Secondary brand color
- **Success**: Green (`#10b981`) - Success states
- **Warning**: Amber (`#f59e0b`) - Warning states
- **Error**: Red (`#ef4444`) - Error states

### Typography

- **Primary Font**: Inter - Clean, modern sans-serif
- **Monospace**: JetBrains Mono - Code and technical content

### Components

- **Cards**: Elevated design with subtle shadows
- **Buttons**: Multiple variants (primary, secondary, ghost)
- **Navigation**: Sticky header with scroll effects
- **Code Blocks**: Syntax highlighted with copy functionality
- **Plugin Cards**: Interactive cards with hover effects

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Visible focus indicators
- **Skip Links**: Quick navigation for keyboard users

## 🚀 Deployment

### Automatic Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions:

1. **Push to main branch** triggers deployment
2. **Pull requests** test the build
3. **Manual trigger** available via GitHub Actions

### Manual Deployment

1. Build the documentation:

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages

3. Enable GitHub Pages in repository settings

### Deployment Configuration

The deployment workflow (`deploy.yml`) includes:

- **Validation**: Checks for build errors
- **Artifact Upload**: Stores build files
- **Page Deployment**: Updates GitHub Pages
- **Notifications**: Slack/Discord integration
- **Cleanup**: Removes old workflow runs

## 📊 Performance

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Features

- **Asset Compression**: Minified CSS/JS
- **Image Optimization**: Optimized images
- **Lazy Loading**: Non-critical content loaded on demand
- **Caching**: Proper cache headers
- **CDN**: GitHub Pages CDN distribution

## 🧪 Testing

### Automated Testing

- **Build Testing**: Validates successful builds
- **Link Validation**: Checks for broken links
- **HTML Validation**: Ensures valid HTML structure
- **Accessibility Testing**: WCAG compliance checks

### Manual Testing

- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Device Testing**: Desktop, tablet, mobile
- **Theme Testing**: Light/dark mode switching
- **Navigation Testing**: Menu and anchor links

## 🔧 Customization

### Adding New Sections

1. Edit `index.html` to add new sections
2. Update navigation links in the header
3. Add corresponding JavaScript functionality if needed
4. Test responsive design

### Modifying Styles

1. Edit `assets/css/style.css`
2. Use CSS custom properties for consistency
3. Test across different screen sizes
4. Validate accessibility

### Adding Plugins

1. Update `assets/js/plugins.js` with new plugin data
2. Add corresponding sections in `index.html`
3. Update plugin filters if needed

### Managing Releases

1. Update `assets/js/releases.js` with new release data
2. Add release notes and download links
3. Update version badges and highlights

## 📄 License

This documentation is part of the YTMusic Involvex-Edition project. See the main repository for license information.

## 🤝 Contributing

Contributions to the documentation are welcome! Please:

1. Follow the existing code style
2. Test your changes across devices
3. Validate HTML and accessibility
4. Update relevant documentation sections

### Development Guidelines

- Use semantic HTML
- Follow BEM CSS methodology
- Write accessible JavaScript
- Test responsive design
- Validate code before committing

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ytmusic-involvex/youtube-music/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ytmusic-involvex/youtube-music/discussions)
- **Wiki**: [Project Wiki](https://github.com/ytmusic-involvex/youtube-music/wiki)

## 📈 Analytics

The documentation includes basic performance monitoring:

- **Core Web Vitals**: LCP, FID, CLS tracking
- **Page Load Times**: Performance metrics
- **User Interactions**: Button clicks and navigation
- **Error Tracking**: JavaScript errors and failures

## 🔄 Changelog

### v1.0.0 (2024-12-15)

- Initial documentation release
- Responsive design implementation
- Dark/light mode toggle
- GitHub Pages deployment
- Plugin showcase
- Release information
- Comprehensive README

---

**Built with ❤️ for the YTMusic Involvex-Edition community**

📄 [View Documentation](https://ytmusic-involvex.github.io/youtube-music/) | 🔗 [GitHub Repository](https://github.com/ytmusic-involvex/youtube-music) | 💬 [Discussions](https://github.com/ytmusic-involvex/youtube-music/discussions)
