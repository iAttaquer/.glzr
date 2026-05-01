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

  const parts = () => props.date?.formatted?.split(" ") ?? [];
  const time = () => parts()[0] ?? "00:00";
  const date = () => parts()[2] && parts()[3] ? `${parts()[2]} ${parts()[3].substring(0, 3)}` : "";

  return (
    <button
      class={`date ${isActive() ? "clicked-animated" : ""}`}
      title={props.date?.formatted}
      onClick={handleTimeClick}
    >
      <span class="content">
        <span class="time-icon">󰥔</span>
        <span class="time-block">
          <span class="time-value">{time()}</span>
          <span class="time-date">{date()}</span>
        </span>
      </span>
    </button>
  );
};

export default TimeStatus;
