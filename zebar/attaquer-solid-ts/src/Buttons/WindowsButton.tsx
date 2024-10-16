import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WindowsButtonProps {
  glazewm: GlazeWmOutput;
}

const WindowsButton: Component<WindowsButtonProps> = (props) => {
  return (
    <button
      class="logo"
      onClick={() => {
        props.glazewm.runCommand(
          "shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/assets/scripts/OpenStartMenu.vbs"
        );
      }}
    >
      <span class="content"></span>
    </button>
  );
};

export default WindowsButton;
