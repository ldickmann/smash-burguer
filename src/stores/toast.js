// Avisos temporários (toasts). O contêiner é o AppToast, renderizado uma vez no App.vue.
// Estado de interface, não persistido (desenho dos componentes base, §4.3 e §5.1).
import { defineStore } from "pinia";

const MAX_TOASTS = 3;
// O Long do Compose: os avisos com ação anteriores saem 10 s depois de um aviso novo com ação
const DURACAO_LONGA = 10000;
let nextId = 1;
// Timers ficam fora do estado reativo
const timers = new Map();
// Avisos com o ponteiro ou o foco dentro: o tempo não volta a correr sem a pessoa sair deles, nem
// quando um diálogo fecha
const interagindo = new Set();

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [],
    // Diálogos modais abertos (o BaseDialog chama segurar() e soltar()): com algum aberto, nenhum
    // tempo corre e os avisos novos esperam fora da tela, porque a página atrás do diálogo é inerte
    dialogosAbertos: 0,
  }),

  actions: {
    /**
     * Mostra um aviso. Sem `action`, fora do erro e com `duration` positiva, ele some sozinho; com
     * `action` ou `variant: 'error'`, não expira; `duration: 0` também não expira. Quando chega outro
     * aviso com `action`, os anteriores com `action` saem em 10 s. Com um diálogo aberto
     * (`dialogosAbertos > 0`), o aviso novo espera fora da tela e nenhum tempo corre.
     * @param {{ message: string, variant?: 'success'|'error'|'info',
     *   action?: { label: string, icon?: string|string[], onClick: Function },
     *   duration?: number }} options
     * @returns {number} id do aviso
     */
    show({ message, variant = "success", action = null, duration = 4000 }) {
      const id = nextId++;
      const expira = !action && variant !== "error" && duration > 0;

      // Uma ação nova conta como "outra ação": os anteriores com ação, ainda sem prazo, ganham 10 s
      if (action) {
        for (const antigo of this.toasts) {
          if (antigo.action && !timers.has(antigo.id)) {
            timers.set(antigo.id, { remaining: DURACAO_LONGA, startedAt: Date.now(), handle: null });
            this.armar(antigo.id);
          }
        }
      }

      this.toasts.push({ id, message, variant, action, retido: this.dialogosAbertos > 0 });

      // No máximo 3 ao mesmo tempo: sai o mais antigo
      while (this.toasts.length > MAX_TOASTS) {
        this.dismiss(this.toasts[0].id);
      }

      if (expira) {
        timers.set(id, { remaining: duration, startedAt: Date.now(), handle: null });
        this.armar(id);
      }
      return id;
    },

    dismiss(id) {
      const timer = timers.get(id);
      if (timer?.handle) clearTimeout(timer.handle);
      timers.delete(id);
      interagindo.delete(id);
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },

    // Os que não expiram (sem timer): saem na troca de rota
    dismissPersistentes() {
      for (const toast of [...this.toasts]) {
        if (!timers.has(toast.id)) this.dismiss(toast.id);
      }
    },

    // Pausa no hover e no foco (o AppToast chama): o aviso fica marcado até o resume()
    pause(id) {
      interagindo.add(id);
      this.parar(id);
    },

    // O ponteiro ou o foco saiu do aviso: o tempo volta a correr (se não houver diálogo aberto)
    resume(id) {
      interagindo.delete(id);
      this.armar(id);
    },

    // Para o tempo, guardando o que falta
    parar(id) {
      const timer = timers.get(id);
      if (!timer?.handle) return;
      clearTimeout(timer.handle);
      timer.handle = null;
      timer.remaining -= Date.now() - timer.startedAt;
    },

    // Arma o tempo que falta, a não ser com um diálogo aberto ou com a pessoa dentro do aviso
    armar(id) {
      if (this.dialogosAbertos > 0 || interagindo.has(id)) return;
      const timer = timers.get(id);
      if (!timer || timer.handle) return;
      timer.startedAt = Date.now();
      timer.handle = setTimeout(() => this.dismiss(id), Math.max(0, timer.remaining));
    },

    // O BaseDialog chama ao abrir: o primeiro diálogo pausa o tempo dos avisos na tela
    segurar() {
      if (this.dialogosAbertos === 0) {
        for (const toast of this.toasts) this.parar(toast.id);
      }
      this.dialogosAbertos += 1;
    },

    // O BaseDialog chama ao fechar e ao desmontar aberto; não desce de 0. Com o último diálogo
    // fechado, os retidos entram na tela (e nas listas vivas) e o tempo volta a correr
    soltar() {
      if (this.dialogosAbertos === 0) return;
      this.dialogosAbertos -= 1;
      if (this.dialogosAbertos > 0) return;
      for (const toast of this.toasts) {
        toast.retido = false;
        this.armar(toast.id);
      }
    },

    // A ação recebe o evento (opcional); o resultado do onClick volta para quem chamou, que pode
    // esperar a promessa antes de decidir o foco
    runAction(id, event) {
      const toast = this.toasts.find((item) => item.id === id);
      const resultado = toast?.action?.onClick?.(event);
      this.dismiss(id);
      return resultado;
    },
  },
});
