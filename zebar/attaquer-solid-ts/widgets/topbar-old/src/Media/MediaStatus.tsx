import "./style.css";
import { Component, createSignal, onCleanup } from "solid-js";
import { MediaOutput } from "zebar";

interface MediaStatusProps {
  media: MediaOutput;
}

const MediaStatus: Component<MediaStatusProps> = (props) => {
  let mediaTextRef: HTMLDivElement | undefined;
  let animationFrameId: number | undefined;
  let startTimeoutId: number | undefined;

  const [scrollPosition, setScrollPosition] = createSignal(0);
  const [isHovering, setIsHovering] = createSignal(false);
  const [animationPhase, setAnimationPhase] = createSignal<{
    direction: "forward" | "backward";
    isPaused: boolean;
    startTime: number;
  }>({ direction: "forward", isPaused: false, startTime: 0 });
  const [scrollDistance, setScrollDistance] = createSignal(0);

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

  const startScrolling = () => {
    if (!mediaTextRef) return;

    const textWidth = mediaTextRef.scrollWidth;
    const containerWidth = mediaTextRef.clientWidth;
    const distance = textWidth - containerWidth;

    if (distance <= 0) {
      setScrollPosition(0);
      return;
    }

    setScrollDistance(distance);
    setAnimationPhase({ direction: "forward", isPaused: false, startTime: 0 });

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    animationFrameId = requestAnimationFrame(animate);
  };

  const animate = (currentTime: number) => {
    if (!isHovering()) {
      resetAnimation();
      return;
    }

    const phase = animationPhase();
    const pixelsPerSecond = 45;
    const scrollDuration = (scrollDistance() / pixelsPerSecond) * 1000;
    const pauseDuration = 1300;

    if (phase.startTime === 0) {
      setAnimationPhase({ ...phase, startTime: currentTime });
      animationFrameId = requestAnimationFrame(animate);
      return;
    }

    const elapsed = currentTime - phase.startTime;

    if (phase.isPaused) {
      if (elapsed >= pauseDuration) {
        const newDirection =
          phase.direction === "forward" ? "backward" : "forward";
        setAnimationPhase({
          direction: newDirection,
          isPaused: false,
          startTime: currentTime,
        });
      }
    } else {
      const progress = Math.min(elapsed / scrollDuration, 1);

      if (phase.direction === "forward") {
        setScrollPosition(-scrollDistance() * progress);
      } else {
        setScrollPosition(-scrollDistance() * (1 - progress));
      }

      if (progress >= 1) {
        setAnimationPhase({ ...phase, isPaused: true, startTime: currentTime });
      }
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  const resetAnimation = () => {
    setScrollPosition(0);
    setAnimationPhase({ direction: "forward", isPaused: false, startTime: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (startTimeoutId) {
      clearTimeout(startTimeoutId);
    }
    startTimeoutId = window.setTimeout(startScrolling, 400);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = undefined;
    }
    if (startTimeoutId) {
      clearTimeout(startTimeoutId);
      startTimeoutId = undefined;
    }
    resetAnimation();
  };

  onCleanup(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    if (startTimeoutId) {
      clearTimeout(startTimeoutId);
    }
  });

  return (
    <>
      {props.media?.currentSession && (
        <div
          class={`template media`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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
            <span
              ref={mediaTextRef}
              style={{ transform: `translateX(${scrollPosition()}px)` }}
            >
              {props.media?.currentSession?.title} |&#x20;
              {props.media?.currentSession?.artist}
            </span>
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
