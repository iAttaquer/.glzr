import "./style.css";
import { Component, createSignal, createEffect } from "solid-js";
import { AudioOutput } from "zebar";
import { GlazeWmOutput } from "zebar";
import { Slider } from "@kobalte/core/slider";

interface VolumeStatusProps {
  audio: AudioOutput;
  glazewm: GlazeWmOutput;
}

const VolumeStatus: Component<VolumeStatusProps> = (props) => {
  const [volume, setVolume] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);

  createEffect(() => {
    if (props.audio?.defaultPlaybackDevice) {
      setVolume(props.audio?.defaultPlaybackDevice.volume);
    } else {
      setVolume(0);
    }
  });

  const handleSliderChange = (value: number) => {
    if (props.audio?.defaultPlaybackDevice) {
      props.audio?.setVolume(value);
      setVolume(value);
    }
  };
  const VolumeIcon = () => {
    const vol = volume();
    if (vol > 80) {
      return <img src="./assets/icons/icons8-audio-3-32.png" height={23} width={23}/>;
    }
    else if (vol > 40) {
      return <img src="./assets/icons/icons8-audio-2-32.png" height={23} width={23}/>;
    }
    else if (vol > 0) {
      return <img src="./assets/icons/icons8-audio-1-32.png" height={23} width={23}/>;
    }
    else {
      return <img src="./assets/icons/icons8-audio-0-32.png" height={23} width={23}/>;
    }
  };
  return (
    <>
    {props.audio?.defaultPlaybackDevice && (
      <div class="template volume">
        <button class="volume-icon"
          onClick={() => {
            props.glazewm.runCommand("shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/assets/scripts/OpenSoundOutput.ahk");
          }}>
          <span class="content">
            {VolumeIcon()}
          </span>
        </button>
        <div class={`volume-status`}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}>
          <div class="volume-text">
            {props.audio?.defaultPlaybackDevice.volume}%
          </div>
         <Slider class={`SliderRoot ${expanded() ? "expanded" : ""}`}
          step={2} minValue={0} maxValue={100} value={[volume()]}
          onChange={([newValue]) => handleSliderChange(newValue)}>
            <Slider.Track class="SliderTrack">
              <Slider.Fill class="SliderRange" />
              <Slider.Thumb class="SliderThumb">
                <Slider.Input />
              </Slider.Thumb>
              <Slider.Thumb class="SliderThumb">
                <Slider.Input />
              </Slider.Thumb>
            </Slider.Track>
          </Slider>
        </div>
      </div>
    )}
    </>
    );
};

export default VolumeStatus;