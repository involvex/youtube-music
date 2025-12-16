// YTMusic Involvex-Edition - Releases Data
const RELEASES_DATA = {
  latest: {
    version: '2.1.0',
    date: '2024-12-15',
    name: 'Winter Release',
    tagline: 'Enhanced performance and new plugin system',
    type: 'major',
    downloadUrl:
      'https://github.com/ytmusic-involvex/youtube-music/releases/latest',
    prerelease: false,
    notes: `
      <h3>🎉 New Features</h3>
      <ul>
        <li><strong>Enhanced Plugin System:</strong> Completely redesigned plugin architecture with improved stability</li>
        <li><strong>Music Together:</strong> New social listening feature for synchronized playback</li>
        <li><strong>Advanced Downloader:</strong> Support for playlist downloads and quality selection</li>
        <li><strong>Dark/Light Mode:</strong> System-aware theme switching with better contrast</li>
      </ul>
      <h3>⚡ Performance Improvements</h3>
      <ul>
        <li>40% faster startup time</li>
        <li>Reduced memory usage by 25%</li>
        <li>Improved audio quality rendering</li>
        <li>Better network handling for streaming</li>
      </ul>
      <h3>🐛 Bug Fixes</h3>
      <ul>
        <li>Fixed crashes when switching between tracks rapidly</li>
        <li>Resolved playlist synchronization issues</li>
        <li>Fixed theme persistence across sessions</li>
        <li>Improved error handling for network failures</li>
      </ul>
    `,
    highlights: [
      {
        title: 'Plugin System v2',
        description: 'Completely rewritten plugin architecture',
        icon: '🔧',
      },
      {
        title: 'Music Together',
        description: 'Social listening with friends and family',
        icon: '👥',
      },
      {
        title: 'Enhanced Downloader',
        description: 'Better quality and playlist support',
        icon: '📥',
      },
      {
        title: 'Performance Boost',
        description: '40% faster startup and 25% less memory',
        icon: '⚡',
      },
    ],
  },
  previous: [
    {
      version: '2.0.5',
      date: '2024-11-20',
      name: 'Feature Update',
      type: 'minor',
      downloadUrl:
        'https://github.com/ytmusic-involvex/youtube-music/releases/tag/v2.0.5',
      notes: `
        <h3>🆕 What's New</h3>
        <ul>
          <li>Added support for keyboard shortcuts</li>
          <li>Improved playlist management</li>
          <li>Enhanced audio visualization</li>
          <li>Better mobile responsiveness</li>
        </ul>
        <h3>🔧 Improvements</h3>
        <ul>
          <li>Updated dependency versions</li>
          <li>Improved error reporting</li>
          <li>Better internationalization</li>
        </ul>
      `,
    },
    {
      version: '2.0.0',
      date: '2024-10-15',
      name: 'Major Release',
      type: 'major',
      downloadUrl:
        'https://github.com/ytmusic-involvex/youtube-music/releases/tag/v2.0.0',
      notes: `
        <h3>🎯 Complete Rewrite</h3>
        <ul>
          <li>Rebuilt from the ground up with modern architecture</li>
          <li>New UI with improved usability</li>
          <li>Enhanced audio processing engine</li>
          <li>Cross-platform compatibility improvements</li>
        </ul>
        <h3>📱 Mobile Support</h3>
        <ul>
          <li>Responsive design for all screen sizes</li>
          <li>Touch-optimized controls</li>
          <li>Better performance on mobile devices</li>
        </ul>
      `,
    },
  ],
  upcoming: {
    version: '2.2.0',
    estimatedDate: '2025-01-15',
    name: 'Spring Preview',
    features: [
      'AI-powered music recommendations',
      'Advanced equalizer with presets',
      'Cloud sync for settings and playlists',
      'Enhanced plugin marketplace',
      'Web version support',
    ],
  },
};

// Platform-specific download information
const DOWNLOAD_PLATFORMS = {
  windows: {
    name: 'Windows',
    icon: '🪟',
    format: '.exe',
    architectures: ['x64', 'x86'],
    installer: 'Microsoft Store, Direct Download, Winget',
  },
  macos: {
    name: 'macOS',
    icon: '🍎',
    format: '.dmg',
    architectures: ['Intel', 'Apple Silicon'],
    installer: 'Mac App Store, Direct Download',
  },
  linux: {
    name: 'Linux',
    icon: '🐧',
    format: '.AppImage, .deb, .rpm',
    architectures: ['x64', 'arm64'],
    installer: 'Snap, Flatpak, AppImage, Package Managers',
  },
  android: {
    name: 'Android',
    icon: '🤖',
    format: '.apk',
    architectures: ['ARM64', 'ARMv7'],
    installer: 'Google Play Store, Direct Download',
  },
};

// Render Release Information
function renderLatestRelease() {
  const container = document.getElementById('latest-release');
  if (!container) return;

  const release = RELEASES_DATA.latest;

  container.innerHTML = `
    <div class="release-highlight">
      <div class="release-header">
        <div class="release-badge ${release.type}">
          ${release.type === 'major' ? '🎉 Major Release' : '🔄 Update'}
        </div>
        <div class="release-version">v${release.version}</div>
        <div class="release-name">${release.name}</div>
        <div class="release-date">Released on ${formatDate(release.date)}</div>
        <div class="release-tagline">${release.tagline}</div>
      </div>

      <div class="release-content">
        <div class="release-highlights">
          <h3>Key Features</h3>
          <div class="highlights-grid">
            ${release.highlights
              .map(
                highlight => `
              <div class="highlight-item">
                <div class="highlight-icon">${highlight.icon}</div>
                <div class="highlight-content">
                  <h4>${highlight.title}</h4>
                  <p>${highlight.description}</p>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div class="release-notes">
          ${release.notes}
        </div>

        <div class="release-actions">
          <a href="${release.downloadUrl}" class="btn btn-primary" target="_blank">
            Download v${release.version}
          </a>
          <button class="btn btn-secondary" onclick="showReleaseHistory()">
            View All Releases
          </button>
          <button class="btn btn-ghost" onclick="subscribeToUpdates()">
            Subscribe to Updates
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render Platform Downloads
function renderPlatformDownloads() {
  const container = document.getElementById('platform-downloads');
  if (!container) return;

  container.innerHTML = `
    <div class="download-platforms">
      <h3>Available for All Platforms</h3>
      <div class="platforms-grid">
        ${Object.entries(DOWNLOAD_PLATFORMS)
          .map(
            ([key, platform]) => `
          <div class="platform-card">
            <div class="platform-icon">${platform.icon}</div>
            <div class="platform-info">
              <h4>${platform.name}</h4>
              <p class="platform-format">${platform.format}</p>
              <p class="platform-arch">
                <strong>Architectures:</strong> ${platform.architectures.join(', ')}
              </p>
              <p class="platform-installer">
                <strong>Install via:</strong> ${platform.installer}
              </p>
            </div>
            <button class="btn btn-primary" onclick="downloadPlatform('${key}')">
              Download
            </button>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

// Render Release History
function renderReleaseHistory() {
  const container = document.getElementById('release-history');
  if (!container) return;

  const releases = RELEASES_DATA.previous;

  container.innerHTML = `
    <div class="releases-timeline">
      <h3>Previous Releases</h3>
      <div class="timeline">
        ${releases
          .map(
            (release, index) => `
          <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
            <div class="timeline-marker ${release.type}">
              ${release.type === 'major' ? '🎉' : '🔄'}
            </div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4>v${release.version}</h4>
                <span class="timeline-date">${formatDate(release.date)}</span>
                <span class="timeline-name">${release.name}</span>
              </div>
              <div class="timeline-notes">
                ${release.notes}
              </div>
              <div class="timeline-actions">
                <a href="${release.downloadUrl}" class="btn btn-ghost" target="_blank">
                  Download
                </a>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;
}

// Render Upcoming Features
function renderUpcomingFeatures() {
  const container = document.getElementById('upcoming-features');
  if (!container) return;

  const upcoming = RELEASES_DATA.upcoming;

  container.innerHTML = `
    <div class="upcoming-section">
      <div class="upcoming-header">
        <h3>Coming Soon</h3>
        <div class="upcoming-version">v${upcoming.version}</div>
        <div class="upcoming-name">${upcoming.name}</div>
        <div class="upcoming-date">Estimated: ${formatDate(upcoming.estimatedDate)}</div>
      </div>

      <div class="upcoming-features">
        <h4>Planned Features</h4>
        <div class="features-list">
          ${upcoming.features
            .map(
              feature => `
            <div class="feature-item">
              <span class="feature-icon">✨</span>
              <span class="feature-text">${feature}</span>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <div class="upcoming-actions">
        <button class="btn btn-secondary" onclick="subscribeToBeta()">
          Join Beta Program
        </button>
        <button class="btn btn-ghost" onclick="requestFeature()">
          Request Feature
        </button>
      </div>
    </div>
  `;
}

// Download Functions
function downloadPlatform(platform) {
  const release = RELEASES_DATA.latest;
  const platformInfo = DOWNLOAD_PLATFORMS[platform];

  // Create download notification
  const notification = createDownloadNotification(platformInfo.name);
  document.body.appendChild(notification);

  // Simulate download process
  setTimeout(() => {
    // In a real implementation, this would redirect to the actual download
    window.open(release.downloadUrl, '_blank');
    notification.remove();
  }, 1000);
}

function createDownloadNotification(platformName) {
  const notification = document.createElement('div');
  notification.className = 'download-notification';
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-icon">📥</div>
      <div class="notification-text">
        <strong>Preparing download for ${platformName}...</strong>
        <p>Your download will start shortly</p>
      </div>
    </div>
  `;
  return notification;
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatVersionNumber(version) {
  return `v${version}`;
}

function isLatestRelease(release) {
  return release.version === RELEASES_DATA.latest.version;
}

function getReleaseTypeBadge(type) {
  const badges = {
    major: { text: 'Major Release', icon: '🎉', color: '#10b981' },
    minor: { text: 'Feature Update', icon: '🔄', color: '#3b82f6' },
    patch: { text: 'Bug Fix', icon: '🐛', color: '#f59e0b' },
  };

  return badges[type] || badges.minor;
}

// Action Functions
function showReleaseHistory() {
  // Scroll to release history section
  const historySection = document.getElementById('release-history');
  if (historySection) {
    historySection.scrollIntoView({ behavior: 'smooth' });
  }
}

function subscribeToUpdates() {
  // In a real implementation, this would open a subscription modal or redirect
  const notification = createNotification(
    'Subscription feature coming soon! Follow us on GitHub for updates.',
    'info'
  );
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 5000);
}

function subscribeToBeta() {
  // Redirect to beta signup or GitHub Discussions
  window.open(
    'https://github.com/ytmusic-involvex/youtube-music/discussions',
    '_blank'
  );
}

function requestFeature() {
  // Open GitHub Issues or feature request form
  window.open(
    'https://github.com/ytmusic-involvex/youtube-music/issues/new?template=feature_request.md',
    '_blank'
  );
}

// GitHub API Integration
async function fetchLatestRelease() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/ytmusic-involvex/youtube-music/releases/latest'
    );
    if (response.ok) {
      const release = await response.json();
      return {
        version: release.tag_name,
        date: release.published_at,
        name: release.name || release.tag_name,
        downloadUrl: release.html_url,
        notes: release.body,
      };
    }
  } catch (error) {
    console.warn('Could not fetch latest release from GitHub API');
  }
  return RELEASES_DATA.latest;
}

// Initialize releases system
function initializeReleases() {
  renderLatestRelease();
  renderPlatformDownloads();
  renderReleaseHistory();
  renderUpcomingFeatures();

  // Load latest release data from GitHub API if available
  fetchLatestRelease().then(latestRelease => {
    if (
      latestRelease &&
      latestRelease.version !== RELEASES_DATA.latest.version
    ) {
      // Update the UI with the latest release data
      renderLatestRelease();
    }
  });
}

// Export functions for use in HTML
if (typeof window !== 'undefined') {
  window.releasesData = RELEASES_DATA;
  window.downloadPlatforms = DOWNLOAD_PLATFORMS;
  window.renderLatestRelease = renderLatestRelease;
  window.renderPlatformDownloads = renderPlatformDownloads;
  window.renderReleaseHistory = renderReleaseHistory;
  window.renderUpcomingFeatures = renderUpcomingFeatures;
  window.downloadPlatform = downloadPlatform;
  window.showReleaseHistory = showReleaseHistory;
  window.subscribeToUpdates = subscribeToUpdates;
  window.subscribeToBeta = subscribeToBeta;
  window.requestFeature = requestFeature;
  window.initializeReleases = initializeReleases;
}
