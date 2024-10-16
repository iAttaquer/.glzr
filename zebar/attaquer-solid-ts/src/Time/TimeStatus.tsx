import "./style.css";
import { Component } from "solid-js";
import { DateOutput } from "zebar";
import { GlazeWmOutput } from "zebar";

interface TimeStatusProps {
    date: DateOutput;
    glazewm: GlazeWmOutput;
}

const TimeStatus: Component<TimeStatusProps> = (props) => {
    return (
        <button class="date"
        onClick={() => {
            props.glazewm?.runCommand(
                "shell-exec explorer.exe ms-actioncenter://"
            );
        }}>
            <span class="content">
                <img src="./assets/icons/icons8-time-32.png"></img>
                <span class="time">{ props.date?.formatted }</span>
            </span>
        </button>
    );
};

export default TimeStatus;