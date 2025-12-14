import { createPlugin } from '@/utils';
import { onMainLoad } from './main';
import { onRendererLoad } from './renderer';
import { onMenu } from './menu';
import { t } from '@/i18n';

export type ActivityGuardianPluginConfig = {
  enabled: boolean;
  heartbeatInterval: number;
  preventSuspension: boolean;
  smartPausePrevention: boolean;
  stealthMode: boolean;
  debugMode: boolean;
};

export const defaultConfig: ActivityGuardianPluginConfig = {
  enabled: false,
  heartbeatInterval: 30000, // 30 seconds
  preventSuspension: true,
  smartPausePrevention: true,
  stealthMode: true,
  debugMode: false,
};

export default createPlugin({
  name: () => t('plugins.activity-guardian.name'),
  description: () => t('plugins.activity-guardian.description'),
  config: defaultConfig,
  backend: {
    start: onMainLoad,
  },
  renderer: {
    start: onRendererLoad,
  },
  menu: onMenu,
});
