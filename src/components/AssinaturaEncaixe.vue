<!--
  Assinatura de autoria · estilo Encaixe: o traço se divide em d, L e K; as três peças chegam de lados diferentes e se encaixam.
  Uso: <AssinaturaEncaixe tom="escuro" /> logo depois do rodapé, fora de contêineres com largura máxima.
  Vue 3 (ou 2.7). Sem dependências; o movimento é só CSS.
  Não edite o path do monograma (lib/marca.ts), o texto, o link nem o CSS.
-->
<script setup>
defineProps({
  /** 'claro' sob rodapé claro; 'escuro' sob rodapé escuro ou colorido. */
  tom: {
    type: String,
    default: 'claro',
    validator: (valor) => valor === 'claro' || valor === 'escuro',
  },
})
</script>

<template>
  <div class="ldk-encaixe" :data-tom="tom">
    <a class="ldk-encaixe__l" href="https://github.com/ldickmann" target="_blank" rel="noopener nofollow">
      <svg class="ldk-encaixe__m" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <path class="ldk-encaixe__i" d="M21 7 V45 a9 12 0 0 1 -18 0 a9 12 0 0 1 18 0 V57 H43 V7 V31 L61 8 L43 31 L61 57" pathLength="100"/>
        <path class="ldk-encaixe__p ldk-encaixe__d" d="M21 7 V45 a9 12 0 0 1 -18 0 a9 12 0 0 1 18 0 V57 H43 V7 V31 L61 8 L43 31 L61 57" pathLength="100"/>
        <path class="ldk-encaixe__p ldk-encaixe__e" d="M21 7 V45 a9 12 0 0 1 -18 0 a9 12 0 0 1 18 0 V57 H43 V7 V31 L61 8 L43 31 L61 57" pathLength="100"/>
        <path class="ldk-encaixe__p ldk-encaixe__k" d="M21 7 V45 a9 12 0 0 1 -18 0 a9 12 0 0 1 18 0 V57 H43 V7 V31 L61 8 L43 31 L61 57" pathLength="100"/>
      </svg>
      <span>Desenvolvimento por <b>Lucas E. Dickmann</b></span><span class="ldk-encaixe__sr"> (abre em nova aba)</span>
    </a>
  </div>
</template>

<!-- Global de propósito (sem scoped): as classes ldk-* já são exclusivas da assinatura. -->
<style>
.ldk-encaixe,.ldk-encaixe *{box-sizing:border-box;margin:0;padding:0;border:0}
.ldk-encaixe{--ldk-encaixe-bg:#E6ECF4;--ldk-encaixe-fg:#14213D;--ldk-encaixe-ac:#1E4FD6;--ldk-encaixe-t:.55s;display:flex;justify-content:center;width:100%;height:40px;background:var(--ldk-encaixe-bg);color:var(--ldk-encaixe-fg);box-shadow:inset 0 1px 0 var(--ldk-encaixe-ac);font:400 13px/1 system-ui,-apple-system,"Segoe UI",Roboto,Ubuntu,sans-serif}
.ldk-encaixe[data-tom=escuro]{--ldk-encaixe-bg:#0F1B33;--ldk-encaixe-fg:#E8EEF8;--ldk-encaixe-ac:#8DB4FF}
.ldk-encaixe__l{position:relative;display:inline-flex;align-items:center;gap:10px;height:40px;padding:0 12px;color:inherit;text-decoration:none;white-space:nowrap;outline:0;border-radius:3px;-webkit-tap-highlight-color:transparent}
.ldk-encaixe__l b{font-weight:700}
.ldk-encaixe__l:focus-visible{outline:2px solid var(--ldk-encaixe-ac);outline-offset:-5px}
.ldk-encaixe__l:active{--ldk-encaixe-t:.26s}
.ldk-encaixe__m{display:block;flex:none;width:22px;height:22px;overflow:visible;color:var(--ldk-encaixe-ac)}
.ldk-encaixe__m path{fill:none;stroke:currentColor;stroke-width:5.5;stroke-linecap:round;stroke-linejoin:round}
/* Peças: trechos do mesmo traço, isolados por dasharray (pathLength=100). Ocultas em repouso. */
.ldk-encaixe__p{opacity:0}
.ldk-encaixe__d{stroke-dasharray:34.5 65.5;stroke-dashoffset:0;--x:-9px;--y:0}
.ldk-encaixe__e{stroke-dasharray:11.25 88.75;stroke-dashoffset:-34.5;--x:0;--y:9px}
.ldk-encaixe__k{stroke-dasharray:54.25 45.75;stroke-dashoffset:-45.75;--x:9px;--y:0}
.ldk-encaixe__sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@media (hover:hover){
  .ldk-encaixe__l:hover .ldk-encaixe__i{animation:ldk-encaixe-inteiro var(--ldk-encaixe-t) linear}
  .ldk-encaixe__l:hover .ldk-encaixe__p{animation:ldk-encaixe-encaixa var(--ldk-encaixe-t)}
}
.ldk-encaixe__l:is(:focus-visible,:active) .ldk-encaixe__i{animation:ldk-encaixe-inteiro var(--ldk-encaixe-t) linear}
.ldk-encaixe__l:is(:focus-visible,:active) .ldk-encaixe__p{animation:ldk-encaixe-encaixa var(--ldk-encaixe-t)}
@keyframes ldk-encaixe-inteiro{0%,94%{opacity:0}100%{opacity:1}}
@keyframes ldk-encaixe-encaixa{
  0%{opacity:0;transform:translate(var(--x),var(--y));animation-timing-function:cubic-bezier(.2,.8,.3,1.3)}
  28%{opacity:1}
  72%{transform:translate(0,0)}
  94%{opacity:1;transform:translate(0,0)}
  100%{opacity:0}
}
@media (prefers-reduced-motion:reduce){.ldk-encaixe *{animation:none!important;transition:none!important}}
</style>
