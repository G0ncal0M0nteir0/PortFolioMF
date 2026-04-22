"use client";

import localFont from "next/font/local";
import { useState } from "react";
import Navbar from "../../public/components/Navbar";

const garamondItalic = localFont({
  src: "../fonts/EBGaramond-Italic-VariableFont_wght.ttf",
});
const garamond = localFont({
  src: "../fonts/EBGaramond-VariableFont_wght.ttf",
});

const pinturaWorks = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  titulo: "Titulo",
  data: "16/04/2026",
  imagem: `/images/work${(i % 5) + 1}.jpg`,
}));

export default function Pintura() {
  const [wideMap, setWideMap] = useState<Record<number, boolean>>({});

  const handleImageLoad = (
    id: number,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;

    const isWide = ratio >= 1.2;

    setWideMap((prev) => ({
      ...prev,
      [id]: isWide,
    }));
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
        {/* ── HERO ── */}
        <div
          style={{
            width: "100%",
            height: "100vh",
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
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {/* ── GRID ── */}
        <div style={{ padding: "0 48px 80px 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoFlow: "dense",
              gap: 0,
              border: "2px solid #111",
            }}
          >
            {pinturaWorks.map((work) => {
              const isWide = wideMap[work.id] ?? false;

              return (
                <div
                  key={work.id}
                  style={{
                    gridColumn: isWide ? "span 2" : "span 1",
                    border: "2px solid #111",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    background: "#f5f2ed",
                  }}
                >
                  {/* TITLE */}
                  <p
                    className={garamondItalic.className}
                    style={{
                      margin: 0,
                      padding: "10px 10px 0 10px",
                      fontSize: 18,
                      fontWeight: 700,
                      textAlign: "center",
                      color: "#111",
                    }}
                  >
                    {work.titulo}
                  </p>

                  {/* IMAGE */}
                  <div
                    style={{
                      margin: "12px",
                      aspectRatio: isWide ? "10 / 6" : "5 / 6",
                      overflow: "hidden",
                      background: "#f5f2ed",
                    }}
                  >
                    <img
                      src={work.imagem}
                      alt={work.titulo}
                      onLoad={(e) => handleImageLoad(work.id, e)}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* DATE */}
                  <p
                    className={garamond.className}
                    style={{
                      margin: 0,
                      padding: "0 10px 10px 10px",
                      fontSize: 14,
                      textAlign: "center",
                      color: "#111",
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