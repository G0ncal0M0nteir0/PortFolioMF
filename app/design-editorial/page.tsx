"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import Navbar from "../../public/components/Navbar";
import { createClient } from "@/utils/supabase/client";

const garamondItalic = localFont({ src: "../fonts/EBGaramond-Italic-VariableFont_wght.ttf" });
const garamond = localFont({ src: "../fonts/EBGaramond-VariableFont_wght.ttf" });

export default function DesignEditorial() {
  const [works, setWorks] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("Work")
        .select("*")
        .contains("categoria", ["Design Editorial"])
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
            marginTop: -10,
            overflow: "hidden",
          }}
        >
          <img
            src="/images/titulo_editorial.svg"
            alt="Design Editorial"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
              transform: "scale(0.9)",
            }}
          />
        </div>

        {/* ── BOOK GRID ── */}
        <div
          style={{
            padding: "64px 64px 80px 64px",
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "40px 28px",
            boxSizing: "border-box",
          }}
        >
          {works.map((work) => (
            <div
              key={work.id}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
              onMouseEnter={(e) => {
                const img = (e.currentTarget as HTMLDivElement).querySelector(".book-cover") as HTMLImageElement;
                if (img) img.style.transform = "scale(1.03)";
                const shadow = (e.currentTarget as HTMLDivElement).querySelector(".book-shadow") as HTMLDivElement;
                if (shadow) shadow.style.opacity = "0.35";
              }}
              onMouseLeave={(e) => {
                const img = (e.currentTarget as HTMLDivElement).querySelector(".book-cover") as HTMLImageElement;
                if (img) img.style.transform = "scale(1)";
                const shadow = (e.currentTarget as HTMLDivElement).querySelector(".book-shadow") as HTMLDivElement;
                if (shadow) shadow.style.opacity = "0.15";
              }}
            >
              {/* Book cover */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "2 / 3",
                  overflow: "hidden",
                  background: "#ddd",
                  boxShadow: "4px 6px 18px rgba(0,0,0,0.18)",
                }}
              >
                <img
                  className="book-cover"
                  src={work.imagem}
                  alt={work.titulo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s ease",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "12px",
                    height: "100%",
                    background: "linear-gradient(to right, rgba(0,0,0,0.25), transparent)",
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Bottom shadow */}
              <div
                className="book-shadow"
                style={{
                  height: 6,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.12), transparent)",
                  opacity: 0.15,
                  transition: "opacity 0.3s ease",
                  marginBottom: 12,
                }}
              />

              {/* Title */}
              <p
                className={garamond.className}
                style={{
                  margin: "0 0 4px 0",
                  fontSize: 15,
                  fontWeight: 700,
                  color: "#111",
                  lineHeight: 1.3,
                }}
              >
                {work.titulo}
              </p>

              {/* Date */}
              <p
                className={garamondItalic.className}
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#888",
                  lineHeight: 1.4,
                }}
              >
                {work.data_de_criacao}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}