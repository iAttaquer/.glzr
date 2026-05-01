import "./style.css";
import { Component, For, createSignal } from "solid-js";
import { SystrayOutput, GlazeWmOutput } from "zebar";
import { useAnimatedClick } from "../hooks/useAnimatedClick";

interface SystrayProps {
  systray: SystrayOutput;
  glazewm: GlazeWmOutput;
}

const Systray: Component<SystrayProps> = (props) => {
  const [expanded, setExpanded] = createSignal(true);

  return (
    <>
      <div class="systray-container">
        {props.systray?.icons && (
          <div class={`systray ${expanded() ? "expanded" : ""}`}>
            <For each={props.systray?.icons}>
              {(icon) => {
                const { isActive: isIconActive, handleClick: handleIconClick } =
                  useAnimatedClick();
                return (
                  <div
                    class="systray-icon-container"
                    title={icon.tooltip}
                    onClick={(e) => {
                      e.preventDefault();
                      handleIconClick();
                      props.systray.onLeftClick(icon.id);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      handleIconClick();
                      props.systray.onRightClick(icon.id);
                    }}
                  >
                    <img
                      class={`systray-icon ${isIconActive() ? "clicked-animated" : ""}`}
                      src={icon.iconUrl}
                    />
                  </div>
                );
              }}
            </For>
          </div>
        )}
        <button
          class={`systray-toggle ${expanded() == true ? "expanded" : "tucked"}`}
          onClick={() => setExpanded(!expanded())}
        >
          <span class="content"></span>
        </button>
      </div>
    </>
  );
};

export default Systray;
