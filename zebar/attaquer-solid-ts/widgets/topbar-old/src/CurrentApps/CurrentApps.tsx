import "./style.css";
import {
  Component,
  For,
  createSignal,
  createEffect,
  onCleanup,
} from "solid-js";
import { GlazeWmOutput } from "zebar";
import Application from "./Application";

interface CurrentAppsProps {
  glazewm: GlazeWmOutput;
}

const CurrentApps: Component<CurrentAppsProps> = (props) => {
  const seen = new Set<string | number>();

  const [currentWorkspace, setCurrentWorkspace] = createSignal<string | null>(
    null,
  );

  let animationTimer: number | undefined;

  const STAGGER_MS = 10;
  const BASE_ANIMATION_MS = 300;
  const EXTRA_MS = 50;

  type Child = GlazeWmOutput["allWorkspaces"][0]["children"][0];
  const flattenWorkspaceChildren = (
    workspace: NonNullable<GlazeWmOutput["allWorkspaces"]>[0],
  ) => {
    const result: Array<{ child: Child; handle: string }> = [];
    let fallbackCounter = 0;

    const walk = (node: Child) => {
      if (node.type === "window") {
        const handle =
          (node as any).handle ?? `${workspace.name}-${fallbackCounter++}`;
        result.push({ child: node, handle });
      } else if (node.type === "split") {
        for (const sub of node.children) walk(sub);
      }
    };

    for (const c of workspace.children) walk(c);
    return result;
  };

  createEffect(() => {
    const displayedWorkspace =
      props.glazewm?.allWorkspaces.find((w) => w.isDisplayed) ?? null;
    const displayed = displayedWorkspace?.name ?? null;

    if (displayed !== currentWorkspace()) {
      if (animationTimer !== undefined) {
        clearTimeout(animationTimer);
        animationTimer = undefined;
      }

      setCurrentWorkspace(displayed);
      seen.clear();

      if (displayedWorkspace) {
        const childLeaves = flattenWorkspaceChildren(displayedWorkspace);
        const childCount = Math.max(0, childLeaves.length);
        const maxStagger = Math.max(0, childCount - 1) * STAGGER_MS;
        const totalWait = BASE_ANIMATION_MS + maxStagger + EXTRA_MS;

        animationTimer = window.setTimeout(() => {
          childLeaves.forEach((entry) => {
            seen.add(entry.handle);
          });
          animationTimer = undefined;
        }, totalWait);
      }
    }
  });

  onCleanup(() => {
    if (animationTimer !== undefined) {
      clearTimeout(animationTimer);
      animationTimer = undefined;
    }
  });

  const RenderChilds = (child: Child) => {
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
      <For each={props.glazewm?.allWorkspaces ?? []}>
        {(workspace) => {
          if (!workspace.isDisplayed) return null;

          const flattened = flattenWorkspaceChildren(workspace);

          return (
            <For each={flattened}>
              {(entry, idx) => {
                const handle = entry.handle;
                const shouldAnimate = !seen.has(handle);

                if (shouldAnimate) seen.add(handle);

                return (
                  <div
                    classList={{ "app-entry": true, "slide-up": shouldAnimate }}
                    style={{ "animation-delay": `${idx() * STAGGER_MS}ms` }}
                    onanimationend={(e) =>
                      e.currentTarget.classList.remove("slide-up")
                    }
                    title={
                      (entry.child.type === "window" && entry.child.title) ?? ""
                    }
                  >
                    {RenderChilds(entry.child)}
                  </div>
                );
              }}
            </For>
          );
        }}
      </For>
    </div>
  );
};

export default CurrentApps;
