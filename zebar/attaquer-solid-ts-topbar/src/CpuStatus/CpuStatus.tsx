import "./style.css";
import { Component } from "solid-js";
import { CpuOutput } from "zebar";
import { GlazeWmOutput } from "zebar";
import * as zebar from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface CpuStatusProps {
  cpu: CpuOutput;
  glazewm: GlazeWmOutput;
}

const RADIUS = 9;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CpuStatus: Component<CpuStatusProps> = (props) => {
  const getCpuUsageRate = (usage: number) => {
    if (usage > 90) return "extreme-usage";
    else if (usage > 65) return "high-usage";
    else if (usage > 26) return "medium-usage";
    else return "low-usage";
  };

  const circleOffset = () => {
    const usage = Math.min(100, Math.max(0, Math.round(props.cpu?.usage) || 0));
    return CIRCUMFERENCE * (1 - usage / 100);
  };

  const { isActive, handleClick } = useAnimatedClick();

  const handleCpuClick = (e: MouseEvent) => {
    handleClick();
    // zebar.shellExec("taskmgr"); // open task manager
    zebar.shellExec("C:\\Program Files\\SystemInformer\\SystemInformer.exe");
  };

  return (
    <button
      classList={{
        cpu: true,
        [getCpuUsageRate(Math.round(props.cpu?.usage))]: true,
        "clicked-animated": isActive(),
      }}
      onClick={handleCpuClick}
    >
      <span class="content">
        <span class="cpu-label">CPU</span>
        <svg class="cpu-ring" width="22" height="22" viewBox="0 0 22 22">
          <circle class="cpu-ring-track" cx="11" cy="11" r={RADIUS} />
          <circle
            class="cpu-ring-progress"
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
            class="cpu-ring-text"
            x="11"
            y="11"
            text-anchor="middle"
            dominant-baseline="central"
          >
            {Math.round(props.cpu?.usage)}
          </text>
        </svg>
      </span>
    </button>
  );
};

export default CpuStatus;
