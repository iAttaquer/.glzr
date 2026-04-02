import "./style.css";
import { Component, createSignal, createEffect } from "solid-js";
import { AudioOutput } from "zebar";
import { GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface VolumeStatusProps {
  audio: AudioOutput;
  glazewm: GlazeWmOutput;
}

const VolumeStatus: Component<VolumeStatusProps> = (props) => {
  const [volume, setVolume] = createSignal(0);
  const [expanded, setExpanded] = createSignal(false);

  let lastInteraction = 0;
  let isDragging = false;
  let trackRef: HTMLDivElement | undefined;

  createEffect(() => {
    const v = props.audio?.defaultPlaybackDevice?.volume;
    if (v !== undefined && Date.now() - lastInteraction > 1200) {
      setVolume(v);
    }
  });

  const applyVolume = (clientX: number) => {
    if (!trackRef) return;
    const rect = trackRef.getBoundingClientRect();
    const pos = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const val = Math.round(pos * 100);
    lastInteraction = Date.now();
    setVolume(val);
    props.audio?.setVolume(val);
  };

  const handlePointerDown = (e: PointerEvent) => {
    e.preventDefault();
    isDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    applyVolume(e.clientX);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    applyVolume(e.clientX);
  };

  const handlePointerUp = () => {
    isDragging = false;
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 2 : -2;
    const val = Math.min(100, Math.max(0, volume() + delta));
    lastInteraction = Date.now();
    setVolume(val);
    props.audio?.setVolume(val);
  };

  const { isActive, handleClick } = useAnimatedClick();

  const handleVolumeClick = () => {
    handleClick();
    props.glazewm.runCommand(
      "shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/assets/scripts/OpenSoundOutput.ahk",
    );
  };

  const VolumeIcon = () => {
    const vol = volume();
    if (vol > 80) {
      return <img src="./assets/icons/icons8-audio-3-32.png" height={23} width={23} />;
    } else if (vol > 40) {
      return <img src="./assets/icons/icons8-audio-2-32.png" height={23} width={23} />;
    } else if (vol > 0) {
      return <img src="./assets/icons/icons8-audio-1-32.png" height={23} width={23} />;
    } else {
      return <img src="./assets/icons/icons8-audio-0-32.png" height={23} width={23} />;
    }
  };

  return (
    <>
      {props.audio?.defaultPlaybackDevice && (
        <div class="template volume" onWheel={handleWheel}>
          <button
            class={`volume-icon ${isActive() ? "clicked-animated" : ""}`}
            onClick={handleVolumeClick}
          >
            <span class="content">{VolumeIcon()}</span>
          </button>
          <div
            class="volume-status"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => { if (!isDragging) setExpanded(false); }}
          >
            <div class="volume-text">{volume()}</div>
            <div
              class={`vol-track ${expanded() ? "expanded" : ""}`}
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div class="vol-fill" style={{ width: `${volume()}%` }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VolumeStatus;
