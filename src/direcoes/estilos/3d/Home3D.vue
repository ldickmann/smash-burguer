<!-- Home em 3D e gradientes suaves, "Camadas" (só desenvolvimento): o degradê das camadas do lanche,
     botões de argila que incham e achatam, e o hero como uma cena em camadas que segue o ponteiro. -->
<template>
  <MolduraDirecao estilo="3d">
    <template #topo>
      <!-- Fora de qualquer perspective: um ancestral com perspective prenderia o sticky -->
      <header ref="cabecalho" class="d3-topo">
        <div class="container">
          <div class="d3-barra">
            <RouterLink :to="INICIO" class="d3-marca">{{ MARCA }}</RouterLink>

            <nav
              id="d3-menu"
              ref="menu"
              class="d3-menu"
              :class="{ 'is-aberto': aberto }"
              aria-label="Principal"
            >
              <ul class="d3-menu__lista" role="list">
                <li v-for="link in links" :key="link.to">
                  <RouterLink :to="link.to" class="d3-link">{{ link.rotulo }}</RouterLink>
                </li>
              </ul>
            </nav>

            <div class="d3-barra__acoes">
              <RouterLink to="/cart" class="d3-carrinho" :aria-label="rotulo">
                <font-awesome-icon :icon="['fas', 'shopping-cart']" class="d3-carrinho__icone" aria-hidden="true" />
                <Transition name="d3-contador">
                  <span v-if="quantidade > 0" class="d3-contador tabular" aria-hidden="true">
                    <span
                      v-for="digito in digitos"
                      :key="digito.chave"
                      class="d3-odo__janela"
                      :style="{ '--i': digito.daDireita }"
                    >
                      <Transition :name="`d3-odo-${sentido}`">
                        <span :key="digito.caractere" class="d3-odo__digito">{{ digito.caractere }}</span>
                      </Transition>
                    </span>
                  </span>
                </Transition>
              </RouterLink>
              <button
                ref="botaoMenu"
                type="button"
                class="d3-redondo d3-barra__menu"
                aria-controls="d3-menu"
                :aria-expanded="String(aberto)"
                aria-label="Menu principal"
                @click="alternar"
              >
                <font-awesome-icon :icon="['fas', aberto ? 'xmark' : 'bars']" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </template>

    <template #default="{ personalizar }">
      <div class="d3-fundo">
        <section class="d3-hero" aria-labelledby="d3-titulo">
          <div class="d3-hero__interno container">
            <div class="d3-hero__texto">
              <h1 id="d3-titulo" class="d3-hero__titulo">{{ HERO.titulo }}</h1>
              <p class="d3-hero__descricao">{{ HERO.texto }}</p>
              <RouterLink to="/menu" class="d3-inflado d3-inflado--ketchup d3-inflado--grande">
                <span class="d3-inflado__rotulo">{{ HERO.acao }}</span>
              </RouterLink>
            </div>

            <!-- Cena: halo, chapa, sombra de contato e o lanche em profundidades diferentes -->
            <div ref="cena" class="d3-cena">
              <div class="d3-cena__camadas">
                <div class="d3-cena__halo" aria-hidden="true"></div>
                <div class="d3-cena__chapa" aria-hidden="true"></div>
                <div class="d3-cena__contato" aria-hidden="true"></div>
                <picture class="d3-cena__lanche">
                  <source type="image/webp" :srcset="imagemHero.srcset" :sizes="imagemHero.sizes" />
                  <img
                    class="d3-cena__img"
                    :src="imagemHero.src"
                    :alt="HERO.alt"
                    :width="HERO.largura"
                    :height="HERO.altura"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          </div>
        </section>

        <section class="d3-populares" aria-labelledby="mais-pedidos">
          <div class="container">
            <div class="d3-populares__cabecalho">
              <h2 id="mais-pedidos" class="d3-populares__titulo">{{ SECAO.titulo }}</h2>
              <div class="d3-populares__setas">
                <button type="button" class="d3-redondo" :aria-label="SECAO.anterior" @click="carrossel?.prev()">
                  <font-awesome-icon :icon="['fas', 'chevron-left']" aria-hidden="true" />
                </button>
                <button type="button" class="d3-redondo" :aria-label="SECAO.proximo" @click="carrossel?.next()">
                  <font-awesome-icon :icon="['fas', 'chevron-right']" aria-hidden="true" />
                </button>
              </div>
            </div>

            <Carousel ref="carrossel" v-bind="config" class="d3-carrossel">
              <Slide v-for="produto in productsStore.foods" :key="produto.id" class="d3-carrossel__slide">
                <CartaoProduto v-slot="cartao" :produto="produto">
                  <article class="d3-card">
                    <div class="d3-card__foto">
                      <picture v-if="cartao.imagem.src && !cartao.imagemFalhou">
                        <source
                          v-if="cartao.imagem.srcset"
                          type="image/webp"
                          :srcset="cartao.imagem.srcset"
                          :sizes="cartao.imagem.sizes"
                        />
                        <img
                          class="d3-card__img"
                          :src="cartao.imagem.src"
                          :alt="produto.name"
                          width="960"
                          height="720"
                          loading="lazy"
                          decoding="async"
                          @error="cartao.aoFalharImagem"
                        />
                      </picture>
                      <div v-else class="d3-card__reserva">
                        <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
                      </div>
                    </div>

                    <div class="d3-card__corpo">
                      <h3 class="d3-card__nome">{{ produto.name }}</h3>
                      <p class="d3-card__descricao">{{ produto.description }}</p>
                      <div class="d3-card__rodape">
                        <p class="d3-card__preco tabular">{{ cartao.preco }}</p>
                        <button
                          type="button"
                          class="d3-inflado d3-inflado--carne d3-adicionar"
                          :class="{ 'is-adicionado': cartao.adicionado }"
                          v-bind="cartao.atributosAdicionar"
                          @click="personalizar(produto, cartao.contexto)"
                        >
                          <span class="d3-adicionar__miolo">
                            <span class="d3-adicionar__face d3-adicionar__face--frente">Adicionar</span>
                            <span class="d3-adicionar__face d3-adicionar__face--verso" aria-hidden="true">
                              <font-awesome-icon :icon="['fas', 'check']" /> Adicionado
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </article>
                </CartaoProduto>
              </Slide>

              <template #addons>
                <Pagination />
              </template>
            </Carousel>
          </div>
        </section>
      </div>
    </template>

    <template #rodape>
      <footer class="d3-rodape">
        <div class="container d3-rodape__grade">
          <div class="d3-rodape__marca">
            <p class="d3-rodape__nome">{{ MARCA }}</p>
            <p class="d3-rodape__texto">{{ DESCRICAO }}</p>
          </div>

          <section class="d3-rodape__coluna" aria-labelledby="d3-rodape-endereco">
            <h2 id="d3-rodape-endereco" class="d3-rodape__titulo">{{ RODAPE.endereco }}</h2>
            <ul class="d3-rodape__lista" role="list">
              <li v-for="contato in CONTATOS" :key="contato.chave">
                <a
                  class="d3-rodape__link"
                  :href="contato.href"
                  :target="contato.externo ? '_blank' : undefined"
                  :rel="contato.externo ? 'noopener noreferrer' : undefined"
                >
                  <font-awesome-icon :icon="contato.icone" class="d3-rodape__icone" aria-hidden="true" />
                  <span>
                    {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <section class="d3-rodape__coluna" aria-labelledby="d3-rodape-horario">
            <h2 id="d3-rodape-horario" class="d3-rodape__titulo">{{ RODAPE.horario }}</h2>
            <p class="d3-rodape__texto">{{ HORARIO }}</p>
          </section>

          <section class="d3-rodape__coluna" aria-labelledby="d3-rodape-redes">
            <h2 id="d3-rodape-redes" class="d3-rodape__titulo">{{ RODAPE.redes }}</h2>
            <ul class="d3-rodape__redes" role="list">
              <li v-for="rede in REDES" :key="rede.nome">
                <a
                  class="d3-rodape__rede"
                  :href="rede.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="rede.rotulo"
                >
                  <font-awesome-icon :icon="rede.icone" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div class="container">
          <p class="d3-rodape__copy">{{ RODAPE.copyright }}</p>
        </div>
      </footer>
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/fredoka";
import "vue3-carousel/carousel.css";
import "./_tokens.scss";
import { ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import { useProductsStore } from "@/stores/products";
import { responsiveImage } from "@/composables/useResponsiveImage";
import { useTilt } from "@/composables/useTilt";
import MolduraDirecao from "../../compartilhado/MolduraDirecao.vue";
import CartaoProduto from "../../compartilhado/CartaoProduto.vue";
import { useEstiloAtivo } from "../../compartilhado/useEstiloAtivo";
import { useMenuPrincipal } from "../../compartilhado/useMenuPrincipal";
import { useContadorCarrinho } from "../../compartilhado/useContadorCarrinho";
import { configCarrossel } from "../../compartilhado/carrossel";
import {
  CONTATOS,
  DESCRICAO,
  HERO,
  HORARIO,
  IMAGEM_HERO,
  MARCA,
  NOVA_ABA,
  REDES,
  RODAPE,
  SECAO,
} from "../../compartilhado/dados";
import { useLinksPrincipais } from "../../compartilhado/useLinksPrincipais";

const INICIO = "/direcoes/3d";

useEstiloAtivo("3d", { esquema: "light" });

const productsStore = useProductsStore();
const links = useLinksPrincipais(INICIO);
const { quantidade, rotulo, digitos, sentido } = useContadorCarrinho();
const { cabecalho, menu, botaoMenu, aberto, alternar } = useMenuPrincipal();

// Paralaxe da cena: o useTilt só liga com mouse/trackpad e sem movimento reduzido
const cena = ref(null);
useTilt(cena, { max: 6 });

const carrossel = ref(null);
// Folga grande: a sombra macia da argila precisa de espaço
const config = configCarrossel({ espaco: 0 });

const imagemHero = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1024px) 500px, 320px",
});
</script>

<style scoped lang="scss">
@use "./home";

// Layout da moldura: a MolduraDirecao não tem estilo próprio
.moldura {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

.moldura :deep(.moldura__conteudo) {
  flex: 1;
  min-width: 0;
}
</style>
