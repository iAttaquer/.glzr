import "./style.css";
import { Component } from "solid-js";
import { MemoryOutput } from "zebar";
import * as zebar from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface MemoryStatusProps {
  memory: MemoryOutput;
}

const MemoryStatus: Component<MemoryStatusProps> = (props) => {
  const getMemoryUsageRate = (usage: number) => {
    if (usage > 90) return "extreme-usage";
    else if (usage > 65) return "high-usage";
    else if (usage > 45) return "medium-usage";
    else return "low-usage";
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
