import "./style.css";
import {
  Component,
  For,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WorkspacesProps {
  glazewm: GlazeWmOutput;
}

const BTN_W = 1.425; // rem
const GAP = 0.125; // rem
const PAD = 0.1; // rem

const EASE_STD = "cubic-bezier(0.4, 0, 0.2, 1)";

const Workspaces: Component<WorkspacesProps> = (props) => {
  // DOM refs — used for FLIP position capture and pill placement.
  const buttonRefs: Record<string, HTMLButtonElement> = {};
  const [names, setNames] = createSignal<string[]>([], {
    equals: (a, b) => a.length === b.length && a.every((n, i) => n === b[i]),
  });

  const pendingEntrance = new Set<string>();

  let prevNamesRef: string[] = [];

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

  const groupBgStyle = () => {
    const n = names().length;
    if (n === 0) return { display: "none" };
    const width = n * BTN_W + (n - 1) * GAP + 2 * PAD;
    return { width: `${width}rem` };
  };

  createEffect(() => {
    const current = props.glazewm?.currentWorkspaces ?? [];
    const currentNames = current.map((w) => w.name);
    const prevNames = prevNamesRef;

    const savedLeft = new Map<string, number>();
    if (prevNames.length > 0) {
      for (const name of prevNames) {
        const el = buttonRefs[name];
        if (el) savedLeft.set(name, el.offsetLeft);
      }
    }

    if (prevNames.length > 0) {
      for (const name of currentNames) {
        if (!prevNames.includes(name)) {
          pendingEntrance.add(name);
        }
      }
    }

    prevNamesRef = currentNames;
    setNames(currentNames);

    if (savedLeft.size > 0) {
      queueMicrotask(() => {
        for (const name of currentNames) {
          const el = buttonRefs[name];
          if (!el) continue;

          const oldLeft = savedLeft.get(name);
          if (oldLeft === undefined) continue; // new workspace — CSS handles it

          const delta = oldLeft - el.offsetLeft;
          if (Math.abs(delta) < 0.5) continue; // didn't shift, skip

          el.animate(
            [
              { transform: `translateX(${delta}px)` },
              { transform: "translateX(0)" },
            ],
            { duration: 300, easing: EASE_STD },
          );
        }
      });
    }
  });

  return (
    <div class="workspaces">
      <div class="workspace-group-bg" style={groupBgStyle()} />
      <div class="workspace-pill" style={pillStyle()} />

      <For each={names()}>
        {(name) => {
          const isNew = pendingEntrance.has(name);
          if (isNew) pendingEntrance.delete(name);

          const [entering, setEntering] = createSignal(isNew);

          const workspace = createMemo(() =>
            props.glazewm?.currentWorkspaces.find((w) => w.name === name),
          );

          return (
            <button
              ref={(el) => (buttonRefs[name] = el)}
              classList={{
                workspace: true,
                focused: workspace()?.hasFocus ?? false,
                displayed: workspace()?.isDisplayed ?? false,
                "ws-enter": entering(),
              }}
              onAnimationEnd={(e) => {
                if (e.animationName === "ws-slide-up") setEntering(false);
              }}
              onClick={() =>
                props.glazewm.runCommand(`focus --workspace ${name}`)
              }
              id={name}
            >
              <span class="workspace-icon">
                {workspace()?.displayName ?? name}
              </span>
            </button>
          );
        }}
      </For>
    </div>
  );
};

export default Workspaces;
