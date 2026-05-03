import "./style.css";
import { Component, For, createEffect, createSignal } from "solid-js";
import { GlazeWmOutput } from "zebar";

interface TilingBindingProps {
  glazewm: GlazeWmOutput | null;
}

const exitCommand: Record<string, string> = {
  resize: "wm-disable-binding-mode --name resize",
  pause: "wm-disable-binding-mode --name pause",
};

const EASE_STD = "cubic-bezier(0.4, 0, 0.2, 1)";

const TilingBinding: Component<TilingBindingProps> = (props) => {
  const buttonRefs: Record<string, HTMLButtonElement> = {};
  const pendingEntrance = new Set<string>();
  const [visibleModes, setVisibleModes] = createSignal<string[]>([]);
  let prevModes: string[] = [];

  createEffect(() => {
    const current = (props.glazewm?.bindingModes ?? []).map((m) => m.name);
    const prev = prevModes;

    const added = current.filter((n) => !prev.includes(n));
    const removed = prev.filter((n) => !current.includes(n));

    prevModes = current;

    for (const n of added) pendingEntrance.add(n);

    if (removed.length > 0) {
      setVisibleModes([...current, ...removed]);

      queueMicrotask(() => {
        for (const name of removed) {
          const el = buttonRefs[name];
          if (!el) continue;
          const w = el.offsetWidth;
          const anim = el.animate(
            [
              {
                transform: "translateY(0)",
                opacity: "1",
                width: `${w}px`,
                paddingLeft: "0.35rem",
                paddingRight: "0.35rem",
              },
              {
                transform: "translateY(150%)",
                opacity: "0",
                width: "0px",
                paddingLeft: "0",
                paddingRight: "0",
              },
            ],
            { duration: 300, easing: EASE_STD, fill: "forwards" },
          );
          anim.onfinish = () => {
            setVisibleModes((v) => v.filter((n) => n !== name));
          };
        }
      });
    } else {
      setVisibleModes(current);
    }
  });

  return (
    <>
      <div class="template">
        <button
          class={`toggle-tiling-direction
                    ${props.glazewm?.tilingDirection === "horizontal" ? "horizontal" : "vertical"}`}
          onClick={() => {
            props.glazewm?.runCommand("toggle-tiling-direction");
          }}
        >
          <span class="tiling-direction"></span>
        </button>
      </div>
      <div class="template">
        <For each={visibleModes()}>
          {(name) => {
            const isNew = pendingEntrance.has(name);
            if (isNew) pendingEntrance.delete(name);

            const [entering, setEntering] = createSignal(isNew);
            const cmd = exitCommand[name] ?? `binding-mode ${name}`;

            return (
              <button
                ref={(el) => (buttonRefs[name] = el)}
                classList={{
                  "binding-mode": true,
                  "bm-enter": entering(),
                }}
                onAnimationEnd={(e) => {
                  if (e.animationName === "bm-slide-up") setEntering(false);
                }}
                onClick={() => props.glazewm?.runCommand(cmd)}
                title={`Exit ${name}`}
              >
                <span class="binding-mode-name">{name}</span>
                <span class="binding-mode-exit">×</span>
              </button>
            );
          }}
        </For>
      </div>
    </>
  );
};

export default TilingBinding;
