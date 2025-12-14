import prompt from 'custom-electron-prompt';

import { activityGuardianAPI } from './main';
import { t } from '@/i18n';

import promptOptions from '@/providers/prompt-options';

import type { MenuContext } from '@/types/contexts';
import type { MenuTemplate } from '@/menu';
import type { ActivityGuardianPluginConfig } from './index';

export const onMenu = async ({
  getConfig,
  setConfig,
}: MenuContext<ActivityGuardianPluginConfig>): Promise<MenuTemplate> => {
  const config = await getConfig();

  return [
    {
      label: t('plugins.activity-guardian.menu.prevent-suspension'),
      type: 'checkbox',
      checked: config.preventSuspension,
      click(item) {
        setConfig({
          preventSuspension: item.checked,
        });
      },
    },
    {
      label: t('plugins.activity-guardian.menu.smart-pause-prevention'),
      type: 'checkbox',
      checked: config.smartPausePrevention,
      click(item) {
        setConfig({
          smartPausePrevention: item.checked,
        });
      },
    },
    {
      label: t('plugins.activity-guardian.menu.stealth-mode'),
      type: 'checkbox',
      checked: config.stealthMode,
      click(item) {
        setConfig({
          stealthMode: item.checked,
        });
      },
    },
    {
      label: t('plugins.activity-guardian.menu.debug-mode'),
      type: 'checkbox',
      checked: config.debugMode,
      click(item) {
        setConfig({
          debugMode: item.checked,
        });
      },
    },
    {
      label: t('plugins.activity-guardian.menu.heartbeat-interval'),
      async click() {
        const res = await prompt({
          title: t('plugins.activity-guardian.menu.heartbeat-interval'),
          type: 'input',
          inputAttrs: {
            type: 'number',
            required: true,
            min: '5000',
            max: '300000',
            step: '1000',
          },
          value: String(config.heartbeatInterval),
          ...promptOptions(),
        }).catch(console.error);

        if (!res) {
          return undefined;
        }

        const interval = Number(res);
        if (interval >= 5000 && interval <= 300000) {
          setConfig({
            heartbeatInterval: interval,
          });
        }
        return;
      },
    },
    {
      type: 'separator',
    },
    {
      label: t('plugins.activity-guardian.menu.force-activity'),
      click() {
        activityGuardianAPI.forceActivity();
      },
    },
    {
      label: t('plugins.activity-guardian.menu.status'),
      click() {
        const status = activityGuardianAPI.getStatus();
        const statusText = t('plugins.activity-guardian.menu.status-details', {
          enabled: status.enabled ? t('common.enabled') : t('common.disabled'),
          isPlaying: status.isPlaying ? t('common.yes') : t('common.no'),
          lastActivity: new Date(status.lastActivityTime).toLocaleTimeString(),
          interval: `${status.heartbeatInterval / 1000}s`,
        });

        console.log('[Activity Guardian Status]', statusText);
      },
    },
  ];
};
