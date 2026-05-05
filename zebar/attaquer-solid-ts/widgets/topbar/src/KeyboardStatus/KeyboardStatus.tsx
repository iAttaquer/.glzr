import "./style.css";
import { Component } from "solid-js";
import { KeyboardOutput } from "zebar";

interface KeyboardStatusProps {
  keyboard: KeyboardOutput;
}

const KeyboardStatus: Component<KeyboardStatusProps> = (props) => {
  const langCode = () => {
    const layout = props.keyboard?.layout ?? "";
    return layout.split("-")[0].toUpperCase() || "??";
  };

  return (
    <button class="keyboard-status" title={props.keyboard?.layout}>
      <span class="content">
        <i class="nf nf-fa-keyboard"></i>
        <span class="keyboard-lang">{langCode()}</span>
      </span>
    </button>
  );
};

export default KeyboardStatus;
