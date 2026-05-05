import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WorkspaceProps {
  workspace: GlazeWmOutput["currentWorkspaces"][number];
  glazewm: GlazeWmOutput;
}

const Workspace: Component<WorkspaceProps> = (props) => {
  return (
    <button
      classList={{
        workspace: true,
        focused: props.workspace.hasFocus,
        displayed: props.workspace.isDisplayed,
      }}
      onClick={() =>
        props.glazewm.runCommand(`focus --workspace ${props.workspace.name}`)
      }
      id={props.workspace.name}
    >
      <span class="workspace-icon">
        {props.workspace.name === "web" ? (
          <img
            src="./assets/icons/icons8-brave-web-browser-32.png"
            alt="5"
            class="i-brave"
            height="16"
            width="16"
          ></img>
        ) : (
          (props.workspace.displayName ?? props.workspace.name)
        )}
      </span>
    </button>
  );
};

export default Workspace;
