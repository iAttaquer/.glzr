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

const CpuStatus: Component<CpuStatusProps> = (props) => {
  const getCpuUsageRate = (usage: number) => {
    if (usage > 90) return "extreme-usage";
    else if (usage > 65) return "high-usage";
    else if (usage > 30) return "medium-usage";
    else return "low-usage";
  };

  const { isActive, handleClick } = useAnimatedClick();

  const handleCpuClick = (e: MouseEvent) => {
    handleClick();
    // zebar.shellExec("taskmgr"); // open task manager
    zebar.shellExec("C:\\Program Files\\SystemInformer\\SystemInformer.exe");
    // old one:
    // props.glazewm.runCommand(
    //   "shell-exec %ProgramFiles%/SystemInformer/SystemInformer.exe",
    // );
  };

  return (
    <div
      classList={{
        cpu: true,
        [getCpuUsageRate(Math.round(props.cpu?.usage))]: true,
        "clicked-animated": isActive(),
      }}
      onClick={handleCpuClick}
    >
      <span class="content">
        <span class="i-cpu"></span>
        <span class="cpu-bar">{Math.round(props.cpu?.usage)}%</span>
      </span>
    </div>
  );
};

export default CpuStatus;
