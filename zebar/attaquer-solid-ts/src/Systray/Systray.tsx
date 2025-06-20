import "./style.css";
import { Component, For, createSignal } from "solid-js";
import { SystrayOutput, GlazeWmOutput } from "zebar";

interface SystrayProps {
  systray: SystrayOutput;
  glazewm: GlazeWmOutput;
}

const Systray: Component<SystrayProps> = (props) => {
  const [expanded, setExpanded] = createSignal(true);
  const [activeIconId, setActiveIconId] = createSignal<string | null>(null);

  return (
    <>
      <div class="systray-container">
        {props.systray?.icons && (
          <div class={`systray ${expanded() ? "expanded" : ""}`}>
            <For each={props.systray?.icons}>
              {(icon) => (
                <div
                  class="systray-icon-container"
                  title={icon.tooltip}
                  onClick={(e) => {
                    e.preventDefault();
                    props.systray.onLeftClick(icon.id);

                    setActiveIconId(icon.id);
                    setTimeout(() => {
                      setActiveIconId(null);
                    }, 200);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    props.systray.onRightClick(icon.id);
                    setActiveIconId(icon.id);
                    setTimeout(() => {
                      setActiveIconId(null);
                    }, 200);
                  }}
                >
                  <img
                    class={`systray-icon ${activeIconId() === icon.id ? "clicked-animated" : ""}`}
                    src={icon.iconUrl}
                  />
                </div>
              )}
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
