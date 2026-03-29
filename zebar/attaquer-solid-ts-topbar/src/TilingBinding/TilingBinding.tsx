import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface TilingBindingProps {
  glazewm: GlazeWmOutput;
}

const exitCommand: Record<string, string> = {
  resize: "wm-disable-binding-mode --name resize",
  pause: "wm-disable-binding-mode --name pause",
};

const TilingBinding: Component<TilingBindingProps> = (props) => {
  return (
    <>
      <div class="template">
        <button
          class={`toggle-tiling-direction
                    ${props.glazewm?.tilingDirection === "horizontal" ? "horizontal" : "vertical"}`}
          onClick={() => {
            props.glazewm?.runCommand("toggle-tiling-direction");
          }}
        >
          <span class="tiling-direction"></span>
        </button>
      </div>
      <div class="template">
        {props.glazewm?.bindingModes.map((bindingMode) => {
          const name = bindingMode.name;
          const cmd = exitCommand[name] ?? `binding-mode ${name}`;
          return (
            <button
              class="binding-mode"
              onClick={() => props.glazewm?.runCommand(cmd)}
              title={`Exit ${name}`}
            >
              <span class="binding-mode-name">{name}</span>
              <span class="binding-mode-exit">×</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

export default TilingBinding;
