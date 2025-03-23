import "./style.css";
import { Component } from "solid-js";
import { GlazeWmOutput } from "zebar";
import { For } from "solid-js";
import Application from "./Application";

interface CurrentAppsProps {
  glazewm: GlazeWmOutput;
}

const CurrentApps: Component<CurrentAppsProps> = (props) => {
  const RenderChilds = (
    child: GlazeWmOutput["allWorkspaces"][0]["children"][0],
  ) => {
    if (child.type === "window") {
      return <Application window={child} glazewm={props.glazewm} />;
    } else if (child.type === "split") {
      return (
        <For each={child.children}>{(subChild) => RenderChilds(subChild)}</For>
      );
    }
    return undefined;
  };
  return (
    <div class="template">
      {props.glazewm?.allWorkspaces.map((workspace) => {
        if (workspace.isDisplayed) {
          return workspace.children.map((child) => {
            return RenderChilds(child);
          });
        } else {
          workspace.children.forEach((child) => {});
          return null;
        }
      })}
    </div>
  );
};

export default CurrentApps;
