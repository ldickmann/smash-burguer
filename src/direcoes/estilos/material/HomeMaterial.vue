<!-- Home em Material 3 Expressive, "Alface" (piloto, só desenvolvimento). -->
<template>
  <MolduraDirecao estilo="material">
    <template #topo>
      <header ref="cabecalho" class="m3-barra">
        <div class="m3-barra__interno container">
          <RouterLink :to="INICIO" class="m3-marca">{{ MARCA }}</RouterLink>

          <nav
            id="m3-menu"
            ref="menu"
            class="m3-abas"
            :class="{ 'is-aberto': aberto }"
            aria-label="Principal"
          >
            <ul class="m3-abas__lista" role="list">
              <li v-for="link in links" :key="link.to">
                <RouterLink :to="link.to" class="m3-aba">
                  <span class="m3-aba__rotulo">{{ link.rotulo }}</span>
                </RouterLink>
              </li>
            </ul>
          </nav>

          <div class="m3-barra__acoes">
            <RouterLink to="/cart" class="m3-icone-botao m3-carrinho" :aria-label="rotulo">
              <font-awesome-icon :icon="['fas', 'shopping-cart']" aria-hidden="true" />
              <Transition name="m3-badge">
                <span v-if="quantidade > 0" class="m3-badge tabular" aria-hidden="true">{{ texto }}</span>
              </Transition>
            </RouterLink>
            <button
              ref="botaoMenu"
              type="button"
              class="m3-icone-botao m3-barra__menu"
              aria-controls="m3-menu"
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
      <section class="m3-hero" aria-labelledby="m3-hero-titulo">
        <div class="m3-hero__interno container">
          <div class="m3-hero__texto">
            <h1 id="m3-hero-titulo" class="m3-hero__titulo">{{ HERO.titulo }}</h1>
            <p class="m3-hero__descricao">{{ HERO.texto }}</p>
            <RouterLink to="/menu" class="m3-botao m3-botao--filled m3-botao--hero">
              {{ HERO.acao }}
            </RouterLink>
          </div>

          <div class="m3-hero__midia">
            <div class="m3-hero__forma" aria-hidden="true"></div>
            <picture class="m3-hero__foto">
              <source type="image/webp" :srcset="imagemHero.srcset" :sizes="imagemHero.sizes" />
              <img
                class="m3-hero__img"
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

      <section class="m3-populares" aria-labelledby="mais-pedidos">
        <div class="container">
          <div class="m3-populares__folha">
            <div class="m3-populares__cabecalho">
              <h2 id="mais-pedidos" class="m3-populares__titulo">{{ SECAO.titulo }}</h2>
              <div class="m3-populares__setas">
                <button
                  type="button"
                  class="m3-icone-botao m3-icone-botao--tonal"
                  :aria-label="SECAO.anterior"
                  @click="carrossel?.prev()"
                >
                  <font-awesome-icon :icon="['fas', 'chevron-left']" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  class="m3-icone-botao m3-icone-botao--tonal"
                  :aria-label="SECAO.proximo"
                  @click="carrossel?.next()"
                >
                  <font-awesome-icon :icon="['fas', 'chevron-right']" aria-hidden="true" />
                </button>
              </div>
            </div>

            <Carousel ref="carrossel" v-bind="config" class="m3-carrossel">
              <Slide v-for="produto in productsStore.foods" :key="produto.id" class="m3-carrossel__slide">
                <CartaoProduto v-slot="cartao" :produto="produto">
                  <article class="m3-card">
                    <div class="m3-card__midia">
                      <picture v-if="cartao.imagem.src && !cartao.imagemFalhou">
                        <source
                          v-if="cartao.imagem.srcset"
                          type="image/webp"
                          :srcset="cartao.imagem.srcset"
                          :sizes="cartao.imagem.sizes"
                        />
                        <img
                          class="m3-card__img"
                          :src="cartao.imagem.src"
                          :alt="produto.name"
                          width="960"
                          height="720"
                          loading="lazy"
                          decoding="async"
                          @error="cartao.aoFalharImagem"
                        />
                      </picture>
                      <div v-else class="m3-card__reserva">
                        <font-awesome-icon :icon="['fas', 'burger']" aria-hidden="true" />
                      </div>
                    </div>

                    <div class="m3-card__corpo">
                      <h3 class="m3-card__nome">{{ produto.name }}</h3>
                      <p class="m3-card__descricao">{{ produto.description }}</p>
                      <div class="m3-card__rodape">
                        <p class="m3-card__preco tabular">{{ cartao.preco }}</p>
                        <button
                          type="button"
                          class="m3-botao m3-botao--tonal m3-adicionar"
                          :class="{ 'is-adicionado': cartao.adicionado }"
                          :aria-label="`Adicionar ${produto.name}`"
                          @click="personalizar(produto, cartao.contexto)"
                        >
                          <span class="m3-adicionar__face m3-adicionar__face--frente">Adicionar</span>
                          <span class="m3-adicionar__face m3-adicionar__face--verso" aria-hidden="true">
                            <font-awesome-icon :icon="['fas', 'check']" class="m3-adicionar__check" />
                            Adicionado
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
        </div>
      </section>
    </template>

    <template #rodape>
      <footer class="m3-rodape">
        <div class="container m3-rodape__grade">
          <div class="m3-rodape__marca">
            <p class="m3-rodape__nome">{{ MARCA }}</p>
            <p class="m3-rodape__descricao">{{ DESCRICAO }}</p>
          </div>

          <section class="m3-rodape__coluna" aria-labelledby="m3-rodape-endereco">
            <h2 id="m3-rodape-endereco" class="m3-rodape__titulo">{{ RODAPE.endereco }}</h2>
            <ul class="m3-rodape__lista" role="list">
              <li v-for="contato in CONTATOS" :key="contato.chave">
                <a
                  class="m3-texto-botao"
                  :href="contato.href"
                  :target="contato.externo ? '_blank' : undefined"
                  :rel="contato.externo ? 'noopener noreferrer' : undefined"
                >
                  <font-awesome-icon :icon="contato.icone" class="m3-texto-botao__icone" aria-hidden="true" />
                  <span>
                    {{ contato.texto }}<span v-if="contato.externo" class="visually-hidden">{{ NOVA_ABA }}</span>
                  </span>
                </a>
              </li>
            </ul>
          </section>

          <section class="m3-rodape__coluna" aria-labelledby="m3-rodape-horario">
            <h2 id="m3-rodape-horario" class="m3-rodape__titulo">{{ RODAPE.horario }}</h2>
            <p class="m3-rodape__texto">{{ HORARIO }}</p>
          </section>

          <section class="m3-rodape__coluna" aria-labelledby="m3-rodape-redes">
            <h2 id="m3-rodape-redes" class="m3-rodape__titulo">{{ RODAPE.redes }}</h2>
            <ul class="m3-rodape__redes" role="list">
              <li v-for="rede in REDES" :key="rede.nome">
                <a
                  class="m3-icone-botao m3-icone-botao--tonal"
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
          <p class="m3-rodape__copy">{{ RODAPE.copyright }}</p>
        </div>
      </footer>
    </template>
  </MolduraDirecao>
</template>

<script setup>
import "@fontsource-variable/roboto";
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
  useLinksPrincipais,
} from "../../compartilhado/conteudo";

const INICIO = "/direcoes/material";

// Antes de tudo: o carrossel lê a duração da mola do estilo
useEstiloAtivo("material", { esquema: "light" });

const productsStore = useProductsStore();
const links = useLinksPrincipais(INICIO);
const { quantidade, rotulo, texto } = useContadorCarrinho();
const { cabecalho, menu, botaoMenu, aberto, alternar } = useMenuPrincipal();

const carrossel = ref(null);
// Cards de 12 dp num carrossel com 16 dp entre os itens; o deslize usa a mola espacial padrão
const config = configCarrossel({ espaco: 16, duracao: "--m3-dur-mola-espacial" });

const imagemHero = responsiveImage(HERO.imagem, {
  ...IMAGEM_HERO,
  sizes: "(min-width: 1024px) 520px, 320px",
});
</script>

<style scoped lang="scss">
@use "./home";
</style>
