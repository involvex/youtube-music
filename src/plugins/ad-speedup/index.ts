import { createPlugin } from '@/utils';
import { t } from '@/i18n';

export default createPlugin({
  name: () => t('plugins.ad-speedup.name'),
  description: () => t('plugins.ad-speedup.description'),
  restartNeeded: false,
  config: {
    enabled: false,
  },
  renderer: {
    start() {
      const video = document.querySelector('video');
      if (video) {
        const obs = new MutationObserver(() => {
          const ad = document.querySelector('.ad-showing');
          if (ad && video) {
            video.playbackRate = 16;
            video.muted = true;
          }
        });
        obs.observe(document.body, { childList: true, subtree: true });
      }
    },
    stop() {
      // logic to stop
    },
  },
});
