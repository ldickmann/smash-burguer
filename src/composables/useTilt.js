// Tilt dos cards do cardápio (SPEC §7.3).
// Só registra listeners com mouse/trackpad e sem movimento reduzido.
import { onBeforeUnmount, onMounted, toValue } from "vue";

const clamp = (value) => Math.min(0.5, Math.max(-0.5, value));

export function useTilt(target, { max = 4 } = {}) {
  let frame = 0;
  let cleanup = () => {};

  onMounted(() => {
    const el = toValue(target);
    if (!el || typeof window.matchMedia !== "function") return;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    const setAngles = (x, y) => {
      el.style.setProperty("--rx", `${(-y * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 2 * max).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    };

    const handleMove = (event) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = clamp((event.clientX - rect.left) / rect.width - 0.5);
        const y = clamp((event.clientY - rect.top) / rect.height - 0.5);
        el.classList.remove("is-tilt-resetting");
        setAngles(x, y);
      });
    };

    // Volta ao repouso com transição lenta (--dur-slow, --ease-out)
    const handleLeave = () => {
      cancelAnimationFrame(frame);
      el.classList.add("is-tilt-resetting");
      setAngles(0, 0);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    el.dataset.tilt = "on";

    cleanup = () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      delete el.dataset.tilt;
    };
  });

  onBeforeUnmount(() => cleanup());
}
