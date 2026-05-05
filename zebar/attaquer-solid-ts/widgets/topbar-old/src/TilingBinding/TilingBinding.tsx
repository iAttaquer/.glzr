import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface TilingBindingProps {
  glazewm: GlazeWmOutput;
}

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
        {props.glazewm?.bindingModes.map((bindingMode) => (
          <span class="binding-mode">
            {bindingMode.displayName ?? bindingMode.name}
          </span>
        ))}
      </div>
    </>
  );
};

export default TilingBinding;
