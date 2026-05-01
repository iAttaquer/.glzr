import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WorkspaceProps {
  workspace: GlazeWmOutput["currentWorkspaces"][number];
  glazewm: GlazeWmOutput;
  ref?: (el: HTMLButtonElement) => void;
}

const Workspace: Component<WorkspaceProps> = (props) => {
  return (
    <button
      ref={props.ref}
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
        {props.workspace.displayName ?? props.workspace.name}
      </span>
    </button>
  );
};

export default Workspace;
