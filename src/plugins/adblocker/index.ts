import { createPlugin } from '@/utils';
import { ElectronBlocker } from '@ghostery/adblocker-electron';
import { t } from '@/i18n';

export default createPlugin({
  name: () => t('plugins.adblocker.name'),
  description: () => t('plugins.adblocker.description'),
  restartNeeded: true,
  config: {
    enabled: true,
  },
  backend: {
    async start({ window }) {
      const blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);
      blocker.enableBlockingInSession(window.webContents.session);
    },
    stop() {
      // Restart is required to disable
    },
  },
});
