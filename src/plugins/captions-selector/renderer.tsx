import { render } from 'solid-js/web';
import { createSignal, Show } from 'solid-js';

import { createRenderer } from '@/utils';
import { t } from '@/i18n';

import { CaptionsSettingButton } from './templates/captions-settings-template';

import type { MusicPlayer } from '@/types/music-player';
import type { AppElement } from '@/types/queue';

export interface LanguageOptions {
  displayName: string;
  id: string | null;
  is_default: boolean;
  is_servable: boolean;
  is_translateable: boolean;
  kind: string;
  languageCode: string; // 2 length
  languageName: string;
  name: string | null;
  vss_id: string;
}

export interface CaptionsSelectorConfig {
  enabled: boolean;
  disableCaptions: boolean;
  autoload: boolean;
  lastCaptionsCode: string;
}

const [hidden, setHidden] = createSignal(false);

export default createRenderer<
  {
    captionsSettingsButton?: HTMLElement;
    captionTrackList: LanguageOptions[] | null;
    api: MusicPlayer | null;
    config: CaptionsSelectorConfig | null;
    videoChangeListener: () => void;
  },
  CaptionsSelectorConfig
>({
  captionTrackList: null,
  api: null,
  config: null,
  videoChangeListener() {
    if (this.config?.disableCaptions) {
      setTimeout(() => this.api!.unloadModule('captions'), 100);
      setHidden(true);
      return;
    }

    this.api!.loadModule('captions');

    setTimeout(() => {
      this.captionTrackList =
        this.api!.getOption('captions', 'tracklist') ?? [];

      if (this.config!.autoload && this.config!.lastCaptionsCode) {
        this.api?.setOption('captions', 'track', {
          languageCode: this.config!.lastCaptionsCode,
        });
      }

      setHidden(!this.captionTrackList?.length);
    }, 250);
  },
  async start({ getConfig }) {
    this.config = await getConfig();
  },
  stop() {
    this.api?.unloadModule('captions');
    document
      .querySelector('video')
      ?.removeEventListener('peard:src-changed', this.videoChangeListener);
    if (this.captionsSettingsButton) {
      document
        .querySelector('.right-controls-buttons')
        ?.removeChild(this.captionsSettingsButton);
    }
  },
  onPlayerApiReady(playerApi, { ipc, setConfig }) {
    this.api = playerApi;

    render(
      () => (
        <Show when={!hidden()}>
          <CaptionsSettingButton
            label={t('plugins.captions-selector.templates.title')}
            onClick={() => {
              const handleCaptionSelection = async () => {
                const appApi =
                  document.querySelector<AppElement>('ytmusic-app');

                if (this.captionTrackList?.length) {
                  const currentCaptionTrack =
                    playerApi.getOption<LanguageOptions>('captions', 'track');

                  // Simplified currentIndex calculation using findIndex
                  const currentIndex = currentCaptionTrack
                    ? this.captionTrackList.findIndex(
                        (track) =>
                          track.languageCode ===
                          currentCaptionTrack.languageCode,
                      )
                    : -1;

                  const captionLabels = [
                    ...this.captionTrackList.map((track) => track.displayName),
                    'None',
                  ];

                  const selectedIndex = (await ipc.invoke(
                    'peard:captions-selector',
                    captionLabels,
                    currentIndex,
                  )) as number;

                  if (selectedIndex === -1) {
                    return;
                  }

                  const newCaptions =
                    selectedIndex === captionLabels.length - 1
                      ? null // "None" option selected
                      : this.captionTrackList[selectedIndex];

                  setConfig({ lastCaptionsCode: newCaptions?.languageCode });
                  if (newCaptions) {
                    playerApi.setOption('captions', 'track', {
                      languageCode: newCaptions.languageCode,
                    });
                    appApi?.toastService?.show(
                      t('plugins.captions-selector.toast.caption-changed', {
                        language: newCaptions.displayName,
                      }),
                    );
                  } else {
                    playerApi.setOption('captions', 'track', {});
                    appApi?.toastService?.show(
                      t('plugins.captions-selector.toast.caption-disabled'),
                    );
                  }

                  setTimeout(() => playerApi.playVideo());
                } else {
                  appApi?.toastService?.show(
                    t('plugins.captions-selector.toast.no-captions'),
                  );
                }
              };

              handleCaptionSelection().catch(console.error);
            }}
            ref={this.captionsSettingsButton}
          />
        </Show>
      ),
      document.querySelector('.right-controls-buttons')!,
    );

    this.captionTrackList =
      this.api.getOption<LanguageOptions[]>('captions', 'tracklist') ?? [];

    document
      .querySelector('video')
      ?.addEventListener('peard:src-changed', this.videoChangeListener);
  },
  onConfigChange(newConfig) {
    this.config = newConfig;
  },
});
