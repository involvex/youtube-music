import { getSongInfo } from '@/providers/song-info-front';
import { activityGuardianAPI } from './main';

// @ts-ignore - ipc parameter not used in this implementation
export const onRendererLoad = () => {
  let isPlaying = false;
  let songUrl = '';
  // Intercept XMLHttpRequest to fix CORS issues with ad requests
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (
    method: string,
    url: string | URL,
    ...args: any[]
  ) {
    // Check if this is an ad request
    if (
      typeof url === 'string' &&
      (url.includes('doubleclick.net') ||
        url.includes('googlesyndication.com') ||
        url.includes('googleadservices.com') ||
        url.includes('pagead') ||
        url.includes('youtube.com/pagead'))
    ) {
      // For ad requests, ensure credentials are disabled to avoid CORS issues
      (this as XMLHttpRequest).withCredentials = false;
    }

    // @ts-ignore - Spread operator for rest parameters
    return originalOpen.call(this, method, url, ...args);
    // @ts-ignore - Spread operator for XMLHttpRequest args
  };
  const checkPlaybackState = () => {
    try {
      const songInfo = getSongInfo();
      const currentlyPlaying = songInfo && !songInfo.isPaused;
      const currentUrl = songInfo?.url || '';

      // Update backend if state changed
      if (currentlyPlaying !== isPlaying || currentUrl !== songUrl) {
        isPlaying = currentlyPlaying;
        songUrl = currentUrl;

        if (isPlaying) {
          activityGuardianAPI.updatePlaybackState(true);
        }
      }
    } catch (error) {
      // Silently handle errors to avoid disrupting the user experience
    }
  };

  // Check playback state periodically
  const intervalId = setInterval(checkPlaybackState, 2000);

  // Also listen for specific YouTube Music events
  setupYouTubeMusicEventListeners();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(intervalId);
  });
};

function setupYouTubeMusicEventListeners() {
  // Listen for YouTube Music's internal events
  document.addEventListener('yt-navigate-finish', () => {
    // Page navigation occurred, recheck state
    setTimeout(checkYouTubeMusicState, 1000);
  });

  // Watch for changes in the play button state
  const playButtonObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'aria-label'
      ) {
        checkYouTubeMusicState();
      }
    });
  });

  // Start observing when the play button is available
  const startObservingPlayButton = () => {
    const playButton = document.querySelector('ytmusic-play-button-renderer');
    if (playButton) {
      playButtonObserver.observe(playButton, {
        attributes: true,
        attributeFilter: ['aria-label', 'disabled'],
      });
    } else {
      // Retry after a delay if play button not found yet
      setTimeout(startObservingPlayButton, 1000);
    }
  };

  startObservingPlayButton();

  // Activity Guardian: Auto-click "Yes" on "Video paused. Continue watching?" dialog
  setInterval(() => {
    try {
      const dialog = document.querySelector('ytmusic-you-there-renderer');
      if (dialog) {
        const button = dialog.querySelector(
          '[aria-label="Yes"]',
        ) as HTMLElement;
        if (button) {
          button.click();
          console.log(
            '[ActivityGuardian] Auto-clicked "Yes" on inactivity dialog',
          );
        }
      }

      // Also check for standard paper-dialog which is sometimes used
      const paperDialog = document.querySelector('tp-yt-paper-dialog');
      if (paperDialog && paperDialog.id === 'ytd-you-there-renderer-dialog') {
        const button = paperDialog.querySelector(
          '[aria-label="Yes"]',
        ) as HTMLElement;
        if (button) {
          button.click();
          console.log('[ActivityGuardian] Auto-clicked "Yes" on paper-dialog');
        }
      }
    } catch (e) {
      // Ignore errors
    }
  }, 2000);
}

function checkYouTubeMusicState() {
  try {
    const playButton = document.querySelector('ytmusic-play-button-renderer');
    if (playButton) {
      const isPaused =
        playButton.hasAttribute('disabled') ||
        playButton.getAttribute('aria-label')?.includes('Play') ||
        document.querySelector('[aria-label="Play"]') !== null;

      const currentlyPlaying = !isPaused;
      activityGuardianAPI.updatePlaybackState(currentlyPlaying);
    }
  } catch (error) {
    // Silently handle errors
  }
}
