/* eslint-disable no-unused-vars */

export interface VideoSwitchButtonProps {
  onClick?: (_event: MouseEvent) => void;
  onChange?: (_event: Event) => void;
  songButtonText: string;
  videoButtonText: string;
}

export const VideoSwitchButton = (props: VideoSwitchButtonProps) => (
  <div
    class="video-switch-button"
    data-video-button-text={props.videoButtonText}
    on:click={(e) => props.onClick?.(e)}
    onChange={(e) => props.onChange?.(e)}
  >
    <input
      checked={true}
      class="video-switch-button-checkbox"
      id="video-toggle-video-switch-button-checkbox"
      type="checkbox"
    />
    <label
      class="video-switch-button-label"
      for="video-toggle-video-switch-button-checkbox"
    >
      <span class="video-switch-button-label-span">{props.songButtonText}</span>
    </label>
  </div>
);
