// YTMusic Involvex-Edition - Enhanced Plugin Showcase System
// Version 2.0.0

class PluginShowcase {
  constructor() {
    this.plugins = [];
    this.filteredPlugins = [];
    this.currentPage = 1;
    this.itemsPerPage = 12;
    this.currentView = 'grid';
    this.isCompact = false;
    this.isLoading = false;
    this.searchTerm = '';
    this.selectedCategories = [];
    this.selectedStatus = 'all';
    this.sortBy = 'name';
    this.isInfiniteScrollEnabled = false;
    this.observer = null;

    // Plugin categories with enhanced metadata
    this.categories = {
      core: {
        name: 'Core Features',
        color: '#6366f1',
        icon: '⚡',
        description: 'Essential functionality plugins',
      },
      social: {
        name: 'Social',
        color: '#06b6d4',
        icon: '👥',
        description: 'Social networking and sharing',
      },
      backend: {
        name: 'Backend',
        color: '#10b981',
        icon: '⚙️',
        description: 'Backend processing and optimization',
      },
      visualization: {
        name: 'Visualization',
        color: '#f59e0b',
        icon: '🎨',
        description: 'Visual effects and themes',
      },
      integration: {
        name: 'Integration',
        color: '#8b5cf6',
        icon: '🔗',
        description: 'External service integration',
      },
      security: {
        name: 'Security',
        color: '#ef4444',
        icon: '🔒',
        description: 'Security and privacy',
      },
      streaming: {
        name: 'Streaming',
        color: '#3b82f6',
        icon: '📡',
        description: 'Streaming optimization',
      },
      utility: {
        name: 'Utility',
        color: '#84cc16',
        icon: '🛠️',
        description: 'General utilities',
      },
      ui: {
        name: 'User Interface',
        color: '#ec4899',
        icon: '🎭',
        description: 'UI enhancements',
      },
      audio: {
        name: 'Audio',
        color: '#f97316',
        icon: '🎵',
        description: 'Audio processing plugins',
      },
    };

    this.init();
  }

  // Initialize the plugin showcase
  init() {
    this.loadPluginsData();
    this.setupEventListeners();
    this.setupInfiniteScroll();
    this.renderFilters();
    this.applyFilters();
  }

  // Enhanced plugin data with realistic metrics
  loadPluginsData() {
    this.plugins = [
      {
        id: 'downloader',
        name: 'Music Downloader',
        author: 'YTMusic Team',
        description:
          'Download YouTube Music tracks and playlists with high quality audio conversion, metadata preservation, and batch processing capabilities.',
        icon: '📥',
        category: 'core',
        features: [
          'Audio Download',
          'Playlist Support',
          'Quality Selection',
          'Batch Downloads',
          'Metadata Extraction',
        ],
        status: 'active',
        version: '2.1.0',
        downloads: 45623,
        rating: 4.8,
        reviews: 1247,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '15.2 MB',
        lastUpdate: '2024-12-15',
        changelog: [
          'Fixed playlist download issues',
          'Added FLAC format support',
          'Improved metadata extraction',
        ],
      },
      {
        id: 'music-together',
        name: 'Music Together',
        author: 'YTMusic Team',
        description:
          'Synchronized playback for group listening sessions with friends and family. Share your music experience across different devices.',
        icon: '🎵',
        category: 'social',
        features: [
          'Real-time Sync',
          'Group Chat',
          'Queue Sharing',
          'Cross-platform',
          'Voice Chat',
        ],
        status: 'active',
        version: '1.5.3',
        downloads: 28934,
        rating: 4.6,
        reviews: 892,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '22.8 MB',
        lastUpdate: '2024-12-10',
        changelog: [
          'Added voice chat integration',
          'Improved sync accuracy',
          'Fixed connection issues',
        ],
      },
      {
        id: 'amuse',
        name: 'Amuse Backend',
        author: 'YTMusic Team',
        description:
          'Enhanced backend service for improved audio processing, metadata handling, and performance optimization with advanced algorithms.',
        icon: '🎛️',
        category: 'backend',
        features: [
          'Audio Processing',
          'Metadata Enhancement',
          'Performance Optimization',
          'Custom Filters',
        ],
        status: 'active',
        version: '3.0.1',
        downloads: 67845,
        rating: 4.9,
        reviews: 2156,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '31.5 MB',
        lastUpdate: '2024-12-18',
        changelog: [
          'Major performance improvements',
          'New audio processing algorithms',
          'Enhanced metadata handling',
        ],
      },
      {
        id: 'ambient-mode',
        name: 'Ambient Mode',
        author: 'YTMusic Team',
        description:
          'Beautiful ambient animations and visualizations that adapt to your music with dynamic themes and customizable effects.',
        icon: '🌅',
        category: 'visualization',
        features: [
          'Visual Effects',
          'Dynamic Animations',
          'Customizable Themes',
          'Beat Detection',
        ],
        status: 'active',
        version: '1.8.2',
        downloads: 34567,
        rating: 4.7,
        reviews: 1098,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '18.9 MB',
        lastUpdate: '2024-12-12',
        changelog: [
          'New animation effects',
          'Better performance on low-end devices',
          'Additional color themes',
        ],
      },
      {
        id: 'album-actions',
        name: 'Album Actions',
        author: 'YTMusic Team',
        description:
          'Enhanced album management with like/dislike buttons, rating system, and quick actions for better music organization.',
        icon: '❤️',
        category: 'core',
        features: [
          'Like/Dislike',
          'Rating System',
          'Album Organization',
          'Quick Actions',
          'Bulk Operations',
        ],
        status: 'active',
        version: '2.3.1',
        downloads: 52341,
        rating: 4.5,
        reviews: 1876,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '8.7 MB',
        lastUpdate: '2024-12-14',
        changelog: [
          'Added bulk operations',
          'Improved rating accuracy',
          'New quick action shortcuts',
        ],
      },
      {
        id: 'api-server',
        name: 'API Server',
        author: 'YTMusic Team',
        description:
          'RESTful API server for remote control and integration with external applications, featuring WebSocket support and authentication.',
        icon: '🔗',
        category: 'integration',
        features: [
          'REST API',
          'WebSocket Support',
          'Remote Control',
          'External Integration',
          'Authentication',
        ],
        status: 'active',
        version: '4.2.0',
        downloads: 29876,
        rating: 4.4,
        reviews: 743,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '12.3 MB',
        lastUpdate: '2024-12-16',
        changelog: [
          'Added OAuth authentication',
          'Improved API documentation',
          'Fixed WebSocket disconnections',
        ],
      },
      {
        id: 'auth-proxy-adapter',
        name: 'Auth Proxy Adapter',
        author: 'YTMusic Team',
        description:
          'Secure authentication proxy for handling user credentials and sessions with advanced security features and encryption.',
        icon: '🔐',
        category: 'security',
        features: [
          'Secure Auth',
          'Session Management',
          'Proxy Support',
          'Token Handling',
          'Encryption',
        ],
        status: 'active',
        version: '1.2.4',
        downloads: 18765,
        rating: 4.3,
        reviews: 456,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '6.4 MB',
        lastUpdate: '2024-12-08',
        changelog: [
          'Enhanced security protocols',
          'Improved session handling',
          'Fixed memory leaks',
        ],
      },
      {
        id: 'browser-integration',
        name: 'Browser Integration',
        author: 'YTMusic Team',
        description:
          'Seamless integration with web browsers for enhanced user experience with extensions and quick controls.',
        icon: '🌐',
        category: 'integration',
        features: [
          'Browser Extensions',
          'Quick Controls',
          'Notification Support',
          'Tab Management',
        ],
        status: 'active',
        version: '2.0.5',
        downloads: 41256,
        rating: 4.6,
        reviews: 1234,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '14.8 MB',
        lastUpdate: '2024-12-11',
        changelog: [
          'Added Firefox support',
          'Improved extension performance',
          'Fixed notification issues',
        ],
      },
      {
        id: 'lumiastream',
        name: 'LumaStream',
        author: 'YTMusic Team',
        description:
          'Streaming optimization plugin for better audio quality and reduced buffering with intelligent adaptive streaming.',
        icon: '📡',
        category: 'streaming',
        features: [
          'Quality Optimization',
          'Buffer Management',
          'Streaming Enhancement',
          'Adaptive Bitrate',
        ],
        status: 'active',
        version: '1.7.3',
        downloads: 25678,
        rating: 4.5,
        reviews: 678,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '11.2 MB',
        lastUpdate: '2024-12-13',
        changelog: [
          'Improved buffer management',
          'Enhanced adaptive streaming',
          'Better error recovery',
        ],
      },
      {
        id: 'activity-guardian',
        name: 'Activity Guardian',
        author: 'YTMusic Team',
        description:
          'Monitors user activity and prevents accidental interruptions during playback with intelligent detection algorithms.',
        icon: '🛡️',
        category: 'utility',
        features: [
          'Activity Monitoring',
          'Interrupt Prevention',
          'Auto-pause',
          'User Protection',
        ],
        status: 'active',
        version: '1.1.2',
        downloads: 15432,
        rating: 4.2,
        reviews: 345,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '7.1 MB',
        lastUpdate: '2024-12-07',
        changelog: [
          'Improved detection algorithms',
          'Reduced false positives',
          'Better performance',
        ],
      },
      {
        id: 'album-color-theme',
        name: 'Album Color Theme',
        author: 'YTMusic Team',
        description:
          'Dynamic color themes based on album artwork for immersive visual experience with custom palette generation.',
        icon: '🎨',
        category: 'visualization',
        features: [
          'Dynamic Colors',
          'Album Themes',
          'Visual Enhancement',
          'Custom Palettes',
        ],
        status: 'active',
        version: '2.4.0',
        downloads: 38765,
        rating: 4.8,
        reviews: 1456,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '16.5 MB',
        lastUpdate: '2024-12-17',
        changelog: [
          'New color extraction algorithms',
          'Additional theme presets',
          'Improved performance',
        ],
      },
      {
        id: 'in-app-menu',
        name: 'In-App Menu',
        author: 'YTMusic Team',
        description:
          'Enhanced in-application menu system with modern design and quick actions for improved user experience.',
        icon: '📋',
        category: 'ui',
        features: [
          'Modern Menu',
          'Quick Actions',
          'Customizable Layout',
          'Enhanced UX',
        ],
        status: 'active',
        version: '1.9.1',
        downloads: 22134,
        rating: 4.4,
        reviews: 567,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '9.8 MB',
        lastUpdate: '2024-12-09',
        changelog: [
          'Redesigned menu interface',
          'Added customizable shortcuts',
          'Improved navigation flow',
        ],
      },
      {
        id: 'audio-equalizer',
        name: 'Audio Equalizer',
        author: 'YTMusic Team',
        description:
          'Professional audio equalizer with multiple presets and real-time adjustment for enhanced audio experience.',
        icon: '🎚️',
        category: 'audio',
        features: [
          'Multiple Presets',
          'Real-time Adjustment',
          '10-band EQ',
          'Bass Boost',
        ],
        status: 'active',
        version: '3.1.0',
        downloads: 67890,
        rating: 4.7,
        reviews: 2345,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '13.7 MB',
        lastUpdate: '2024-12-19',
        changelog: [
          'Added 10-band equalizer',
          'New audio presets',
          'Improved processing speed',
        ],
      },
      {
        id: 'lyrics-sync',
        name: 'Lyrics Synchronizer',
        author: 'YTMusic Team',
        description:
          'Synchronized lyrics display with automatic synchronization and multiple language support for karaoke experience.',
        icon: '🎤',
        category: 'utility',
        features: [
          'Synchronized Lyrics',
          'Multiple Languages',
          'Karaoke Mode',
          'Auto-sync',
        ],
        status: 'active',
        version: '2.2.1',
        downloads: 34521,
        rating: 4.6,
        reviews: 987,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '19.3 MB',
        lastUpdate: '2024-12-15',
        changelog: [
          'Improved synchronization accuracy',
          'Added more language sources',
          'Enhanced karaoke features',
        ],
      },
      {
        id: 'discord-rich-presence',
        name: 'Discord Rich Presence',
        author: 'YTMusic Team',
        description:
          'Display your current music on Discord with rich presence integration and activity sharing.',
        icon: '🎮',
        category: 'social',
        features: [
          'Rich Presence',
          'Activity Sharing',
          'Custom Status',
          'Album Art Display',
        ],
        status: 'active',
        version: '1.4.2',
        downloads: 54321,
        rating: 4.5,
        reviews: 1567,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '5.9 MB',
        lastUpdate: '2024-12-14',
        changelog: [
          'Updated Discord API integration',
          'Improved activity accuracy',
          'Added custom status options',
        ],
      },
      {
        id: 'last-fm-scrobbler',
        name: 'Last.fm Scrobbler',
        author: 'YTMusic Team',
        description:
          'Automatic Last.fm scrobbling with play count tracking and music recommendation integration.',
        icon: '📊',
        category: 'social',
        features: [
          'Auto Scrobbling',
          'Play Count Tracking',
          'Music Recommendations',
          'Statistics',
        ],
        status: 'active',
        version: '2.0.3',
        downloads: 43210,
        rating: 4.4,
        reviews: 1234,
        compatibility: ['Windows', 'macOS', 'Linux'],
        size: '8.2 MB',
        lastUpdate: '2024-12-16',
        changelog: [
          'Improved scrobbling accuracy',
          'Added statistics dashboard',
          'Enhanced recommendation algorithm',
        ],
      },
    ];

    // Sort plugins by popularity initially
    this.plugins.sort((a, b) => b.downloads - a.downloads);
  }

  // Setup event listeners
  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('plugin-search');
    const searchClear = document.getElementById('search-clear');

    if (searchInput) {
      searchInput.addEventListener(
        'input',
        this.debounce(e => {
          this.searchTerm = e.target.value.toLowerCase();
          this.updateSearchClear();
          this.applyFilters();
        }, 300)
      );
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        this.clearSearch();
      });
    }

    // View toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
      btn.addEventListener('click', e => {
        this.setView(e.target.closest('.view-btn').dataset.view);
      });
    });

    // Compact view toggle
    const compactToggle = document.getElementById('compact-view');
    if (compactToggle) {
      compactToggle.addEventListener('change', e => {
        this.setCompact(e.target.checked);
      });
    }

    // Sort functionality
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', e => {
        this.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    // Clear filters
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        this.clearAllFilters();
      });
    }

    // Status filters
    const statusFilters = document.querySelectorAll(
      'input[name="status-filter"]'
    );
    statusFilters.forEach(filter => {
      filter.addEventListener('change', e => {
        this.selectedStatus = e.target.value;
        this.applyFilters();
      });
    });

    // Pagination
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());

    // Keyboard shortcuts
    document.addEventListener('keydown', e => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'f':
            e.preventDefault();
            searchInput?.focus();
            break;
          case '/':
            e.preventDefault();
            searchInput?.focus();
            break;
        }
      }
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  // Setup infinite scroll
  setupInfiniteScroll() {
    if (this.isInfiniteScrollEnabled) {
      this.observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !this.isLoading) {
          this.loadMorePlugins();
        }
      });

      const trigger = document.getElementById('scroll-trigger');
      if (trigger) {
        this.observer.observe(trigger);
      }
    }
  }

  // Render category filters
  renderFilters() {
    const container = document.getElementById('category-filters');
    if (!container) return;

    container.innerHTML = Object.entries(this.categories)
      .map(
        ([key, category]) => `
      <label class="category-filter-item" title="${category.description}">
        <input type="checkbox" class="category-filter" value="${key}">
        <span class="category-dot" style="background: ${category.color}"></span>
        <span class="category-name">${category.icon} ${category.name}</span>
      </label>
    `
      )
      .join('');

    // Add event listeners to category filters
    const categoryFilters = container.querySelectorAll('.category-filter');
    categoryFilters.forEach(filter => {
      filter.addEventListener('change', () => {
        this.updateSelectedCategories();
        this.applyFilters();
      });
    });
  }

  // Update selected categories
  updateSelectedCategories() {
    const checked = document.querySelectorAll('.category-filter:checked');
    this.selectedCategories = Array.from(checked).map(cb => cb.value);
  }

  // Apply filters and sorting
  applyFilters() {
    this.showLoading();

    setTimeout(() => {
      this.filteredPlugins = this.plugins.filter(plugin => {
        // Search filter
        const matchesSearch =
          !this.searchTerm ||
          plugin.name.toLowerCase().includes(this.searchTerm) ||
          plugin.description.toLowerCase().includes(this.searchTerm) ||
          plugin.author.toLowerCase().includes(this.searchTerm) ||
          plugin.features.some(feature =>
            feature.toLowerCase().includes(this.searchTerm)
          );

        // Category filter
        const matchesCategory =
          this.selectedCategories.length === 0 ||
          this.selectedCategories.includes(plugin.category);

        // Status filter
        const matchesStatus =
          this.selectedStatus === 'all' ||
          plugin.status === this.selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      });

      // Sort plugins
      this.sortPlugins();

      // Reset to first page when filters change
      this.currentPage = 1;

      this.renderPlugins();
      this.updateResultsSummary();
      this.renderPagination();
      this.hideLoading();
    }, 200); // Simulate loading delay for better UX
  }

  // Sort plugins
  sortPlugins() {
    this.filteredPlugins.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'popularity':
          return b.downloads - a.downloads;
        case 'version':
          return this.compareVersions(b.version, a.version);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  // Compare version strings
  compareVersions(a, b) {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] || 0;
      const bPart = bParts[i] || 0;

      if (aPart > bPart) return 1;
      if (aPart < bPart) return -1;
    }

    return 0;
  }

  // Render plugins
  renderPlugins() {
    const container = document.getElementById('plugins-grid');
    if (!container) return;

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const pluginsToShow = this.filteredPlugins.slice(startIndex, endIndex);

    // Show empty state if no plugins
    if (pluginsToShow.length === 0) {
      container.innerHTML = '';
      this.showEmptyState();
      return;
    }

    this.hideEmptyState();

    // Render plugins with staggered animation
    container.innerHTML = '';
    pluginsToShow.forEach((plugin, index) => {
      const card = this.createPluginCard(plugin);
      card.style.animationDelay = `${index * 0.1}s`;
      container.appendChild(card);
    });

    // Add scroll animation observer
    this.observeCards();
  }

  // Create plugin card
  createPluginCard(plugin) {
    const category = this.categories[plugin.category];
    const card = document.createElement('div');
    card.className = `plugin-card ${this.currentView} ${this.isCompact ? 'compact' : ''}`;
    card.dataset.pluginId = plugin.id;

    const statusIcon = plugin.status === 'active' ? '✅' : '⚠️';
    const statusClass = plugin.status === 'active' ? 'active' : 'maintenance';

    card.innerHTML = `
      <div class="plugin-header">
        <div class="plugin-icon" style="background: ${category.color}">
          ${plugin.icon}
        </div>
        <div class="plugin-info">
          <h3>${plugin.name}</h3>
          <div class="plugin-meta">
            <span class="plugin-author">by ${plugin.author}</span>
            <span class="plugin-version">v${plugin.version}</span>
            <span class="plugin-status ${statusClass}">
              ${statusIcon} ${plugin.status === 'active' ? 'Active' : 'Maintenance'}
            </span>
          </div>
        </div>
      </div>
      
      <div class="plugin-description">
        ${plugin.description}
      </div>
      
      <div class="plugin-features">
        ${plugin.features
          .slice(0, 4)
          .map(
            feature => `
          <span class="tag">${feature}</span>
        `
          )
          .join('')}
        ${plugin.features.length > 4 ? `<span class="tag">+${plugin.features.length - 4} more</span>` : ''}
      </div>
      
      <div class="plugin-stats">
        <div class="plugin-stat">
          <span>⬇️</span>
          <span>${this.formatNumber(plugin.downloads)}</span>
        </div>
        <div class="plugin-stat">
          <span>⭐</span>
          <span>${plugin.rating}</span>
        </div>
        <div class="plugin-stat">
          <span>💬</span>
          <span>${plugin.reviews}</span>
        </div>
      </div>
      
      <div class="plugin-actions">
        <button class="btn btn-ghost" onclick="pluginShowcase.showPluginDetails('${plugin.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          Details
        </button>
        <button class="btn btn-primary" onclick="pluginShowcase.installPlugin('${plugin.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Install
        </button>
      </div>
    `;

    // Add click handler for card
    card.addEventListener('click', e => {
      if (!e.target.closest('.plugin-actions')) {
        this.showPluginDetails(plugin.id);
      }
    });

    return card;
  }

  // Observe cards for scroll animations
  observeCards() {
    const cards = document.querySelectorAll('.plugin-card');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach(card => observer.observe(card));
  }

  // Show plugin details modal
  showPluginDetails(pluginId) {
    const plugin = this.plugins.find(p => p.id === pluginId);
    if (!plugin) return;

    const category = this.categories[plugin.category];
    const modal = this.createPluginModal(plugin, category);
    document.body.appendChild(modal);

    // Show modal with animation
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  // Create plugin modal
  createPluginModal(plugin, category) {
    const modal = document.createElement('div');
    modal.className = 'plugin-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <div class="plugin-icon" style="background: ${category.color}">
            ${plugin.icon}
          </div>
          <div class="modal-title">
            <h2>${plugin.name}</h2>
            <p>by ${plugin.author} • Version ${plugin.version}</p>
          </div>
          <button class="modal-close" onclick="pluginShowcase.closeModal()">×</button>
        </div>
        <div class="modal-body">
          <p>${plugin.description}</p>
          <div class="plugin-details">
            <div class="detail-section">
              <h3>Features</h3>
              <ul>
                ${plugin.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            <div class="detail-section">
              <h3>Statistics</h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: var(--spacing-4);">
                <div style="text-align: center;">
                  <div style="font-size: var(--font-size-2xl); font-weight: bold; color: var(--primary-color);">
                    ${this.formatNumber(plugin.downloads)}
                  </div>
                  <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">Downloads</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: var(--font-size-2xl); font-weight: bold; color: var(--success-color);">
                    ${plugin.rating}
                  </div>
                  <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">Rating</div>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: var(--font-size-2xl); font-weight: bold; color: var(--accent-color);">
                    ${plugin.reviews}
                  </div>
                  <div style="font-size: var(--font-size-sm); color: var(--text-secondary);">Reviews</div>
                </div>
              </div>
            </div>
            <div class="detail-section">
              <h3>Compatibility</h3>
              <div style="display: flex; gap: var(--spacing-2); flex-wrap: wrap;">
                ${plugin.compatibility
                  .map(
                    platform => `
                  <span class="tag">${platform}</span>
                `
                  )
                  .join('')}
              </div>
            </div>
            <div class="detail-section">
              <h3>Category</h3>
              <span class="category-badge" style="background: ${category.color}">
                ${category.icon} ${category.name}
              </span>
            </div>
            <div class="detail-section">
              <h3>Recent Changes</h3>
              <ul>
                ${plugin.changelog.map(change => `<li>${change}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="pluginShowcase.closeModal()">Close</button>
          <button class="btn btn-primary" onclick="pluginShowcase.installPlugin('${plugin.id}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Install Plugin
          </button>
        </div>
      </div>
    `;

    // Close on outside click
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    return modal;
  }

  // Close modal
  closeModal() {
    const modal = document.querySelector('.plugin-modal');
    if (modal) {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = '';
      }, 300);
    }
  }

  // Install plugin (simulation)
  installPlugin(pluginId) {
    const plugin = this.plugins.find(p => p.id === pluginId);
    if (!plugin) return;

    this.showNotification(`Installing ${plugin.name}...`, 'info');

    // Simulate installation process
    setTimeout(() => {
      this.closeModal();
      this.showNotification(
        `${plugin.name} installed successfully!`,
        'success'
      );
    }, 2000);
  }

  // Show notification
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">
          ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
        </span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    document.body.appendChild(notification);

    // Show with animation
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // View management
  setView(view) {
    this.currentView = view;

    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    // Update grid
    const grid = document.getElementById('plugins-grid');
    if (grid) {
      grid.className = `plugins-grid ${view === 'list' ? 'list-view' : ''}`;
    }

    this.renderPlugins();
  }

  setCompact(isCompact) {
    this.isCompact = isCompact;
    this.renderPlugins();
  }

  // Search management
  updateSearchClear() {
    const searchClear = document.getElementById('search-clear');
    if (searchClear) {
      if (this.searchTerm) {
        searchClear.classList.add('visible');
      } else {
        searchClear.classList.remove('visible');
      }
    }
  }

  clearSearch() {
    const searchInput = document.getElementById('plugin-search');
    if (searchInput) {
      searchInput.value = '';
      this.searchTerm = '';
      this.updateSearchClear();
      this.applyFilters();
    }
  }

  // Filter management
  clearAllFilters() {
    // Clear search
    this.clearSearch();

    // Clear categories
    document.querySelectorAll('.category-filter').forEach(cb => {
      cb.checked = false;
    });
    this.selectedCategories = [];

    // Reset status
    document.querySelector('input[name="status-filter"][value="all"]').checked =
      true;
    this.selectedStatus = 'all';

    // Reset sort
    document.getElementById('sort-select').value = 'name';
    this.sortBy = 'name';

    this.applyFilters();
  }

  // Pagination
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPlugins();
      this.renderPagination();
      this.scrollToTop();
    }
  }

  nextPage() {
    const maxPage = Math.ceil(this.filteredPlugins.length / this.itemsPerPage);
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.renderPlugins();
      this.renderPagination();
      this.scrollToTop();
    }
  }

  goToPage(page) {
    this.currentPage = page;
    this.renderPlugins();
    this.renderPagination();
    this.scrollToTop();
  }

  renderPagination() {
    const totalPages = Math.ceil(
      this.filteredPlugins.length / this.itemsPerPage
    );
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const numbersContainer = document.getElementById('pagination-numbers');
    const info = document.getElementById('pagination-info');

    // Update buttons
    if (prevBtn) prevBtn.disabled = this.currentPage === 1;
    if (nextBtn)
      nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;

    // Update info
    if (info) {
      info.textContent =
        totalPages > 0
          ? `Page ${this.currentPage} of ${totalPages}`
          : 'No results';
    }

    // Update page numbers
    if (numbersContainer) {
      numbersContainer.innerHTML = '';

      // Show page numbers (max 7 pages with ellipsis)
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          numbersContainer.appendChild(this.createPageNumber(i));
        }
      } else {
        // Complex pagination with ellipsis
        const start = Math.max(1, this.currentPage - 2);
        const end = Math.min(totalPages, this.currentPage + 2);

        if (start > 1) {
          numbersContainer.appendChild(this.createPageNumber(1));
          if (start > 2) {
            numbersContainer.appendChild(this.createEllipsis());
          }
        }

        for (let i = start; i <= end; i++) {
          numbersContainer.appendChild(this.createPageNumber(i));
        }

        if (end < totalPages) {
          if (end < totalPages - 1) {
            numbersContainer.appendChild(this.createEllipsis());
          }
          numbersContainer.appendChild(this.createPageNumber(totalPages));
        }
      }
    }

    // Show/hide pagination
    const container = document.getElementById('pagination-container');
    if (container) {
      container.style.display = totalPages > 1 ? 'flex' : 'none';
    }
  }

  createPageNumber(page) {
    const btn = document.createElement('button');
    btn.className = `pagination-number ${page === this.currentPage ? 'active' : ''}`;
    btn.textContent = page;
    btn.addEventListener('click', () => this.goToPage(page));
    return btn;
  }

  createEllipsis() {
    const span = document.createElement('span');
    span.textContent = '...';
    span.style.padding = '0 var(--spacing-2)';
    span.style.color = 'var(--text-muted)';
    return span;
  }

  // Load more plugins for infinite scroll
  loadMorePlugins() {
    const maxPage = Math.ceil(this.filteredPlugins.length / this.itemsPerPage);
    if (this.currentPage < maxPage) {
      this.nextPage();
    }
  }

  // Update results summary
  updateResultsSummary() {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
      const total = this.filteredPlugins.length;
      const showing = Math.min(total, this.currentPage * this.itemsPerPage);

      if (total === 0) {
        resultsCount.textContent = 'No plugins found';
      } else if (total === this.plugins.length) {
        resultsCount.textContent = `Showing all ${this.formatNumber(total)} plugins`;
      } else {
        resultsCount.textContent = `Showing ${this.formatNumber(showing)} of ${this.formatNumber(total)} plugins`;
      }
    }
  }

  // Loading states
  showLoading() {
    this.isLoading = true;
    const loading = document.getElementById('loading-state');
    const grid = document.getElementById('plugins-grid');
    const empty = document.getElementById('empty-state');
    const error = document.getElementById('error-state');

    if (loading) loading.style.display = 'block';
    if (grid) grid.style.opacity = '0.5';
    if (empty) empty.style.display = 'none';
    if (error) error.style.display = 'none';
  }

  hideLoading() {
    this.isLoading = false;
    const loading = document.getElementById('loading-state');
    const grid = document.getElementById('plugins-grid');

    if (loading) loading.style.display = 'none';
    if (grid) grid.style.opacity = '1';
  }

  showEmptyState() {
    const empty = document.getElementById('empty-state');
    if (empty) empty.style.display = 'block';
  }

  hideEmptyState() {
    const empty = document.getElementById('empty-state');
    if (empty) empty.style.display = 'none';
  }

  // Utility functions
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  scrollToTop() {
    const container = document.getElementById('plugins-grid');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Error handling
  loadPlugins() {
    this.showLoading();
    setTimeout(() => {
      this.hideLoading();
      this.applyFilters();
    }, 1000);
  }
}

// Initialize plugin showcase when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Plugin Showcase System...');

  // Wait a bit for all DOM elements to be ready
  setTimeout(() => {
    try {
      window.pluginShowcase = new PluginShowcase();
      console.log('Plugin Showcase initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Plugin Showcase:', error);
      // Show error state to user
      const errorState = document.getElementById('error-state');
      if (errorState) {
        errorState.style.display = 'block';
      }
    }
  }, 100);
});

// Also try to initialize immediately if DOM is already ready
if (document.readyState === 'loading') {
  // DOM is still loading, wait for DOMContentLoaded
} else {
  // DOM is already ready, initialize immediately
  setTimeout(() => {
    try {
      if (!window.pluginShowcase) {
        console.log('Initializing Plugin Showcase (immediate)...');
        window.pluginShowcase = new PluginShowcase();
        console.log('Plugin Showcase initialized successfully (immediate)');
      }
    } catch (error) {
      console.error('Failed to initialize Plugin Showcase (immediate):', error);
    }
  }, 100);
}

// Export for global access
if (typeof window !== 'undefined') {
  window.PluginShowcase = PluginShowcase;

  // Make global functions available for HTML onclick handlers
  window.loadPlugins = () => {
    if (window.pluginShowcase) {
      window.pluginShowcase.loadPlugins();
    } else {
      window.pluginShowcase = new PluginShowcase();
    }
  };

  window.clearAllFilters = () => {
    if (window.pluginShowcase) {
      window.pluginShowcase.clearAllFilters();
    }
  };
}
