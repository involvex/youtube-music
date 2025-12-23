import titlebarStyle from './titlebar.css?inline';
import { createPlugin } from '@/utils';
import { onMainLoad } from './main';
import { onMenu } from './menu';
import { onConfigChange, onPlayerApiReady, onRendererLoad } from './renderer';
import { t } from '@/i18n';
import type { InAppMenuConfig } from './constants';

const defaultInAppMenuConfig: InAppMenuConfig = {
  enabled:
    ((typeof window !== 'undefined' &&
      !window.navigator?.userAgent?.toLowerCase().includes('mac')) ||
      (typeof global !== 'undefined' &&
        global.process?.platform !== 'darwin')) &&
    ((typeof window !== 'undefined' &&
      !window.navigator?.userAgent?.toLowerCase().includes('linux')) ||
      (typeof global !== 'undefined' && global.process?.platform !== 'linux')),
  hideDOMWindowControls: false,
};

export default createPlugin({
  name: () => t('plugins.in-app-menu.name'),
  description: () => t('plugins.in-app-menu.description'),
  restartNeeded: true,
  config: defaultInAppMenuConfig,
  stylesheets: [titlebarStyle],
  menu: onMenu,

  backend: onMainLoad,
  renderer: {
    start: onRendererLoad,
    onPlayerApiReady,
    onConfigChange,
  },
});
