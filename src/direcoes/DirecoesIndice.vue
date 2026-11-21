<!-- Índice da exploração (#/direcoes, só em `yarn dev`): um resumo para comparar e uma ficha por direção. -->
<template>
  <div class="indice">
    <a href="#conteudo" class="skip-link" @click.prevent="focarConteudo">Pular para o conteúdo</a>

    <header class="indice__topo">
      <div class="container indice__topo-interno">
        <p class="indice__marca">Smash Burger</p>
        <h1 class="indice__titulo">Direções visuais</h1>
        <p class="indice__intro">
          A Home da loja refeita em três estilos de interface. O Material 3 Expressive foi o
          escolhido para o sistema inteiro; o esqueumorfismo e o neumorfismo ficam como acervo de
          ideias de UI/UX. Estas páginas só existem no servidor de desenvolvimento e não entram no build.
        </p>
      </div>
    </header>

    <main id="conteudo" ref="conteudo" class="indice__conteudo" tabindex="-1">
      <section class="container indice__secao" aria-labelledby="resumo-titulo">
        <h2 id="resumo-titulo" class="indice__subtitulo">Resumo</h2>
        <div class="indice__tabela-rolagem" tabindex="0" role="region" aria-labelledby="resumo-titulo">
          <table class="indice__tabela">
            <thead>
              <tr>
                <th scope="col">Direção</th>
                <th scope="col">Situação</th>
                <th scope="col">Paleta</th>
                <th scope="col">Custo de levar ao sistema</th>
                <th scope="col"><span class="visually-hidden">Abrir</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="direcao in direcoes" :key="direcao.slug">
                <th scope="row">
                  <span class="indice__nome">{{ direcao.nome }}</span>
                  <span class="indice__apelido">{{ direcao.apelido }}</span>
                </th>
                <td>{{ direcao.situacao }}</td>
                <td>
                  <span class="indice__paleta" :data-direcao="direcao.slug" aria-hidden="true">
                    <span
                      v-for="cor in direcao.ficha.cores"
                      :key="cor.token"
                      class="indice__ponto"
                      :style="{ background: `var(--${cor.token})` }"
                    ></span>
                  </span>
                  <span class="visually-hidden">{{ direcao.ficha.cores.map((cor) => cor.nome).join(", ") }}</span>
                </td>
                <td>{{ direcao.ficha.custoResumo }}</td>
                <td>
                  <RouterLink class="indice__abrir" :to="caminhoDirecao(direcao.slug)">
                    Abrir<span class="visually-hidden"> a Home em {{ direcao.nome }}</span>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="container indice__secao" aria-labelledby="fichas-titulo">
        <h2 id="fichas-titulo" class="indice__subtitulo">Fichas</h2>
        <div class="indice__fichas">
          <FichaDirecao
            v-for="direcao in direcoes"
            :key="direcao.slug"
            :direcao="direcao"
            :ficha="direcao.ficha"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import "./_tokens.scss";
// Tokens e fonte de cada estilo, para a faixa e a amostra de cada ficha
import "@fontsource-variable/roboto";
import "./estilos/material/_tokens.scss";
import "@fontsource/courier-prime/400.css";
import "./estilos/esqueumorfismo/_tokens.scss";
import "@fontsource-variable/nunito";
import "./estilos/neumorfismo/_tokens.scss";
import { ref } from "vue";
import FichaDirecao from "./FichaDirecao.vue";
import { DIRECOES, caminhoDirecao } from "./direcoes";
import { FICHAS } from "./fichas";
import { useEstiloAtivo } from "./compartilhado/useEstiloAtivo";

useEstiloAtivo("indice", { esquema: "light" });

const direcoes = DIRECOES.filter(({ slug }) => FICHAS[slug]).map((direcao) => ({
  ...direcao,
  ficha: FICHAS[direcao.slug],
}));

const conteudo = ref(null);
const focarConteudo = () => conteudo.value?.focus();
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

.indice {
  min-height: 100dvh;
  background: var(--dir-fundo);
  color: var(--dir-tinta);
  font-family: var(--dir-fonte);
  font-size: var(--dir-texto);
  line-height: 1.5;
}

.indice__topo {
  padding-block: var(--space-8) var(--space-6);
}

.indice__topo-interno {
  display: grid;
  gap: var(--space-3);
}

.indice__marca {
  color: var(--dir-tinta-suave);
  font-weight: 600;
}

.indice__titulo {
  font-family: var(--dir-fonte);
  font-size: var(--dir-texto-pagina);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.01em;
  text-transform: none;
}

.indice__intro {
  max-width: 65ch;
  color: var(--dir-tinta-suave);
  font-size: var(--dir-texto);
}

.indice__conteudo {
  padding-bottom: var(--space-9);
}

// minmax(0, 1fr): a tabela larga rola dentro da própria caixa, sem alargar a página
.indice__secao {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.indice__subtitulo {
  font-family: var(--dir-fonte);
  font-size: var(--dir-texto-titulo);
  font-weight: 800;
}

// position: relative prende os .visually-hidden (absolutos) das células dentro da rolagem
.indice__tabela-rolagem {
  position: relative;
  overflow-x: auto;
  border: 1px solid var(--dir-linha);
  border-radius: var(--dir-raio);
  background: var(--dir-papel);
}

.indice__tabela {
  width: 100%;
  min-width: 40rem;
  border-collapse: collapse;

  th,
  td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--dir-linha);
    text-align: left;
    vertical-align: middle;
  }

  tbody tr:last-child > * {
    border-bottom: 0;
  }

  thead th {
    color: var(--dir-tinta-suave);
    font-size: var(--dir-texto-pequeno);
    font-weight: 600;
  }
}

.indice__nome {
  display: block;
  font-weight: 700;
}

.indice__apelido {
  display: block;
  color: var(--dir-tinta-suave);
  font-size: var(--dir-texto-pequeno);
  font-weight: 400;
}

.indice__paleta {
  display: inline-flex;
  gap: var(--space-1);
  padding: var(--space-1);
  border-radius: var(--dir-raio-amostra);
  background: var(--color-bg);
}

.indice__ponto {
  width: 1.25rem;
  height: 1.25rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--dir-raio-pilula);
}

.indice__abrir {
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min);
  padding-inline: var(--space-4);
  border: 2px solid var(--dir-tinta);
  border-radius: var(--dir-raio-pilula);
  color: var(--dir-tinta);
  font-weight: 700;
}

.indice__fichas {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-5);
  align-items: start;

  @include up(lg) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

<style lang="scss">
// Foco no índice: a cor de foco do <html> é a da Brasa, que não tem 3:1 sobre o fundo claro
.indice :focus-visible {
  outline: var(--dir-anel) solid var(--dir-foco);
  outline-offset: 2px;
}
</style>
