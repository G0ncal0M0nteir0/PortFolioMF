import { Work } from "../types/work";

export const works: Work[] = [
  // --- BASE ---
  {
    titulo: "Ilustração X",
    descricao: "Projeto feito em Blender",
    imagem: "/images/work3.jpg",
    categoria: ["Escultura", "Pintura"],
    ferramentas: ["Affinity Designer", "Filmora"],
    data_de_criacao: "2024-09-23",
  },
  {
    titulo: "Concept Art A",
    descricao: "Exploração de personagem",
    imagem: "/images/work2.jpg",
    categoria: ["Desenho", "Design Gráfico"],
    ferramentas: ["Procreate", "Solid Works"],
    data_de_criacao: "2024-07-10",
  },
  {
    titulo: "Concept Art B",
    descricao: "Exploração de personagem",
    imagem: "/images/work2.jpg",
    categoria: ["Desenho", "Design Gráfico"],
    ferramentas: ["Procreate"],
    data_de_criacao: "2024-07-10",
  },
  {
    titulo: "Render Produto",
    descricao: "Render realista de produto",
    imagem: "/images/work3.jpg",
    categoria: ["Escultura", "Design Editorial"],
    ferramentas: ["Affinity Photo", "Blender"],
    data_de_criacao: "2024-05-02",
  },
  {
    titulo: "Logo Branding",
    descricao: "Identidade visual",
    imagem: "/images/work4.jpg",
    categoria: ["Desenho"],
    ferramentas: ["Affinity Publisher"],
    data_de_criacao: "2023-12-12",
  },
  {
    titulo: "Ilustração Infantil",
    descricao: "Estilo cartoon",
    imagem: "/images/work5.jpg",
    categoria: ["Design de Produto"],
    ferramentas: ["Procreate"],
    data_de_criacao: "2024-01-20",
  },
  {
    titulo: "Cena Sci-Fi",
    descricao: "Ambiente futurista",
    imagem: "/images/work6.jpg",
    categoria: ["Design Gráfico"],
    ferramentas: ["Blender", "Filmora"],
    data_de_criacao: "2024-03-15",
  },
  {
    titulo: "Poster Evento",
    descricao: "Design gráfico",
    imagem: "/images/work7.jpg",
    categoria: ["Design", "Fotografia"],
    ferramentas: ["Solid Works"],
    data_de_criacao: "2024-02-01",
  },

  // --- EXPANSÃO (garantindo ≥10 por categoria) ---

  // DESENHO (10+)
  ...Array.from({ length: 10 }).map((_, i) => ({
    titulo: `Sketch ${i + 1}`,
    descricao: "Exploração artística",
    imagem: "/images/work2.jpg",
    categoria: ["Desenho"],
    ferramentas: ["Procreate"],
    data_de_criacao: `2024-07-${(i + 1).toString().padStart(2, "0")}`,
  })),

  // DESIGN GRÁFICO (10+)
  ...Array.from({ length: 10 }).map((_, i) => ({
    titulo: `Arte Gráfica ${i + 1}`,
    descricao: "Composição visual",
    imagem: "/images/work6.jpg",
    categoria: ["Design Gráfico"],
    ferramentas: ["Blender", "Filmora"],
    data_de_criacao: `2024-03-${(i + 5).toString().padStart(2, "0")}`,
  })),

  // ESCULTURA (10+)
  ...Array.from({ length: 10 }).map((_, i) => ({
    titulo: `Modelo 3D ${i + 1}`,
    descricao: "Modelagem digital",
    imagem: "/images/work1.jpg",
    categoria: ["Escultura"],
    ferramentas: ["Blender"],
    data_de_criacao: `2024-05-${(i + 1).toString().padStart(2, "0")}`,
  })),

  // PINTURA (8+)
  ...Array.from({ length: 8 }).map((_, i) => ({
    titulo: `Pintura ${i + 1}`,
    descricao: "Estudo de cor",
    imagem: "/images/work1.jpg",
    categoria: ["Pintura"],
    ferramentas: ["Affinity Designer"],
    data_de_criacao: `2024-06-${(i + 1).toString().padStart(2, "0")}`,
  })),

  // PINTURA (3+)
  ...Array.from({ length: 3 }).map((_, i) => ({
    titulo: `Pintura ${i + 1}`,
    descricao: "Estudo de cor",
    imagem: "/images/work3.jpg",
    categoria: ["Pintura"],
    ferramentas: ["Affinity Designer"],
    data_de_criacao: `2024-06-${(i + 1).toString().padStart(2, "0")}`,
  })),

  // DESIGN EDITORIAL (10+)
  ...Array.from({ length: 8 }).map((_, i) => ({
    titulo: `Editorial ${i + 1}`,
    descricao: "Layout editorial",
    imagem: "/images/work6.jpg",
    categoria: ["Design Editorial"],
    ferramentas: ["Affinity Photo"],
    data_de_criacao: `2024-04-${(i + 1).toString().padStart(2, "0")}`,
  })),

  // DESIGN EDITORIAL (10+)
  ...Array.from({ length: 3 }).map((_, i) => ({
    titulo: `Editorial ${i + 1}`,
    descricao: "Layout editorial",
    imagem: "/images/work3.jpg",
    categoria: ["Design Editorial"],
    ferramentas: ["Affinity Photo"],
    data_de_criacao: `2024-04-${(i + 1).toString().padStart(2, "0")}`,
  })),

  // DESIGN DE PRODUTO (10+)
  ...Array.from({ length: 10 }).map((_, i) => ({
    titulo: `Produto ${i + 1}`,
    descricao: "Design funcional",
    imagem: "/images/work5.jpg",
    categoria: ["Design de Produto"],
    ferramentas: ["Procreate"],
    data_de_criacao: `2024-01-${(i + 10).toString().padStart(2, "0")}`,
  })),

  // DESIGN (10+)
  ...Array.from({ length: 10 }).map((_, i) => ({
    titulo: `Projeto Design ${i + 1}`,
    descricao: "Exploração criativa",
    imagem: "/images/work7.jpg",
    categoria: ["Design"],
    ferramentas: ["Solid Works"],
    data_de_criacao: `2024-02-${(i + 5).toString().padStart(2, "0")}`,
  })),

  // FOTOGRAFIA (10+)
  ...Array.from({ length: 10 }).map((_, i) => ({
    titulo: `Fotografia ${i + 1}`,
    descricao: "Captura visual",
    imagem: "/images/work7.jpg",
    categoria: ["Fotografia"],
    ferramentas: ["Filmora"],
    data_de_criacao: `2024-02-${(i + 15).toString().padStart(2, "0")}`,
  })),
];