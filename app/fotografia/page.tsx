"use client";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import Navbar from "../../public/components/Navbar";
import { createClient } from "@/utils/supabase/client";

const garamondItalic = localFont({ src: "../fonts/EBGaramond-Italic-VariableFont_wght.ttf" });
const garamond = localFont({ src: "../fonts/EBGaramond-VariableFont_wght.ttf" });

export default function Fotografia() {
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("Work")
        .select("*")
        .contains("categoria", ["Fotografia"])
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setWorks(data ?? []);
    };
    fetch();
  }, []);

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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src="/images/titulo_fotografia.svg"
            alt="Fotografia"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {/* ── GRID ── */}
        <div
          style={{
            padding: "48px 48px 80px 48px",
            columnCount: 5,
            columnGap: 20,
            columnFill: "balance",
          }}
        >
          {works.map((work) => (
            <div
              key={work.id}
              style={{
                breakInside: "avoid",
                marginBottom: 20,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.02)";
                (e.currentTarget as HTMLDivElement).style.transition = "transform 0.2s ease";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
              }}
            >
              <div
                style={{
                  border: "2.5px solid #111",
                  background: "#fff",
                  padding: "20px 20px 26px 20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "6 / 6",
                    background: "#111",
                    overflow: "hidden",
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
                </div>

                <div style={{ marginTop: 8, paddingLeft: 2 }}>
                  <p
                    className={garamondItalic.className}
                    style={{
                      margin: 0,
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#111",
                    }}
                  >
                    {work.titulo}
                  </p>
                  <p
                    className={garamond.className}
                    style={{
                      margin: 0,
                      fontSize: 15,
                      color: "#666",
                      textAlign: "right",
                      marginTop: 2,
                    }}
                  >
                    {work.data_de_criacao}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}