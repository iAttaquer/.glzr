import "./style.css";
import { Component } from "solid-js";
import { MediaOutput } from "zebar";

interface MediaStatusProps {
  media: MediaOutput;
}

const MediaStatus: Component<MediaStatusProps> = (props) => {
  const MediaIcons = {
    media: (
      <img
        src="./assets/icons/icons8-musical-note-32.png"
        height={23}
        width={23}
      />
    ),
    Brave: (
      <img src="./assets/icons/icons8-brave-32.png" height={23} width={23} />
    ),
    "Spotify.exe": (
      <img src="./assets/icons/icons8-spotify-32.png" height={23} width={23} />
    ),
  };
  return (
    <>
      {props.media?.currentSession && (
        <div class={`template media`}>
          {MediaIcons[props.media?.currentSession.sessionId] ??
            MediaIcons["media"]}
          <button
            class="prev"
            onClick={() => {
              props.media?.previous();
            }}
          >
            <span class="content">󰒮</span>
          </button>
          <button
            class="play-pause"
            onClick={() => {
              props.media?.togglePlayPause();
            }}
          >
            <span class="content">
              {props.media?.currentSession.isPlaying ? "󰏤" : "󰐊"}
            </span>
          </button>
          <button
            class="next"
            onClick={() => {
              props.media?.next();
            }}
          >
            <span class="content">󰒭</span>
          </button>
          <div class="media-text">
            {props.media?.currentSession?.title} |
            {props.media?.currentSession?.artist}
          </div>
          <div
            class="progress-play"
            style={`width: ${(props.media?.currentSession?.position / props.media?.currentSession?.endTime) * 100}%`}
          ></div>
        </div>
      )}
    </>
  );
};

export default MediaStatus;
