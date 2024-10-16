import "./style.css";
import { Component } from "solid-js";
import { MemoryOutput } from "zebar";
import { GlazeWmOutput } from "zebar";

interface MemoryStatusProps {
  memory: MemoryOutput;
  glazewm: GlazeWmOutput;
}

const MemoryStatus: Component<MemoryStatusProps> = (props) => {
  const getMemoryUsageRate = (usage: number) => {
    if (usage > 90) return "extreme-usage";
    else if (usage > 65) return "high-usage";
    else if (usage > 45) return "medium-usage";
    else return "low-usage";
  };
  return (
    <button
      classList={{
        memory: true,
        [getMemoryUsageRate(props.memory?.usage)]: true,
      }}
      onClick={() => {
        props.glazewm.runCommand(
          "shell-exec %ProgramFiles%/Mem Reduct/memreduct.exe"
        );
      }}
    >
      <span class="content">
        <span class="i"></span>
        <div class="labels">
          <span class="label total">
            <span>USED</span>
            {Math.round(props.memory?.usedMemory / 1024 / 1024 / 1024)}G
          </span>
          <span class="label total">
            <span>TOT</span>
            {Math.round(props.memory?.totalMemory / 1024 / 1024 / 1024)}G
          </span>
        </div>
        <span class="mem-bar">{Math.round(props.memory?.usage)}%</span>
      </span>
    </button>
  );
};

export default MemoryStatus;