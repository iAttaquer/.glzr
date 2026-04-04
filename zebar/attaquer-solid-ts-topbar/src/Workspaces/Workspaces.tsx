import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";
import Workspace from "./Workspace";

interface WorkspacesProps {
  glazewm: GlazeWmOutput;
}

const Workspaces: Component<WorkspacesProps> = (props) => {
  const buttonRefs: Record<string, HTMLButtonElement> = {};

  const focusedName = () =>
    props.glazewm?.currentWorkspaces.find((w) => w.hasFocus)?.name;

  const pillStyle = () => {
    const name = focusedName();
    if (!name || !buttonRefs[name]) return { display: "none" };
    const btn = buttonRefs[name];
    return {
      transform: `translateX(${btn.offsetLeft}px)`,
      width: `${btn.offsetWidth}px`,
    };
  };

  return (
    <div class="workspaces">
      <div class="workspace-pill" style={pillStyle()} />
      {props.glazewm?.currentWorkspaces.map((workspace) => (
        <Workspace
          workspace={workspace}
          glazewm={props.glazewm}
          ref={(el) => (buttonRefs[workspace.name] = el)}
        />
      ))}
    </div>
  );
};

export default Workspaces;