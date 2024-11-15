import "./style.css";
import { Component } from "solid-js";
import { MediaOutput } from "/zebar";

interface MediaStatusProps {
  media: MediaOutput;
}

const MediaStatus: Component<MediaStatusProps> = (props) => {

  return (
    <>
      {props.media?.session && (
        <div class="template playing">
          <img
            src="./assets/icons/icons8-musical-note-32.png"
            height="23"
            width="23"
          />
          {props.media?.session?.title} | 
          {props.media?.session?.artist}
          <div class="progress-play" style={`width: ${props.media?.session?.position/props.media?.session?.endTime*100}%`}></div>
        </div>
      )}
      </>
  );
};

export default MediaStatus;
