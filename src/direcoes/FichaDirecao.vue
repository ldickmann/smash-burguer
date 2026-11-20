<!-- Ficha de uma direção no índice. A faixa de cima leva data-direcao: os tokens do próprio estilo
     valem só ali, e o contraste é medido no navegador com os valores que o CSS resolveu. -->
<template>
  <article class="ficha" :aria-labelledby="`ficha-${direcao.slug}`">
    <div ref="faixa" class="ficha__faixa" :data-direcao="direcao.slug">
      <p class="ficha__amostra" aria-hidden="true">{{ HERO.titulo }}</p>
      <ul class="ficha__cores" role="list" aria-label="Paleta">
        <li v-for="cor in cores" :key="cor.token" class="ficha__cor">
          <span class="ficha__chip" :style="{ background: `var(--${cor.token})` }" aria-hidden="true"></span>
          <span class="ficha__cor-nome">{{ cor.nome }}</span>
          <span class="ficha__cor-valor">{{ cor.valor }}</span>
        </li>
      </ul>
    </div>

    <div class="ficha__corpo">
      <header class="ficha__cabecalho">
        <h2 :id="`ficha-${direcao.slug}`" class="ficha__nome">{{ direcao.nome }}</h2>
        <p class="ficha__apelido">{{ direcao.apelido }}</p>
      </header>

      <p class="ficha__tese">{{ ficha.tese }}</p>

      <RouterLink class="ficha__abrir" :to="caminhoDirecao(direcao.slug)">
        Abrir a Home<span class="visually-hidden"> em {{ direcao.nome }}</span>
      </RouterLink>

      <section class="ficha__secao" :aria-labelledby="`contraste-${direcao.slug}`">
        <h3 :id="`contraste-${direcao.slug}`" class="ficha__titulo">Contraste medido</h3>
        <table class="ficha__tabela">
          <caption class="visually-hidden">
            Pares de cor da Home em {{ direcao.nome }}, com a razão de contraste e o mínimo do WCAG
          </caption>
          <thead>
            <tr>
              <th scope="col">Onde</th>
              <th scope="col">Razão</th>
              <th scope="col">Mínimo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="par in paresHome" :key="`${par.frente}/${par.fundo}/${par.onde}`">
              <th scope="row">{{ par.onde }}</th>
              <td :class="par.ok ? 'is-ok' : 'is-falha'">
                {{ par.texto }}<span class="visually-hidden">{{ par.ok ? ", passa" : ", não passa" }}</span>
              </td>
              <td>{{ par.minimoTexto }}</td>
            </tr>
          </tbody>
        </table>
        <p class="ficha__nota">
          Modal e toast reais: {{ resumoComuns.passam }} de {{ resumoComuns.total }} pares passam.
          <template v-if="resumoComuns.falhas.length">Falham: {{ resumoComuns.falhas.join("; ") }}.</template>
        </p>
      </section>

      <section class="ficha__secao" :aria-labelledby="`tipo-${direcao.slug}`">
        <h3 :id="`tipo-${direcao.slug}`" class="ficha__titulo">Tipografia</h3>
        <p>{{ ficha.tipografia }}</p>
      </section>

      <div class="ficha__duplo">
        <section class="ficha__secao" :aria-labelledby="`pros-${direcao.slug}`">
          <h3 :id="`pros-${direcao.slug}`" class="ficha__titulo">A favor</h3>
          <ul class="ficha__lista">
            <li v-for="item in ficha.pros" :key="item">{{ item }}</li>
          </ul>
        </section>
        <section class="ficha__secao" :aria-labelledby="`contras-${direcao.slug}`">
          <h3 :id="`contras-${direcao.slug}`" class="ficha__titulo">Contra</h3>
          <ul class="ficha__lista">
            <li v-for="item in ficha.contras" :key="item">{{ item }}</li>
          </ul>
        </section>
      </div>

      <section class="ficha__secao" :aria-labelledby="`riscos-${direcao.slug}`">
        <h3 :id="`riscos-${direcao.slug}`" class="ficha__titulo">Riscos nesta Home</h3>
        <ul class="ficha__lista">
          <li v-for="item in ficha.riscos" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section class="ficha__secao" :aria-labelledby="`custo-${direcao.slug}`">
        <h3 :id="`custo-${direcao.slug}`" class="ficha__titulo">Custo de levar ao sistema</h3>
        <p>{{ ficha.custo }}</p>
      </section>

      <section v-if="ficha.desvios.length" class="ficha__secao" :aria-labelledby="`desvios-${direcao.slug}`">
        <h3 :id="`desvios-${direcao.slug}`" class="ficha__titulo">Aproximações</h3>
        <ul class="ficha__lista">
          <li v-for="item in ficha.desvios" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section class="ficha__secao" :aria-labelledby="`fontes-${direcao.slug}`">
        <h3 :id="`fontes-${direcao.slug}`" class="ficha__titulo">Fontes</h3>
        <ul class="ficha__fontes" role="list">
          <li v-for="fonte in ficha.fontes" :key="fonte.ref">
            <span class="ficha__ref">[{{ fonte.ref }}]</span>
            <a v-if="fonte.url" class="ficha__link" :href="fonte.url" target="_blank" rel="noopener noreferrer">
              {{ fonte.titulo }}<span class="visually-hidden"> (abre em nova aba)</span>
            </a>
            <span v-else>{{ fonte.titulo }}</span>
          </li>
        </ul>
      </section>
    </div>
  </article>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { HERO } from "./compartilhado/conteudo";
import { caminhoDirecao } from "./direcoes";
import { PARES_COMUNS, PARES_POR_DIRECAO, cortarDuasCasas, medirPar, passa } from "./contraste";

const props = defineProps({
  direcao: {
    type: Object,
    required: true,
  },
  ficha: {
    type: Object,
    required: true,
  },
});

const numero = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const numeroCurto = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

const faixa = ref(null);
const valores = ref({});

// Lê os tokens resolvidos na faixa da ficha (o var() já vem substituído pelo navegador)
const ler = (token) => valores.value[token] ?? "";

onMounted(() => {
  const estilo = getComputedStyle(faixa.value);
  const tokens = new Set(props.ficha.cores.map((cor) => cor.token));
  for (const par of [...PARES_COMUNS, ...(PARES_POR_DIRECAO[props.direcao.slug] ?? [])]) {
    [par.frente, par.fundo, par.sobre ?? "color-bg"].forEach((token) => tokens.add(token));
  }
  valores.value = Object.fromEntries(
    [...tokens].map((token) => [token, estilo.getPropertyValue(`--${token}`).trim()])
  );
});

const cores = computed(() => props.ficha.cores.map((cor) => ({ ...cor, valor: ler(cor.token) })));

const medir = (par) => {
  const valor = Object.keys(valores.value).length ? medirPar(ler, par) : null;
  return {
    ...par,
    ok: passa(valor, par.minimo),
    texto: valor === null ? "—" : `${numero.format(cortarDuasCasas(valor))}:1`,
    minimoTexto: `${numeroCurto.format(par.minimo)}:1${par.informativo ? " (informativo)" : ""}`,
  };
};

const paresHome = computed(() => (PARES_POR_DIRECAO[props.direcao.slug] ?? []).map(medir));

const resumoComuns = computed(() => {
  const medidos = PARES_COMUNS.map(medir);
  const falhas = medidos.filter((par) => !par.ok).map((par) => `${par.onde} (${par.texto})`);
  return { total: medidos.length, passam: medidos.length - falhas.length, falhas };
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/base/breakpoints" as *;

.ficha {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--dir-linha);
  border-radius: var(--dir-raio);
  background: var(--dir-papel);
  box-shadow: var(--dir-sombra);
  color: var(--dir-tinta);
}

// Faixa no estilo da direção: fundo, texto e fonte de título do próprio estilo
.ficha__faixa {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-text);
}

.ficha__amostra {
  font-family: var(--font-display);
  font-size: var(--dir-texto-titulo);
  font-weight: var(--ficha-titulo-peso, 400);
  font-stretch: var(--ficha-titulo-largura, 100%);
  line-height: 1.1;
  text-transform: var(--ficha-titulo-caixa, none);
}

.ficha__cores {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  gap: var(--space-2) var(--space-4);
  font-size: var(--dir-texto-pequeno);
  line-height: 1.25;
}

.ficha__cor {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: var(--space-2);
  align-items: center;
}

.ficha__chip {
  grid-row: span 2;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--dir-raio-amostra);
}

.ficha__cor-valor {
  color: var(--color-ink-muted);
  font-variant-numeric: tabular-nums;
}

.ficha__corpo {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--space-4);
  padding: var(--space-5);
  font-family: var(--dir-fonte);
  font-size: var(--dir-texto);
  line-height: 1.5;
}

.ficha__cabecalho {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-1) var(--space-3);
}

.ficha__nome {
  font-family: var(--dir-fonte);
  font-size: var(--dir-texto-titulo);
  font-weight: 800;
  line-height: 1.2;
}

.ficha__apelido {
  color: var(--dir-tinta-suave);
}

.ficha__abrir {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  min-height: var(--target-min);
  padding-inline: var(--space-5);
  border-radius: var(--dir-raio-pilula);
  background: var(--dir-tinta);
  color: var(--dir-papel);
  font-weight: 700;
}

.ficha__secao {
  display: grid;
  gap: var(--space-2);
}

.ficha__titulo {
  font-family: var(--dir-fonte);
  font-size: var(--dir-texto);
  font-weight: 800;
}

.ficha__duplo {
  display: grid;
  gap: var(--space-4);

  @include up(md) {
    grid-template-columns: 1fr 1fr;
  }
}

.ficha__lista {
  display: grid;
  gap: var(--space-2);
  padding-left: var(--space-5);
}

.ficha__tabela {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--dir-texto-pequeno);

  th,
  td {
    padding: var(--space-2) var(--space-2) var(--space-2) 0;
    border-bottom: 1px solid var(--dir-linha);
    text-align: left;
    vertical-align: top;
  }

  thead th {
    color: var(--dir-tinta-suave);
    font-weight: 600;
  }

  tbody th {
    font-weight: 400;
  }

  td {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
}

.is-ok {
  color: var(--dir-ok);
  font-weight: 700;
}

.is-falha {
  color: var(--dir-falha);
  font-weight: 700;
}

.ficha__nota {
  color: var(--dir-tinta-suave);
  font-size: var(--dir-texto-pequeno);
}

.ficha__fontes {
  display: grid;
  gap: var(--space-1);
  font-size: var(--dir-texto-pequeno);
}

.ficha__ref {
  margin-right: var(--space-2);
  color: var(--dir-tinta-suave);
  font-variant-numeric: tabular-nums;
}

.ficha__link {
  display: inline-block;
  padding-block: var(--space-1);
  color: var(--dir-tinta);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
