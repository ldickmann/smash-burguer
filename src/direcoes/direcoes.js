// Direções visuais da exploração (só em `yarn dev`): a ordem é a do índice e do alternador.
// `esquema` vai para o color-scheme do <html> enquanto a Home da direção está aberta.
// `situacao`: a direção escolhida para o sistema (SPEC em docs/direcoes/SPEC-material.md) ou as do
// acervo de ideias de UI/UX, que ficam como mockups (decisão do usuário, 21/11/2026).
export const DIRECOES = [
  { slug: "material", nome: "Material 3 Expressive", apelido: "Alface", esquema: "light", situacao: "Escolhida para o sistema" },
  { slug: "esqueumorfismo", nome: "Esqueumorfismo", apelido: "O passe da cozinha", esquema: "light", situacao: "Acervo de ideias" },
  { slug: "neumorfismo", nome: "Neumorfismo", apelido: "Kraft prensado", esquema: "light", situacao: "Acervo de ideias" },
];

export const caminhoDirecao = (slug) => `/direcoes/${slug}`;
