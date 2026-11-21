<!-- Home em Dark mode, "A Brasa pelas diretrizes" (só desenvolvimento): a Brasa de produção (#/)
     refeita pelas diretrizes de tema escuro do Material 3 e da Apple. -->
<template>
  <MolduraDirecao estilo="escuro">
    <template #topo>
      <header ref="cabecalho" class="esc-barra">
        <div class="esc-barra__interno container">
          <RouterLink :to="INICIO" class="esc-marca">{{ MARCA }}</RouterLink>

          <nav
            id="esc-menu"
            ref="menu"
            class="esc-menu"
            :class="{ 'is-aberto': aberto }"
            aria-label="Principal"
          >
            <ul class="esc-menu__lista" role="list">
              <li v-for="link in links" :key="link.to">
                <RouterLink :to="link.to" class="esc-link">{{ link.rotulo }}</RouterLink>
              </li>
            </ul>
          </nav>

          <div class="esc-barra__acoes">
            <RouterLink to="/cart" class="esc-icone esc-carrinho" :aria-label="rotulo">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" class="esc-carrinho__icone" aria-hidden="true" />
              <Transition name="esc-badge">
                <span v-if="quantidade > 0" class="esc-badge tabular" aria-hidden="true">
                  <span
                    v-for="digito in digitos"
                    :key="digito.chave"
                    class="esc-odo__janela"
                    :style="{ '--i': digito.daDireita }"
                  >
                    <Transition :name="`esc-odo-${sentido}`">
                      <span :key="digito.caractere" class="esc-odo__digito">{{ digito.caractere }}</span>
                    </Transition>
                  </span>
                </span>
              </Transition>
            </RouterLink>
            <button
              ref="botaoMenu"
              type="button"
              class="esc-icone esc-barra__menu"
              aria-controls="esc-menu"
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
      <section class="esc-hero" aria-labelledby="esc-titulo">
        <div class="esc-hero__interno container">
          <div class="esc-hero__texto">
            <h1 id="esc-titulo" class="esc-hero__titulo">{{ HERO.titulo }}</h1>
            <p class="esc-hero__descricao">{{ HERO.texto }}</p>
            <RouterLink to="/menu" class="esc-botao esc-botao--primario">
              {{ HERO.acao }}
              <font-awesome-icon :icon="['fas', 'arrow-right']" aria-hidden="true" />
            </RouterLink>
          </div>
          <picture class="esc-hero__foto">
            <source type="image/webp" :srcset="imagemHero.srcset" :sizes="imagemHero.sizes" />
            <img
              class="esc-hero__img"
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
      </section>

      <section class="esc-populares" aria-labelledby="mais-pedidos">
        <div class="container">
          <div class="esc-populares__cabecalho">
            <h2 id="mais-pedidos" class="esc-populares__titulo">{{ SECAO.titulo }}</h2>
            <div class="esc-populares__setas">
              <button type="button" class="esc-icone esc-icone--contorno" :aria-label="SECAO.anterior" @click="carrossel?.prev()">
                <font-awesome-icon :icon="['fas', 'chevron-left']" aria-hidden="true" />
              </button>
              <button type="button" class="esc-icone esc-icone--contorno" :aria-label="SECAO.proximo" @click="carrossel?.next()">
                <font-awesome-icon :icon="['fas', 'chevron-right']" aria-hidden="true" />
              </button>
            </div>
          </div>

          <Carousel ref="carrossel" v-bind="config" class="esc-carrossel">
            <Slide v-for="produto in productsStore.foods" :key="produto.id" class="esc-carrossel__slide">
              <CartaoProduto v-slot="cartao" :produto="produto">
                <article class="esc-card">
                  <div class="esc-card__foto">
                    <picture v-if="cartao.imagem.src && !cartao.imagemFalhou">
                      <source
                        v-if="cartao.imagem.srcset"
                        type="image/webp"
                        :srcset="cartao.imagem.srcset"
                        :sizes="cartao.imagem.sizes"
                      />
                      <img
                        class="esc-card__img"
                        :src="cartao.imagem.src"
                        :alt="produto.name"
                        width="960"
                        height="720"
                        loading="lazy"
                        decoding="async"
                        @error="cartao.aoFalharImagem"
                      />
                    </picture>
                    <div v-else class="esc-card__reserva">
                      <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
                    </div>
                  </div>

                  <div class="esc-card__corpo">
                    <h3 class="esc-card__nome">{{ produto.name }}</h3>
                    <p class="esc-card__descricao">{{ produto.description }}</p>
                    <div class="esc-card__rodape">
                      <p class="esc-card__preco tabular">{{ cartao.preco }}</p>
                      <button
                        type="button"
                        class="esc-adicionar"
                        :class="{ 'is-adicionado': cartao.adicionado }"
                        v-bind="cartao.atributosAdicionar"
                        @click="personalizar(produto, cartao.contexto)"
                      >
                        <span class="esc-adicionar__miolo">
                          <span class="esc-adicionar__face esc-adicionar__face--frente">Adicionar</span>
                          <span class="esc-adicionar__face esc-adicionar__face--verso" aria-hidden="true">
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
      <footer class="esc-rodape">
        <div class="container">
          <div class="esc-rodape__grade">
            <div class="esc-rodape__marca">
              <p class="esc-rodape__nome">{{ MARCA }}</p>
              <p class="esc-rodape__texto">{{ DESCRICAO }}</p>
            </div>

            <section class="esc-rodape__coluna" aria-labelledby="esc-rodape-endereco">
              <h2 id="esc-rodape-endereco" class="esc-rodape__titulo">{{ RODAPE.endereco }}</h2>
              <ul class="esc-rodape__lista" role="list">
                <li v-for="contato in CONTATOS" :key="contato.chave">
                  <a
                    class="esc-rodape__link"
                    :href="contato.href"
                    :target="contato.externo ? '_blank' : undefined"
                    :rel="contato.externo ? 'noopener noreferrer' : undefined"
                  >
                    <font-awesome-icon :icon="contato.icone" class="esc-rodape__icone" aria-hidden="true" />
                    <span>
                      {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </section>

            <section class="esc-rodape__coluna" aria-labelledby="esc-rodape-horario">
              <h2 id="esc-rodape-horario" class="esc-rodape__titulo">{{ RODAPE.horario }}</h2>
              <p class="esc-rodape__texto">{{ HORARIO }}</p>
            </section>

            <section class="esc-rodape__coluna" aria-labelledby="esc-rodape-redes">
              <h2 id="esc-rodape-redes" class="esc-rodape__titulo">{{ RODAPE.redes }}</h2>
              <ul class="esc-rodape__redes" role="list">
                <li v-for="rede in REDES" :key="rede.nome">
                  <a
                    class="esc-icone esc-icone--contorno"
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
          <p class="esc-rodape__copy">{{ RODAPE.copyright }}</p>
        </div>
      </footer>
    </template>
  </MolduraDirecao>
</template>

<script setup>
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

const INICIO = "/direcoes/escuro";

// As fontes (Bebas Neue e Archivo) já são as do app, importadas no main.js
useEstiloAtivo("escuro", { esquema: "dark" });

const productsStore = useProductsStore();
const links = useLinksPrincipais(INICIO);
const { quantidade, rotulo, digitos, sentido } = useContadorCarrinho();
const { cabecalho, menu, botaoMenu, aberto, alternar } = useMenuPrincipal();

const carrossel = ref(null);
// Mesmo espaço do carrossel real
const config = configCarrossel({ espaco: 24 });

const imagemHero = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1024px) 560px, 300px",
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
