import "./style.css";
import { Component } from "solid-js";
import { DateOutput } from "zebar";
import * as zebar from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface TimeStatusProps {
  date: DateOutput;
}

const TimeStatus: Component<TimeStatusProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleTimeClick = () => {
    handleClick();
    zebar.shellExec("explorer.exe", "ms-actioncenter://");
  };

  return (
    <button
      class={`date ${isActive() ? "clicked-animated" : ""}`}
      title={props.date?.formatted}
      onClick={handleTimeClick}
    >
      <span class="content">
        <img src="./assets/icons/icons8-time-32.png"></img>
        <span class="time">{props.date?.formatted.substring(0, 5)}</span>
      </span>
    </button>
  );
};

export default TimeStatus;
