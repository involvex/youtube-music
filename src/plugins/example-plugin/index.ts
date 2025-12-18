import { createPlugin } from '@/utils';

export default createPlugin({
  name: () => 'Example Plugin',
  description: () => 'This is a sample plugin template for developers.',
  restartNeeded: false,
  config: {
    enabled: false,
    // Add custom configuration options here
    exampleOption: false,
  },

  // Backend (Main Process) Code
  // This runs in the main Electron process.
  backend: {
    async start({ getConfig /*, window */ }) {
      const config = await getConfig();
      console.log('Example Plugin: Backend started', config);

      // You can access the window object to manipulate the browser window
      // by adding 'window' to the start arguments: async start({ getConfig, window })
      // window.setTitle('Example Plugin Active');

      // You can set up IPC handlers here
    },
    stop() {
      console.log('Example Plugin: Backend stopped');
    },
    onConfigChange(newConfig) {
      console.log('Example Plugin: Config changed', newConfig);
    },
  },

  // Preload (Context Bridge) Code
  // This runs in the preload script, having access to Node.js APIs and the DOM.
  preload: {
    async start({ getConfig }) {
      const config = await getConfig();
      console.log('Example Plugin: Preload started', config);
    },
    stop() {
      console.log('Example Plugin: Preload stopped');
    },
  },

  // Renderer (Web Page) Code
  // This runs inside the web page (YouTube Music interface).
  renderer: {
    async start({ getConfig }) {
      const config = await getConfig();
      console.log('Example Plugin: Renderer started', config);

      // Example: Observe the DOM
      const observer = new MutationObserver(() => {
        // Logic to modify UI
      });
      observer.observe(document.body, { childList: true, subtree: true });
    },
    stop() {
      console.log('Example Plugin: Renderer stopped');
    },
    onConfigChange(newConfig) {
      // React to config changes in real-time
      console.log('Example Plugin: Renderer config changed', newConfig);
    },
  },
});
