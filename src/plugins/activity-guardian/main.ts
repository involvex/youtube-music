import { BrowserWindow } from 'electron';

import type { BackendContext } from '@/types/contexts';
import type { ActivityGuardianPluginConfig } from './index';

export let config: ActivityGuardianPluginConfig;
export let win: BrowserWindow;

let heartbeatInterval: NodeJS.Timeout | null = null;
let isPlaying = false;
let lastActivityTime = Date.now();

export const onMainLoad = async ({
  window: _win,
  getConfig,
}: BackendContext<ActivityGuardianPluginConfig>) => {
  win = _win;
  config = await getConfig();

  if (config.enabled) {
    startActivityGuardian();
  }
};

export const onConfigChange = (newConfig: ActivityGuardianPluginConfig) => {
  config = newConfig;

  if (config.enabled) {
    startActivityGuardian();
  } else {
    stopActivityGuardian();
  }
};

function startActivityGuardian() {
  stopActivityGuardian(); // Clear any existing intervals

  if (config.debugMode) {
    console.log(
      '[Activity Guardian] Starting activity guardian with interval:',
      config.heartbeatInterval,
      'ms',
    );
  }

  // Monitor for playback state changes
  win.webContents.once('did-finish-load', () => {
    setupPlaybackMonitoring();
  });

  // If already loaded, setup monitoring immediately
  if (win.webContents.getURL()) {
    setupPlaybackMonitoring();
  }

  // Start the heartbeat interval
  heartbeatInterval = setInterval(() => {
    performHeartbeat();
  }, config.heartbeatInterval);
}

function stopActivityGuardian() {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
  if (config.debugMode) {
    console.log('[Activity Guardian] Activity guardian stopped');
  }
}

function setupPlaybackMonitoring() {
  // Monitor for play/pause events by checking the current URL and player state
  const checkPlaybackState = async () => {
    try {
      const isCurrentlyPlaying = (await win.webContents.executeJavaScript(`
        (() => {
          // Check if music is currently playing
          const playButton = document.querySelector('ytmusic-play-button-renderer');
          if (playButton) {
            const isPaused = playButton.hasAttribute('disabled') ||
                            playButton.getAttribute('aria-label')?.includes('Play') ||
                            document.querySelector('[aria-label="Play"]') !== null;
            return !isPaused;
          } else {
            return false;
          }
        })()
      `)) as boolean;

      const wasPlaying = isPlaying;
      isPlaying = isCurrentlyPlaying;

      if (config.debugMode && wasPlaying !== isPlaying) {
        console.log(
          `[Activity Guardian] Playback state changed: ${wasPlaying ? 'playing' : 'paused'} -> ${isPlaying ? 'playing' : 'paused'}`,
        );
      }

      // Update last activity time if playing
      if (isPlaying) {
        lastActivityTime = Date.now();
      }
    } catch (error) {
      if (config.debugMode) {
        console.warn(
          '[Activity Guardian] Error checking playback state:',
          error,
        );
      }
    }
  };

  // Check playback state periodically
  const playbackCheckInterval = setInterval(checkPlaybackState, 5000);

  // Clean up when window is closed
  win.on('closed', () => {
    clearInterval(playbackCheckInterval);
  });

  // Initial check
  checkPlaybackState();
}

function performHeartbeat() {
  if (!config.preventSuspension || !isPlaying) {
    return;
  }

  const now = Date.now();
  const timeSinceLastActivity = now - lastActivityTime;

  // If it's been too long since last activity, simulate some
  if (timeSinceLastActivity > config.heartbeatInterval * 0.8) {
    simulateUserActivity();
  }
}

function simulateUserActivity() {
  if (!config.stealthMode) {
    if (config.debugMode) {
      console.log('[Activity Guardian] Simulating user activity');
    }
  }

  // Simulate mouse movement (subtle, non-intrusive)
  if (config.smartPausePrevention) {
    win.webContents
      .executeJavaScript(
        `
      // Simulate subtle mouse movement without interfering with user experience
      const events = ['mousemove', 'mousedown', 'mouseup', 'keydown', 'keyup'];
      const randomEvent = events[Math.floor(Math.random() * events.length)];

      // Only simulate if user is actively listening (not just having the app open)
      const isActuallyPlaying = document.querySelector('ytmusic-play-button-renderer') &&
                                !document.querySelector('[aria-label="Play"]');

      if (isActuallyPlaying) {
        const event = new MouseEvent(randomEvent, {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: Math.floor(Math.random() * 100) + 50,
          clientY: Math.floor(Math.random() * 100) + 50
        });

        // Dispatch the event to the most active element (usually the player)
        const player = document.querySelector('ytmusic-player') || document.body;
        player.dispatchEvent(event);
      }
    `,
      )
      .catch((error) => {
        if (config.debugMode) {
          console.warn('[Activity Guardian] Error simulating activity:', error);
        }
      });
  }
}

// Export functions for renderer to communicate with backend
export const activityGuardianAPI = {
  updatePlaybackState: (playing: boolean) => {
    isPlaying = playing;
    if (playing) {
      lastActivityTime = Date.now();
    }
    if (config.debugMode) {
      console.log(
        `[Activity Guardian] Playback state updated: ${playing ? 'playing' : 'paused'}`,
      );
    }
  },

  forceActivity: () => {
    lastActivityTime = Date.now();
    simulateUserActivity();
  },

  getStatus: () => ({
    enabled: config.enabled,
    isPlaying,
    lastActivityTime,
    heartbeatInterval: config.heartbeatInterval,
  }),
};
