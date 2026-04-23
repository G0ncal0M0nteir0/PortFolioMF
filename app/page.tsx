"use client";

import { useEffect, useRef, useState } from "react";
import localFont from "next/font/local";
import { works } from "./data/works";
import { Work } from "./types/work";
import Navbar from "../public/components/Navbar";

const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
const sloop = localFont({ src: "./fonts/Sloop-ScriptThree.ttf" });
const garamondItalic = localFont({ src: "./fonts/EBGaramond-Italic-VariableFont_wght.ttf" });
const garamond = localFont({ src: "./fonts/EBGaramond-VariableFont_wght.ttf" });
const chelseaMarket = localFont({ src: "./fonts/ChelseaMarket-Regular.ttf" });

const imageList = [
  "/images/square_image1.jpg",
  "/images/square_image2.jpg",
  "/images/square_image3.jpg",
];

const toolNames = [
  "Minhas habilidades",
  "Affinity Photo",
  "Procreate",
  "Affinity Publisher",
  "Solid Works",
  "Affinity Designer",
  "Filmora",
  "Blender",
];

const toolDescriptions = [
  "Criatividade \nGosto de explorar diferentes ideias e abordagens visuais. Atenção ao detalhe Tenho atenção ao detalhe e procuro ser cuidadoso no trabalho. Experimentação. \nGosto de experimentar, testar e ir evoluindo ao longo do processo. Pensamento espacial. \nTenho facilidade em compreender o volume e o espaço, sobretudo através da escultura e do 3D.",
  "No Affinity Photo trabalho a imagem como um processo de construção, onde cada ajuste contribui para o resultado final. É uma ferramenta essencial na edição e tratamento das minhas imagens, permitindo-me trabalhar a harmonia de cores e a coerência visual. Tem um papel importante não só na fotografia, mas também no complemento de projetos de design gráfico, produto e editorial, garantindo consistência entre diferentes áreas do meu trabalho.",
  "No Procreate encontro uma abordagem mais direta ao desenho, próxima do gesto manual. Foi uma das primeiras aplicações que me ligou à arte no meio digital e que me levou a explorar não só a prática artística, mas também outras áreas como o design. É um espaço onde desenvolvo esboços para pinturas, projetos de design ou mesmo o próprio desenho em si, funcionando como uma base de experimentação. Paralelamente, é também onde procuro aprofundar as minhas competências em arte digital e explorar a animação 2D.",
  "O Affinity Publisher surge no meu processo como uma ferramenta de organização e estrutura. É onde consigo dar forma ao conteúdo, equilibrando texto e imagem de maneira clara, sem perder a componente visual. Tem um papel importante no meu trabalho editorial, complementando os meus projetos sobre tudo produto mas também gráfico. Funciona como uma extensão dos próprios projetos, ajudando a traduzir e estruturar as ideias de forma mais completa.",
  "No SolidWorks foco-me numa abordagem mais técnica e precisa, onde a construção e o detalhe são essenciais. É uma ferramenta particularmente útil para o desenvolvimento de objetos mais rigorosos e funcionais, bem como para o meu trabalho de design de produto. Permite-me estruturar ideias de forma clara e concreta, afastando-me de abordagens mais abstratas. Ao mesmo tempo, é um software complexo, com muito ainda por explorar, que considero bastante interessante precisamente pelo seu potencial na conceção de objetos.",
  "Uso o Affinity Designer como uma extensão do meu processo criativo, onde consigo desenvolver ideias de forma estruturada, explorando a componente vetorial, muito importante para a parte gráfica e que complementa bastante o meu trabalho noutras áreas. É uma ferramenta que me permite trabalhar com precisão, mas também experimentar diferentes composições e linguagens visuais, à procura de um certo equilíbrio.",
  "Com o Filmora, exploro o vídeo como outra forma de expressão da minha linguagem visual. Tal como na fotografia, mantenho a exploração da cor, mas acrescento narrativa e aprofundo o movimento, entre outros elementos. Interessa-me a forma como o vídeo, sendo um meio mais comunicativo, consegue envolver-me e prender-me, ao mesmo tempo que exige uma construção mais complexa e intencional.",
  "O Blender funciona como um complemento às minhas criações em 3D, permitindo-me dar forma e expandir ideias para as tornar mais próximas do real. É uma ferramenta complexa, com inúmeras possibilidades ainda por explorar, que me desafia constantemente a aprofundar esta vertente do 3D. Este sotware levou-me a experimentar novas abordagens, a desenvolver uma maior compreensão do espaço digital e a descobrir outras áreas dentro da prática 3D que considero cada vez mais relevantes para a evolução do meu trabalho.",
];

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedToolIndex, setSelectedToolIndex] = useState<number>(0);

  const transitionHeight = 1500;

  const [panelImages, setPanelImages] = useState([0, 1, 2]);
  const [panelScales, setPanelScales] = useState([1, 1, 1]);

  const switchPanelImage = (panelIndex: number) => {
    setPanelScales((prev) => {
      const next = [...prev];
      next[panelIndex] = 0.6;
      return next;
    });

    setTimeout(() => {
      setPanelImages((prev) => {
        const next = [...prev];
        next[panelIndex] = (prev[panelIndex] + 1) % imageList.length;
        return next;
      });
      setPanelScales((prev) => {
        const next = [...prev];
        next[panelIndex] = 1;
        return next;
      });
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let progress = Math.min(scrollY / transitionHeight, 1);
      progress = easeOutQuad(progress);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getProjectImageForTool = (toolIndex: number): string => {
    const toolName = toolNames[toolIndex];
    const match = works.find((w) => w.ferramentas.includes(toolName));
    return match?.imagem ?? "/images/work1.jpg";
  };

  const selectedToolName = toolNames[selectedToolIndex];
  const projectImage = getProjectImageForTool(selectedToolIndex);

  return (
    <>
      <Navbar onCategoriaSelect={() => {}} />

      {/* STICKY HERO */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden"
        style={{ zIndex: 0, marginTop: 0 }}
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            opacity: 1 - scrollProgress,
            transform: "scale(1.2)",
          }}
          autoPlay loop muted playsInline
        >
          <source src="/videos/videox.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-white" style={{ opacity: scrollProgress }} />

        <h1
          className={`${sloop.className} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center z-10 pointer-events-none`}
          style={{
            fontSize: `${200 + scrollProgress * 200}px`,
            opacity: 1 - scrollProgress,
          }}
        >
          Portfolio
        </h1>
      </div>

      {/* SCROLL SPACER */}
      <div style={{ height: `${transitionHeight}px` }} />

      {/* FERRAMENTAS SECTION */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "#ffffff",
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 32px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#111",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}
        >
          Ferramentas
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            width: "100%",
            maxWidth: 1200,
            boxSizing: "border-box",
          }}
        >
          {/* TOP ROW */}
          <div style={{ display: "flex", gap: 16, height: 500 }}>

            {/* LEFT: project image */}
            <div
              style={{
                flex: "0 0 50%",
                borderRadius: 16,
                overflow: "hidden",
                background: "#eee",
                boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                key={projectImage}
                src={projectImage}
                alt="Projeto"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  animation: "fadeIn 0.3s ease",
                }}
              />
            </div>

            {/* RIGHT: big icon + name + description */}
            <div
              style={{
                flex: "0 0 calc(50% - 16px)",
                padding: "37px 37px 37px 37px",
                borderRadius: 16,
                background: "#1a1a1a",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                gap: 24,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
              }}
            >
              <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
                <img
                  key={selectedToolIndex}
                  src={`/images/icon${selectedToolIndex + 1}.svg`}
                  alt={selectedToolName}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                    animation: "popIn 0.25s ease",
                  }}
                />
                <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3
                    className={garamond.className}
                    style={{ color: "#ffffff", fontSize: 26, fontWeight: 700, margin: 0 }}
                  >
                    {selectedToolName}
                  </h3>
                  <p
                    className={garamondItalic.className}
                    style={{ color: "#aaa", fontSize: 16, lineHeight: 1.8, margin: 0 }}
                  >
                    {toolDescriptions[selectedToolIndex]}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM ROW: tool icon selector */}
          <div
            style={{
              borderRadius: 16,
              background: "#1a1a1a",
              padding: "16px 24px",
              display: "flex",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
            }}
          >
            {toolNames.map((tool, i) => {
              const isActive = selectedToolIndex === i;
              return (
                <button
                  key={tool}
                  onClick={() => setSelectedToolIndex(i)}
                  title={tool}
                  style={{
                    background: isActive ? "rgba(255,255,255,0.12)" : "none",
                    border: isActive ? "1px solid rgba(255,255,255,0.25)" : "1px solid transparent",
                    cursor: "pointer",
                    padding: 6,
                    borderRadius: 10,
                    outline: "none",
                    transition: "transform 0.2s ease, background 0.2s ease, border 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2) translateY(-6px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1) translateY(0px)")}
                >
                  <img
                    src={`/images/icon${i + 1}.svg`}
                    alt={tool}
                    style={{
                      width: 52,
                      height: 52,
                      objectFit: "contain",
                      display: "block",
                      opacity: !isActive ? 0.4 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ABOUT / PHOTO SECTION */}
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
          background: "#ffffff",
        }}
      >
        {/* BACKGROUND PHOTO — fills the full section */}
        <img
          src="/images/eu_foto.png"
          alt="Eu"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            zIndex: 0,
          }}
        />

        {/* PANELS — keep as before but now inside the full-width div */}
        {/* PANEL 1 */}
        <div
          onClick={() => switchPanelImage(0)}
          title="Clique para trocar imagem"
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: "9%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <img
            src={imageList[panelImages[0]]}
            alt="Panel 1"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: `scale(${panelScales[0]})`, transition: "transform 0.2s ease" }}
          />
        </div>

        {/* PANEL 2 */}
        <div
          onClick={() => switchPanelImage(1)}
          title="Clique para trocar imagem"
          style={{
            position: "absolute",
            top: "22%",
            left: "21%",
            width: "8%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <img
            src={imageList[panelImages[1]]}
            alt="Panel 2"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: `scale(${panelScales[1]})`, transition: "transform 0.2s ease" }}
          />
        </div>

        {/* PANEL 3 */}
        <div
          onClick={() => switchPanelImage(2)}
          title="Clique para trocar imagem"
          style={{
            position: "absolute",
            top: "40%",
            left: "12%",
            width: "7%",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <img
            src={imageList[panelImages[2]]}
            alt="Panel 3"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: `scale(${panelScales[2]})`, transition: "transform 0.2s ease" }}
          />
        </div>

        {/* PANELS OVERLAY */}
        <img
          src="/images/panels.png"
          alt="Panels"
          style={{
            position: "absolute",
            top: "0%",
            left: "25%",
            transform: "translateX(-65%) translateY(25%)",
            width: "35%",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* TEXT — sits on top of the photo, right side */}
        <div
          style={{
            position: "relative",
            zIndex: 4,
            width: "50%",
            minHeight: "100vh",
            marginLeft: "50%",          // push to the right half — adjust this
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 64px",
            boxSizing: "border-box",
          }}
        >
          <h2
            className={chelseaMarket.className}
            style={{ fontSize: 48, fontWeight: 700, color: "#111", margin: "0 0 32px 0" }}
          >
            Sobre mim
          </h2>

          <p className={garamondItalic.className} style={{ fontSize: 20, lineHeight: 1.9, color: "#333", margin: "0 0 24px 0" }}>
            Sou licenciado em Design pela Universidade de Aveiro, nascido em 2003,
            com um interesse genuíno por criar, desenvolver ideias e transformar conceitos em algo real.
          </p>

          <p className={garamondItalic.className} style={{ fontSize: 20, lineHeight: 1.9, color: "#333", margin: "0 0 24px 0" }}>
            O meu percurso tem passado por várias linguagens visuais — gosto de explorar materiais,
            experimentar diferentes formas de expressar a arte e encontrar soluções que cruzem estética
            com propósito. Desde a infância que a minha forma de fazer arte foi evoluindo, mas o gosto
            por criar com as mãos sempre ficou. Sou alguém que gosta de experimentar, construir e ver as ideias a acontecer.
          </p>

          <p className={garamondItalic.className} style={{ fontSize: 20, lineHeight: 1.9, color: "#333", margin: "0 0 40px 0" }}>
            Acredito que o verdadeiro crescimento acontece quando deixamos que a experiência nos transforme,
            em vez de apenas repetirmos aquilo que já sabemos.
          </p>

          <p
            className={garamondItalic.className}
            style={{ fontSize: 22, lineHeight: 1.7, color: "#09134c", fontStyle: "italic", textAlign: "right", margin: 0 }}
          >
            "Aprende com o que vives, não vivas com o que aprendes."
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}