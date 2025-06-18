import "./style.css";
import { Component, For } from "solid-js";
import { SystrayOutput, GlazeWmOutput } from "zebar";

interface SystrayProps {
  systray: SystrayOutput;
  glazewm: GlazeWmOutput;
}

const Systray: Component<SystrayProps> = (props) => {
  console.log(props.systray);
  return (
    <>
      {props.systray?.icons && (
        <div class="systray">
          <For each={props.systray?.icons}>
            {(icon) => (
              <div
                class="systray-icon-container"
                title={icon.tooltip}
                onClick={(e) => {
                  e.preventDefault();
                  props.systray.onLeftClick(icon.id);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  props.systray.onRightClick(icon.id);
                }}
              >
                <img class="systray-icon" src={icon.iconUrl} />
              </div>
            )}
          </For>
        </div>
      )}
    </>
  );
};

export default Systray;
