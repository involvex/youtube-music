// YTMusic Involvex-Edition - Plugins Data
const PLUGINS_DATA = [
  {
    id: 'downloader',
    name: 'Music Downloader',
    author: 'YTMusic Team',
    description:
      'Download YouTube Music tracks and playlists with high quality audio conversion.',
    icon: '📥',
    category: 'core',
    features: [
      'Audio Download',
      'Playlist Support',
      'Quality Selection',
      'Batch Downloads',
    ],
    status: 'active',
    version: '2.1.0',
  },
  {
    id: 'music-together',
    name: 'Music Together',
    author: 'YTMusic Team',
    description:
      'Synchronized playback for group listening sessions with friends and family.',
    icon: '🎵',
    category: 'social',
    features: [
      'Real-time Sync',
      'Group Chat',
      'Queue Sharing',
      'Cross-platform',
    ],
    status: 'active',
    version: '1.5.3',
  },
  {
    id: 'amuse',
    name: 'Amuse Backend',
    author: 'YTMusic Team',
    description:
      'Enhanced backend service for improved audio processing and metadata handling.',
    icon: '🎛️',
    category: 'backend',
    features: [
      'Audio Processing',
      'Metadata Enhancement',
      'Performance Optimization',
    ],
    status: 'active',
    version: '3.0.1',
  },
  {
    id: 'ambient-mode',
    name: 'Ambient Mode',
    author: 'YTMusic Team',
    description:
      'Beautiful ambient animations and visualizations that adapt to your music.',
    icon: '🌅',
    category: 'visualization',
    features: ['Visual Effects', 'Dynamic Animations', 'Customizable Themes'],
    status: 'active',
    version: '1.8.2',
  },
  {
    id: 'album-actions',
    name: 'Album Actions',
    author: 'YTMusic Team',
    description:
      'Enhanced album management with like/dislike buttons and rating system.',
    icon: '❤️',
    category: 'core',
    features: [
      'Like/Dislike',
      'Rating System',
      'Album Organization',
      'Quick Actions',
    ],
    status: 'active',
    version: '2.3.1',
  },
  {
    id: 'api-server',
    name: 'API Server',
    author: 'YTMusic Team',
    description:
      'RESTful API server for remote control and integration with external applications.',
    icon: '🔗',
    category: 'integration',
    features: [
      'REST API',
      'WebSocket Support',
      'Remote Control',
      'External Integration',
    ],
    status: 'active',
    version: '4.2.0',
  },
  {
    id: 'auth-proxy-adapter',
    name: 'Auth Proxy Adapter',
    author: 'YTMusic Team',
    description:
      'Secure authentication proxy for handling user credentials and sessions.',
    icon: '🔐',
    category: 'security',
    features: [
      'Secure Auth',
      'Session Management',
      'Proxy Support',
      'Token Handling',
    ],
    status: 'active',
    version: '1.2.4',
  },
  {
    id: 'browser-integration',
    name: 'Browser Integration',
    author: 'YTMusic Team',
    description:
      'Seamless integration with web browsers for enhanced user experience.',
    icon: '🌐',
    category: 'integration',
    features: ['Browser Extensions', 'Quick Controls', 'Notification Support'],
    status: 'active',
    version: '2.0.5',
  },
  {
    id: 'lumiastream',
    name: 'LumaStream',
    author: 'YTMusic Team',
    description:
      'Streaming optimization plugin for better audio quality and reduced buffering.',
    icon: '📡',
    category: 'streaming',
    features: [
      'Quality Optimization',
      'Buffer Management',
      'Streaming Enhancement',
    ],
    status: 'active',
    version: '1.7.3',
  },
  {
    id: 'activity-guardian',
    name: 'Activity Guardian',
    author: 'YTMusic Team',
    description:
      'Monitors user activity and prevents accidental interruptions during playback.',
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
  },
  {
    id: 'album-color-theme',
    name: 'Album Color Theme',
    author: 'YTMusic Team',
    description:
      'Dynamic color themes based on album artwork for immersive visual experience.',
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
  },
  {
    id: 'in-app-menu',
    name: 'In-App Menu',
    author: 'YTMusic Team',
    description:
      'Enhanced in-application menu system with modern design and quick actions.',
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
  },
];

// Plugin Categories
const PLUGIN_CATEGORIES = {
  core: { name: 'Core Features', color: '#6366f1' },
  social: { name: 'Social', color: '#06b6d4' },
  backend: { name: 'Backend', color: '#10b981' },
  visualization: { name: 'Visualization', color: '#f59e0b' },
  integration: { name: 'Integration', color: '#8b5cf6' },
  security: { name: 'Security', color: '#ef4444' },
  streaming: { name: 'Streaming', color: '#3b82f6' },
  utility: { name: 'Utility', color: '#84cc16' },
  ui: { name: 'User Interface', color: '#ec4899' },
};

// Render Plugins Grid
function renderPluginsGrid(containerId = 'plugins-grid') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const filteredPlugins = getFilteredPlugins();

  container.innerHTML = '';

  if (filteredPlugins.length === 0) {
    container.innerHTML = `
            <div class="no-results">
                <h3>No plugins found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
    return;
  }

  filteredPlugins.forEach(plugin => {
    const pluginCard = createPluginCard(plugin);
    container.appendChild(pluginCard);
  });

  // Add animation to cards
  const cards = container.querySelectorAll('.plugin-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add('animate-on-scroll');
  });
}

// Create Plugin Card Element
function createPluginCard(plugin) {
  const card = document.createElement('div');
  card.className = 'plugin-card';
  card.dataset.pluginId = plugin.id;
  card.dataset.category = plugin.category;
  card.dataset.status = plugin.status;

  const category = PLUGIN_CATEGORIES[plugin.category];
  const statusIcon = plugin.status === 'active' ? '✅' : '⚠️';

  card.innerHTML = `
        <div class="plugin-header">
            <div class="plugin-icon" style="background: ${category.color}">
                ${plugin.icon}
            </div>
            <div class="plugin-info">
                <h3>${plugin.name}</h3>
                <div class="plugin-author">
                    by ${plugin.author} • ${statusIcon} v${plugin.version}
                </div>
            </div>
        </div>
        <div class="plugin-description">
            ${plugin.description}
        </div>
        <div class="plugin-features">
            ${plugin.features
              .map(
                feature => `
                <span class="tag">${feature}</span>
            `
              )
              .join('')}
        </div>
        <div class="plugin-actions">
            <button class="btn btn-ghost" onclick="showPluginDetails('${plugin.id}')">
                Learn More
            </button>
            <button class="btn btn-primary" onclick="installPlugin('${plugin.id}')">
                Install
            </button>
        </div>
    `;

  return card;
}

// Filter and Search Functions
function getSearchTerm() {
  const searchInput = document.getElementById('plugin-search');
  return searchInput ? searchInput.value.toLowerCase() : '';
}

function getSelectedCategories() {
  const checkboxes = document.querySelectorAll('.category-filter:checked');
  return Array.from(checkboxes).map(cb => cb.value);
}

function getFilteredPlugins() {
  const searchTerm = getSearchTerm();
  const selectedCategories = getSelectedCategories();
  const selectedStatus =
    document.querySelector('input[name="status-filter"]:checked')?.value ||
    'all';

  return PLUGINS_DATA.filter(plugin => {
    // Search filter
    const matchesSearch =
      !searchTerm ||
      plugin.name.toLowerCase().includes(searchTerm) ||
      plugin.description.toLowerCase().includes(searchTerm) ||
      plugin.features.some(feature =>
        feature.toLowerCase().includes(searchTerm)
      );

    // Category filter
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(plugin.category);

    // Status filter
    const matchesStatus =
      selectedStatus === 'all' || plugin.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });
}

// Initialize Plugin Search and Filters
function initializePluginFilters() {
  const searchInput = document.getElementById('plugin-search');
  const categoryFilters = document.querySelectorAll('.category-filter');
  const statusFilters = document.querySelectorAll(
    'input[name="status-filter"]'
  );

  // Search input
  if (searchInput) {
    searchInput.addEventListener(
      'input',
      debounce(() => {
        renderPluginsGrid();
      }, 300)
    );
  }

  // Category filters
  categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      renderPluginsGrid();
    });
  });

  // Status filters
  statusFilters.forEach(filter => {
    filter.addEventListener('change', () => {
      renderPluginsGrid();
    });
  });
}

// Plugin Details Modal
function showPluginDetails(pluginId) {
  const plugin = PLUGINS_DATA.find(p => p.id === pluginId);
  if (!plugin) return;

  const category = PLUGIN_CATEGORIES[plugin.category];
  const modal = createPluginModal(plugin, category);
  document.body.appendChild(modal);

  // Show modal with animation
  setTimeout(() => {
    modal.classList.add('active');
  }, 10);
}

function createPluginModal(plugin, category) {
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
                <button class="modal-close" onclick="closeModal(this)">×</button>
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
                        <h3>Category</h3>
                        <span class="category-badge" style="background: ${category.color}">
                            ${category.name}
                        </span>
                    </div>
                    <div class="detail-section">
                        <h3>Status</h3>
                        <span class="status-badge ${plugin.status}">
                            ${plugin.status === 'active' ? 'Active' : 'Maintenance'}
                        </span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal(this)">Close</button>
                <button class="btn btn-primary" onclick="installPlugin('${plugin.id}')">Install Plugin</button>
            </div>
        </div>
    `;

  // Close on outside click
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal(modal.querySelector('.modal-close'));
    }
  });

  return modal;
}

// Plugin Installation (Simulation)
function installPlugin(pluginId) {
  const plugin = PLUGINS_DATA.find(p => p.id === pluginId);
  if (!plugin) return;

  // Show installation progress
  const notification = createNotification(
    `Installing ${plugin.name}...`,
    'info'
  );
  document.body.appendChild(notification);

  // Simulate installation process
  setTimeout(() => {
    closeModal(document.querySelector('.plugin-modal .modal-close'));
    notification.remove();

    const successNotification = createNotification(
      `${plugin.name} installed successfully!`,
      'success'
    );
    document.body.appendChild(successNotification);

    setTimeout(() => {
      successNotification.remove();
    }, 3000);
  }, 2000);
}

// Utility Functions
function debounce(func, wait) {
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

function createNotification(message, type = 'info') {
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

  return notification;
}

function closeModal(closeButton) {
  const modal = closeButton.closest('.plugin-modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
    }, 300);
  }
}

// Generate Category Filters
function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  if (!container) return;

  container.innerHTML = Object.entries(PLUGIN_CATEGORIES)
    .map(
      ([key, category]) => `
        <label class="category-filter-item">
            <input type="checkbox" class="category-filter" value="${key}">
            <span class="category-dot" style="background: ${category.color}"></span>
            <span class="category-name">${category.name}</span>
        </label>
    `
    )
    .join('');
}

// Initialize plugins system
function initializePlugins() {
  renderCategoryFilters();
  renderPluginsGrid();
  initializePluginFilters();
}

// Export functions for use in HTML
if (typeof window !== 'undefined') {
  window.pluginsData = PLUGINS_DATA;
  window.pluginCategories = PLUGIN_CATEGORIES;
  window.renderPluginsGrid = renderPluginsGrid;
  window.showPluginDetails = showPluginDetails;
  window.installPlugin = installPlugin;
  window.initializePlugins = initializePlugins;
}
