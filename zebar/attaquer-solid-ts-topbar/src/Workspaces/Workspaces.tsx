import "./style.css";
import {
  Component,
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  untrack,
} from "solid-js";
import { GlazeWmOutput } from "zebar";

interface WorkspacesProps {
  glazewm: GlazeWmOutput;
}

const BTN_W = 1.425; // rem
const GAP = 0.125; // rem
const PAD = 0.1; // rem

const EASE_STD = "cubic-bezier(0.4, 0, 0.2, 1)";

const MAX_WORKSPACES = 10;

const Workspaces: Component<WorkspacesProps> = (props) => {
  // DOM refs — used for FLIP position capture and pill placement.
  const buttonRefs: Record<string, HTMLButtonElement> = {};

  let addButtonRef: HTMLButtonElement | undefined;
  let prevAddVisibleRef = false;
  const [addEntering, setAddEntering] = createSignal(false);

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

  const nextAvailableWorkspace = createMemo(() => {
    const active = new Set(
      (props.glazewm?.allWorkspaces ?? []).map((w) => w.name),
    );
    for (let i = 1; i <= MAX_WORKSPACES; i++) {
      if (!active.has(String(i))) return String(i);
    }
    return null;
  });

  const containerDimensions = createMemo(() => {
    let n = names().length;
    if (nextAvailableWorkspace() !== null) n += 1;
    if (n === 0) return { container: {} as Record<string, string>, groupBg: { display: "none" } as Record<string, string> };
    const width = `${n * BTN_W + (n - 1) * GAP + 2 * PAD}rem`;
    return { container: { width }, groupBg: { width } };
  });

  createEffect(() => {
    const current = props.glazewm?.currentWorkspaces ?? [];
    const currentNames = current.map((w) => w.name);
    const prevNames = prevNamesRef;
    const isInitialLoad = prevNames.length === 0;

    const savedLeft = new Map<string, number>();
    if (prevNames.length > 0) {
      for (const name of prevNames) {
        const el = buttonRefs[name];
        if (el) savedLeft.set(name, el.offsetLeft);
      }
    }

    const savedAddLeft = addButtonRef?.offsetLeft;
    const wasAddVisible = prevAddVisibleRef;

    if (prevNames.length > 0) {
      for (const name of currentNames) {
        if (!prevNames.includes(name)) {
          pendingEntrance.add(name);
        }
      }
    }

    prevNamesRef = currentNames;
    setNames(currentNames);
    prevAddVisibleRef = untrack(() => nextAvailableWorkspace() !== null);

    const shouldAnimate =
      savedLeft.size > 0 ||
      savedAddLeft !== undefined ||
      (!isInitialLoad && !wasAddVisible && prevAddVisibleRef);

    if (shouldAnimate) {
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

        if (addButtonRef && savedAddLeft !== undefined) {
          const delta = savedAddLeft - addButtonRef.offsetLeft;
          if (Math.abs(delta) >= 0.5) {
            addButtonRef.animate(
              [
                { transform: `translateX(${delta}px)` },
                { transform: "translateX(0)" },
              ],
              { duration: 300, easing: EASE_STD },
            );
          }
        }

        if (!isInitialLoad && !wasAddVisible && addButtonRef) {
          setAddEntering(true);
        }
      });
    }
  });

  return (
    <div class="workspaces" style={containerDimensions().container}>
      <div class="workspace-group-bg" style={containerDimensions().groupBg} />
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

      <Show when={nextAvailableWorkspace() !== null}>
        <button
          ref={(el) => (addButtonRef = el)}
          classList={{
            "workspace-add": true,
            "ws-enter": addEntering(),
          }}
          onAnimationEnd={(e) => {
            if (e.animationName === "ws-slide-up") setAddEntering(false);
          }}
          onClick={() => {
            const next = nextAvailableWorkspace();
            if (next) props.glazewm.runCommand(`focus --workspace ${next}`);
          }}
        >
          <span class="workspace-add-icon">+</span>
        </button>
      </Show>
    </div>
  );
};

export default Workspaces;
