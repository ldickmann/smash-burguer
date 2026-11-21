// O hub da Home em flat: a tela inicial (os ladrilhos) é o menu das áreas da página [F25]. A HomeFlat
// chama provideHub(); os ladrilhos e o pivot chamam useHub() e dividem a mesma aba ativa.
// irPara(destino): uma chave de CATEGORIAS seleciona a página do pivot e leva o foco à aba dela;
// "adicionais" e "loja" levam o foco ao h2 da seção (tabindex="-1"). A rolagem é suave, salvo com
// movimento reduzido.
import { inject, nextTick, provide, ref } from "vue";
import { CATEGORIAS } from "../../compartilhado/dados";

const CHAVE_HUB = Symbol("fl-hub");
const CHAVES_CATEGORIA = new Set(CATEGORIAS.map((categoria) => categoria.chave));

export function provideHub() {
  const abaAtiva = ref(CATEGORIAS[0].chave);

  const irPara = async (destino) => {
    const categoria = CHAVES_CATEGORIA.has(destino);
    if (categoria) abaAtiva.value = destino;
    await nextTick();

    const secao = document.querySelector(`[data-secao="${categoria ? "cardapio" : destino}"]`);
    if (!secao) return;
    const foco = categoria ? document.getElementById(`fl-aba-${destino}`) : secao.querySelector("h2");
    const reduzido = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    secao.scrollIntoView?.({ block: "start", behavior: reduzido ? "auto" : "smooth" });
    foco?.focus({ preventScroll: true });
  };

  const hub = { abaAtiva, irPara };
  provide(CHAVE_HUB, hub);
  return hub;
}

export function useHub() {
  const hub = inject(CHAVE_HUB, null);
  if (!hub) throw new Error("useHub() precisa ser chamado dentro da HomeFlat (provideHub).");
  return hub;
}
