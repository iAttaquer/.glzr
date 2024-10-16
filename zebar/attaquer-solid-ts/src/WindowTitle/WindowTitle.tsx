import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WindowTitleProps {
  glazewm: GlazeWmOutput;
}

const WindowTitle: Component<WindowTitleProps> = (props) => {
  return (
    <>
      {props.glazewm?.focusedWorkspace.children.map(
        (window) =>
          window.hasFocus && (
            <div class="current-window">
              {window.title &&
                (window.title?.length > 90
                  ? window.title.slice(0, 90) + "..."
                  : window.title)}
            </div>
          )
      )}
    </>
  );
};

export default WindowTitle;
