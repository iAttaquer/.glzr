import "./style.css";
import { Component } from "solid-js";
import { CpuOutput } from "zebar";
import { GlazeWmOutput } from "zebar";

interface CpuStatusProps {
  cpu: CpuOutput;
  glazewm: GlazeWmOutput;
}

const CpuStatus: Component<CpuStatusProps> = (props) => {
  const getCpuUsageRate = (usage: number) => {
    if (usage > 90) return "extreme-usage";
    else if (usage > 65) return "high-usage";
    else if (usage > 30) return "medium-usage";
    else return "low-usage";
  };
  return (
    <button
      classList={{
        cpu: true,
        [getCpuUsageRate(Math.round(props.cpu?.usage))]: true,
      }}
      onClick={() => {
        props.glazewm.runCommand(
          "shell-exec %ProgramFiles%/SystemInformer/SystemInformer.exe"
        );
      }}
    >
      <span class="content">
        <span class="i-cpu"></span>
        <span class="cpu-bar">{Math.round(props.cpu?.usage)}%</span>
      </span>
    </button>
  );
};

export default CpuStatus;
