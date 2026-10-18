// Avisos temporários (toasts). O contêiner é o AppToast, renderizado uma vez no App.vue.
import { defineStore } from "pinia";

const MAX_TOASTS = 3;
let nextId = 1;
// Timers ficam fora do estado reativo
const timers = new Map();

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [],
  }),

  actions: {
    /**
     * Mostra um aviso.
     * @param {{ message: string, variant?: 'success'|'error'|'info',
     *   action?: { label: string, onClick: Function }, duration?: number }} options
     * @returns {number} id do aviso
     */
    show({ message, variant = "success", action = null, duration = 4000 }) {
      const id = nextId++;
      this.toasts.push({ id, message, variant, action, duration });

      // No máximo 3 ao mesmo tempo: sai o mais antigo
      while (this.toasts.length > MAX_TOASTS) {
        this.dismiss(this.toasts[0].id);
      }

      timers.set(id, { remaining: duration, startedAt: Date.now(), handle: null });
      this.resume(id);
      return id;
    },

    dismiss(id) {
      const timer = timers.get(id);
      if (timer?.handle) clearTimeout(timer.handle);
      timers.delete(id);
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },

    // Pausa no hover e no foco
    pause(id) {
      const timer = timers.get(id);
      if (!timer?.handle) return;
      clearTimeout(timer.handle);
      timer.handle = null;
      timer.remaining -= Date.now() - timer.startedAt;
    },

    resume(id) {
      const timer = timers.get(id);
      if (!timer || timer.handle) return;
      timer.startedAt = Date.now();
      timer.handle = setTimeout(() => this.dismiss(id), Math.max(0, timer.remaining));
    },

    runAction(id) {
      const toast = this.toasts.find((item) => item.id === id);
      toast?.action?.onClick?.();
      this.dismiss(id);
    },
  },
});
