import "./style.css";
import { Component, createSignal, createEffect, on } from "solid-js";
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

  createEffect(
    on(
      () => props.audio?.defaultPlaybackDevice?.volume,
      (v) => {
        if (v !== undefined && Date.now() - lastInteraction > 1200) {
          setVolume(v);
        }
      },
    ),
  );

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
    const level = vol > 65 ? 3 : vol > 40 ? 2 : vol > 0 ? 1 : 0;
    const active = "rgba(255,255,255,0.8)";
    const muted = "rgba(255,255,255,0.25)";

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="20"
        height="20"
      >
        <polygon points="4,11 10,11 17,5 17,27 10,21 4,21" fill={active} />
        {level === 0 ? (
          <>
            <line
              x1="21"
              y1="11"
              x2="29"
              y2="21"
              stroke={active}
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="29"
              y1="11"
              x2="21"
              y2="21"
              stroke={active}
              stroke-width="2"
              stroke-linecap="round"
            />
          </>
        ) : (
          <>
            <path
              d="M20,12 Q23,16 20,20"
              fill="none"
              stroke-linecap="round"
              stroke={level >= 1 ? active : muted}
              stroke-width="2"
            />
            <path
              d="M22.5,9.5 Q27.5,16 22.5,22.5"
              fill="none"
              stroke-linecap="round"
              stroke={level >= 2 ? active : muted}
              stroke-width="2"
            />
            <path
              d="M25,7 Q32,16 25,25"
              fill="none"
              stroke-linecap="round"
              stroke={level >= 3 ? active : muted}
              stroke-width="2"
            />
          </>
        )}
      </svg>
    );
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
            onMouseLeave={() => {
              if (!isDragging) setExpanded(false);
            }}
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
