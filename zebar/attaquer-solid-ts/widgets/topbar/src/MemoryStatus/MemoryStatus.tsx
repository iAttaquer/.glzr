import "./style.css";
import { Component } from "solid-js";
import { MemoryOutput } from "zebar";
import * as zebar from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface MemoryStatusProps {
  memory: MemoryOutput;
}

const RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const MemoryStatus: Component<MemoryStatusProps> = (props) => {
  const getMemoryUsageRate = (usage: number) => {
    if (usage > 90) return "extreme-usage";
    else if (usage > 65) return "high-usage";
    else if (usage > 49) return "medium-usage";
    else return "low-usage";
  };

  const circleOffset = () => {
    const usage = Math.min(
      100,
      Math.max(0, Math.round(props.memory?.usage) || 0),
    );
    return CIRCUMFERENCE * (1 - usage / 100);
  };

  const { isActive, handleClick } = useAnimatedClick();

  const handleMemoryClick = (e: MouseEvent) => {
    handleClick();
    zebar.shellExec("C:\\Program Files\\Mem Reduct\\memreduct.exe");
  };

  return (
    <button
      classList={{
        memory: true,
        [getMemoryUsageRate(props.memory?.usage)]: true,
        "clicked-animated": isActive(),
      }}
      onClick={handleMemoryClick}
    >
      <span class="content">
        <span class="mem-label">RAM</span>
        <svg class="mem-ring" width="22" height="22" viewBox="0 0 22 22">
          <circle class="mem-ring-track" cx="11" cy="11" r={RADIUS} />
          <circle
            class="mem-ring-progress"
            cx="11"
            cy="11"
            r={RADIUS}
            transform="rotate(-90 11 11)"
            style={{
              "stroke-dasharray": `${CIRCUMFERENCE}`,
              "stroke-dashoffset": `${circleOffset()}`,
            }}
          />
          <text
            class="mem-ring-text"
            x="11"
            y="11"
            text-anchor="middle"
            dominant-baseline="central"
          >
            {Math.round(props.memory?.usage)}
          </text>
        </svg>
      </span>
    </button>
  );
};

export default MemoryStatus;
