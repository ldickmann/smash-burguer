<!-- Home em flat, "Ladrilhos" (só desenvolvimento): blocos de cor chapada com os ingredientes do
     cardápio, tipografia grande e leve, e botões que continuam com cara de botão. -->
<template>
  <MolduraDirecao estilo="flat">
    <template #topo>
      <header ref="cabecalho" class="fl-topo">
        <div class="fl-topo__interno container">
          <RouterLink :to="INICIO" class="fl-marca">{{ MARCA }}</RouterLink>

          <nav
            id="fl-menu"
            ref="menu"
            class="fl-menu"
            :class="{ 'is-aberto': aberto }"
            aria-label="Principal"
          >
            <ul class="fl-menu__lista" role="list">
              <li v-for="link in links" :key="link.to">
                <RouterLink :to="link.to" class="fl-link">{{ link.rotulo }}</RouterLink>
              </li>
            </ul>
          </nav>

          <div class="fl-topo__acoes">
            <RouterLink to="/cart" class="fl-carrinho" :aria-label="rotulo">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="fl-carrinho__icone" aria-hidden="true" />
              <span v-if="quantidade > 0" class="fl-badge tabular" aria-hidden="true">
                <span v-for="digito in digitos" :key="digito.chave" class="fl-badge__janela">
                  <Transition :name="`fl-numero-${sentido}`">
                    <span :key="digito.caractere" class="fl-badge__digito">{{ digito.caractere }}</span>
                  </Transition>
                </span>
              </span>
            </RouterLink>
            <button
              ref="botaoMenu"
              type="button"
              class="fl-quadrado fl-topo__menu"
              aria-controls="fl-menu"
              :aria-expanded="String(aberto)"
              aria-label="Menu principal"
              @click="alternar"
            >
              <font-awesome-icon :icon="['fas', aberto ? 'xmark' : 'bars']" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
    </template>

    <template #default="{ personalizar }">
      <section class="fl-hero" aria-labelledby="fl-titulo">
        <div class="fl-hero__grade container">
          <div class="fl-ladrilho fl-ladrilho--cebola">
            <h1 id="fl-titulo" class="fl-hero__titulo">{{ HERO.titulo }}</h1>
            <p class="fl-hero__descricao">{{ HERO.texto }}</p>
            <RouterLink to="/menu" class="fl-botao fl-botao--claro">{{ HERO.acao }}</RouterLink>
          </div>
          <div class="fl-ladrilho fl-ladrilho--cheddar">
            <picture class="fl-hero__foto">
              <source type="image/webp" :srcset="imagemHero.srcset" :sizes="imagemHero.sizes" />
              <img
                class="fl-hero__img"
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
      </section>

      <section class="fl-populares" aria-labelledby="mais-pedidos">
        <div class="container">
          <div class="fl-populares__cabecalho">
            <h2 id="mais-pedidos" class="fl-populares__titulo">{{ SECAO.titulo }}</h2>
            <div class="fl-populares__setas">
              <button type="button" class="fl-quadrado" :aria-label="SECAO.anterior" @click="carrossel?.prev()">
                <font-awesome-icon :icon="['fas', 'chevron-left']" aria-hidden="true" />
              </button>
              <button type="button" class="fl-quadrado" :aria-label="SECAO.proximo" @click="carrossel?.next()">
                <font-awesome-icon :icon="['fas', 'chevron-right']" aria-hidden="true" />
              </button>
            </div>
          </div>

          <Carousel ref="carrossel" v-bind="config" class="fl-carrossel">
            <Slide v-for="produto in productsStore.foods" :key="produto.id" class="fl-carrossel__slide">
              <CartaoProduto v-slot="cartao" :produto="produto" :tamanhos="TAMANHOS_FOTO">
                <article class="fl-card">
                  <div class="fl-card__foto">
                    <picture v-if="cartao.imagem.src && !cartao.imagemFalhou">
                      <source
                        v-if="cartao.imagem.srcset"
                        type="image/webp"
                        :srcset="cartao.imagem.srcset"
                        :sizes="cartao.imagem.sizes"
                      />
                      <img
                        class="fl-card__img"
                        :src="cartao.imagem.src"
                        :alt="produto.name"
                        width="960"
                        height="720"
                        loading="lazy"
                        decoding="async"
                        @error="cartao.aoFalharImagem"
                      />
                    </picture>
                    <div v-else class="fl-card__reserva">
                      <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
                    </div>
                  </div>

                  <div class="fl-card__corpo">
                    <h3 class="fl-card__nome">{{ produto.name }}</h3>
                    <p class="fl-card__descricao">{{ produto.description }}</p>
                    <div class="fl-card__rodape">
                      <p class="fl-card__preco tabular">{{ cartao.preco }}</p>
                      <button
                        type="button"
                        class="fl-adicionar"
                        :class="{ 'is-adicionado': cartao.adicionado }"
                        v-bind="cartao.atributosAdicionar"
                        @click="personalizar(produto, cartao.contexto)"
                      >
                        <span class="fl-adicionar__trilho">
                          <span class="fl-adicionar__face fl-adicionar__face--frente">Adicionar</span>
                          <span class="fl-adicionar__face fl-adicionar__face--verso" aria-hidden="true">
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
    </template>

    <template #rodape>
      <footer class="fl-rodape">
        <div class="container fl-rodape__grade">
          <div class="fl-rodape__marca">
            <p class="fl-rodape__nome">{{ MARCA }}</p>
            <p class="fl-rodape__texto">{{ DESCRICAO }}</p>
          </div>

          <section class="fl-rodape__coluna" aria-labelledby="fl-rodape-endereco">
            <h2 id="fl-rodape-endereco" class="fl-rodape__titulo">{{ RODAPE.endereco }}</h2>
            <ul class="fl-rodape__lista" role="list">
              <li v-for="contato in CONTATOS" :key="contato.chave">
                <a
                  class="fl-rodape__link"
                  :href="contato.href"
                  :target="contato.externo ? '_blank' : undefined"
                  :rel="contato.externo ? 'noopener noreferrer' : undefined"
                >
                  <font-awesome-icon :icon="contato.icone" class="fl-rodape__icone" aria-hidden="true" />
                  <span>
                    {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <section class="fl-rodape__coluna" aria-labelledby="fl-rodape-horario">
            <h2 id="fl-rodape-horario" class="fl-rodape__titulo">{{ RODAPE.horario }}</h2>
            <p class="fl-rodape__texto">{{ HORARIO }}</p>
          </section>

          <section class="fl-rodape__coluna" aria-labelledby="fl-rodape-redes">
            <h2 id="fl-rodape-redes" class="fl-rodape__titulo">{{ RODAPE.redes }}</h2>
            <ul class="fl-rodape__lista" role="list">
              <li v-for="rede in REDES" :key="rede.nome">
                <a
                  class="fl-rodape__link"
                  :href="rede.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="rede.rotulo"
                >
                  <font-awesome-icon :icon="rede.icone" class="fl-rodape__icone" aria-hidden="true" />
                  <span>{{ rede.nome }}</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div class="container">
          <p class="fl-rodape__copy">{{ RODAPE.copyright }}</p>
        </div>
      </footer>
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/open-sans";
import "vue3-carousel/carousel.css";
import "./_tokens.scss";
import { ref } from "vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import { useProductsStore } from "@/stores/products";
import { responsiveImage } from "@/composables/useResponsiveImage";
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

const INICIO = "/direcoes/flat";
// Foto quadrada, mais estreita que a 4:3 do card real
const TAMANHOS_FOTO = "(min-width: 1024px) 380px, (min-width: 480px) 45vw, 92vw";

useEstiloAtivo("flat", { esquema: "light" });

const productsStore = useProductsStore();
const links = useLinksPrincipais(INICIO);
const { quantidade, rotulo, digitos, sentido } = useContadorCarrinho();
const { cabecalho, menu, botaoMenu, aberto, alternar } = useMenuPrincipal();

const carrossel = ref(null);
// Ladrilhos com 8 px de junta
const config = configCarrossel({ espaco: 8 });

const imagemHero = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1024px) 460px, 320px",
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
