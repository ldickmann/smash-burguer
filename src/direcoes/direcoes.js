// Direções visuais da exploração (só em `yarn dev`): a ordem é a do índice e do alternador.
// `esquema` vai para o color-scheme do <html> enquanto a Home da direção está aberta.
export const DIRECOES = [
  { slug: "brasa", nome: "Brasa", apelido: "Linha de base", esquema: "dark" },
  { slug: "material", nome: "Material 3 Expressive", apelido: "Alface", esquema: "light" },
  { slug: "esqueumorfismo", nome: "Esqueumorfismo", apelido: "O passe da cozinha", esquema: "light" },
  { slug: "neumorfismo", nome: "Neumorfismo", apelido: "Kraft prensado", esquema: "light" },
  { slug: "3d", nome: "3D e gradientes suaves", apelido: "Camadas", esquema: "light" },
  { slug: "flat", nome: "Flat", apelido: "Ladrilhos", esquema: "light" },
  { slug: "minimalismo", nome: "Minimalismo", apelido: "Só o que importa", esquema: "light" },
];

export const caminhoDirecao = (slug) => `/direcoes/${slug}`;
