import { createSignal, onCleanup } from "solid-js";

export function useAnimatedClick(animationDuration: number = 200) {
  const [isActive, setIsActive] = createSignal(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const handleClick = () => {
    setIsActive(true);
    timeoutId = setTimeout(() => {
      setIsActive(false);
    }, animationDuration);
  };

  onCleanup(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return { isActive, handleClick };
}
