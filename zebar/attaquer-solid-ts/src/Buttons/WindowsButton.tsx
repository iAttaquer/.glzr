import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface WindowsButtonProps {
  glazewm: GlazeWmOutput;
}

const WindowsButton: Component<WindowsButtonProps> = (props) => {
  const { isActive, handleClick } = useAnimatedClick();

  const handleWindowsClick = () => {
    handleClick();
    props.glazewm.runCommand(
      "shell-exec %userprofile%/.glzr/zebar/attaquer-solid-ts/dist/assets/scripts/OpenStartMenu.vbs",
    );
  };
  return (
    <button
      class={`logo ${isActive() ? "clicked-animated" : ""}`}
      onClick={handleWindowsClick}
    >
      <span class="content"></span>
    </button>
  );
};

export default WindowsButton;
