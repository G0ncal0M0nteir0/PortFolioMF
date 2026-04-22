"use client";

import localFont from "next/font/local";
import { useState } from "react";
import Navbar from "../../public/components/Navbar";

const garamondItalic = localFont({ src: "../fonts/EBGaramond-Italic-VariableFont_wght.ttf" });
const garamond = localFont({ src: "../fonts/EBGaramond-VariableFont_wght.ttf" });

const pinturaWorks = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  titulo: "Titulo",
  data: "16/04/2026",
  imagem: `/images/work${(i % 5) + 1}.jpg`,
}));

export default function Pintura() {
  const [wideMap, setWideMap] = useState<Record<number, boolean>>({});

  const sortedWorks = [...pinturaWorks].sort((a, b) => {
  const aWide = wideMap[a.id];
  const bWide = wideMap[b.id];

  if (aWide === undefined || bWide === undefined) return 0;

    return (bWide ? 1 : 0) - (aWide ? 1 : 0);
  });
  const handleImageLoad = (id: number, e: React.SyntheticEvent<HTMLImageElement>) => {
  const img = e.currentTarget;
  const ratio = img.naturalWidth / img.naturalHeight;

  console.log(`Image ${id}: ratio = ${ratio}`);

  const isWide = ratio >= 1.2;
  setWideMap((prev) => ({ ...prev, [id]: isWide }));
};

  return (
    <>
      <Navbar onCategoriaSelect={() => {}} />

      <main
        style={{
          background: "#f5f2ed",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* ── FULLSCREEN HERO ── */}
        <div
          style={{
            width: "100%",
            height: "100vh",
            paddingTop: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="/images/pintura.svg"
            alt="Pintura"
            style={{
              width: "130%",
              height: "160%",
              objectFit: "contain",
              objectPosition: "top",
            }}
          />
        </div>

        {/* ── GRID WRAPPER ── */}
        <div style={{ padding: "0 48px 80px 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              border: "2px solid #111",
            }}
          >
            {sortedWorks.map((work) => {
              const isWide = wideMap[work.id] ?? false;
              return (
                <div
                  key={work.id}
                  style={{
                    gridColumn: isWide ? "span 2" : "span 1",
                    cursor: "pointer",
                    position: "relative",
                    borderRight: "2px solid #111",
                    borderBottom: "2px solid #111",
                  }}
                >
                  {/* Title above image */}
                  <p
                    className={garamondItalic.className}
                    style={{
                      margin: 0,
                      padding: "6px 10px 0px 10px",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#111",
                      textAlign: "center",
                    }}
                  >
                    {work.titulo}
                  </p>

                  {/* Image wrapper */}
                  <div
                    style={{
                      margin: "12px 30px 4px 30px",
                      aspectRatio: isWide ? "10 / 6" : "5 / 6",
                      overflow: "hidden",
                      background: "#f5f2ed",
                      position: "relative",
                    }}
                  >
                    <img
                      src={work.imagem}
                      alt={work.titulo}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                      onLoad={(e) => handleImageLoad(work.id, e)}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Date below image */}
                  <p
                    className={garamond.className}
                    style={{
                      margin: 0,
                      padding: "10px 5px",
                      fontSize: 14,
                      color: "#111",
                      textAlign: "center",
                    }}
                  >
                    {work.data}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}