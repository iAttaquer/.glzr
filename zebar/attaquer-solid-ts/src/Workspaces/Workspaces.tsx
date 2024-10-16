import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";
import Workspace from "./Workspace";

interface WorkspacesProps {
  glazewm: GlazeWmOutput; // Typ props
}

const Workspaces: Component<WorkspacesProps> = (props) => {
  return (
    <div class="workspaces">
      {props.glazewm?.currentWorkspaces.map((workspace) => (
        <Workspace workspace={workspace} glazewm={props.glazewm} />
      ))}
    </div>
  );
};

export default Workspaces;