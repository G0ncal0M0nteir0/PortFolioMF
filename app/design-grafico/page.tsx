"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import Navbar from "../../public/components/Navbar";
import { createClient } from "@/utils/supabase/client";

const garamondItalic = localFont({ src: "../fonts/EBGaramond-Italic-VariableFont_wght.ttf" });

export default function DesignGrafico() {
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("Work")
        .select("*")
        .contains("categoria", ["Design Gráfico"])
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setWorks(data ?? []);
    };
    fetch();
  }, []);

  // Split works into 4 columns like Pinterest does
  const columns: any[][] = [[], [], [], []];
  works.forEach((work, i) => {
    columns[i % 4].push(work);
  });

  const getAspectRatio = (i: number) => {
    const ratios = ["3 / 4", "4 / 5", "1 / 1"];
    return ratios[i % 3];
  };

  return (
    <>
      <Navbar onCategoriaSelect={() => {}} />

      <main
        style={{
          background: "#1a1a1a",
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        {/* ── FULLSCREEN HERO ── */}
        <div
          style={{
            width: "100%",
            height: "100vh",
            marginTop: -10,
            overflow: "hidden",
          }}
        >
          <img
            src="/images/design_grafico.svg"
            alt="Design Gráfico"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {/* ── PINTEREST MASONRY ── */}
        <div
          style={{
            padding: "48px 48px 80px 48px",
            display: "flex",
            gap: 16,
            boxSizing: "border-box",
            alignItems: "flex-start",
          }}
        >
          {columns.map((col, colIndex) => (
            <div
              key={colIndex}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              {col.map((work, i) => (
                <div
                  key={work.id}
                  style={{
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1.02)";
                    el.style.transition = "transform 0.25s ease";
                    const overlay = el.querySelector(".overlay") as HTMLDivElement;
                    if (overlay) overlay.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.transform = "scale(1)";
                    const overlay = el.querySelector(".overlay") as HTMLDivElement;
                    if (overlay) overlay.style.opacity = "0";
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: getAspectRatio(i),
                      overflow: "hidden",
                      background: "#ccc",
                      borderRadius: 16,
                      position: "relative",
                    }}
                  >
                    <img
                      src={work.imagem}
                      alt={work.titulo}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />

                    <div
                      className="overlay"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
                        opacity: 0,
                        transition: "opacity 0.25s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "14px 12px",
                        borderRadius: 16,
                      }}
                    >
                      <p
                        className={garamondItalic.className}
                        style={{ margin: 0, fontSize: 14, color: "#fff" }}
                      >
                        {work.data_de_criacao}
                      </p>
                    </div>
                  </div>

                  <p
                    className={garamondItalic.className}
                    style={{
                      margin: "6px 4px 0 4px",
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#ffffff",
                    }}
                  >
                    {work.titulo}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}