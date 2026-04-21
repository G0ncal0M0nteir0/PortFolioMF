"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const categorias = [
  "Pintura",
  "Escultura",
  "Desenho",
  "Design Gráfico",
  "Design Editorial",
  "Design de Produto",
  "Fotografia",
];

// Maps each category to its route
const categoriaRoutes: Record<string, string> = {
  "Pintura": "/pintura",
  "Escultura": "/escultura",
  "Desenho": "/desenho",
  "Design Gráfico": "/design-grafico",
  "Design Editorial": "/design-editorial",
  "Design de Produto": "/design-produto",
  "Fotografia": "/fotografia",
};

interface NavbarProps {
  onCategoriaSelect?: (index: number) => void;
}

export default function Navbar({ onCategoriaSelect }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 flex items-center px-8 py-2"
      style={{
        background: "#ffffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <ul className="flex" style={{ gap: 100, listStyle: "none", margin: 0, padding: 0 }}>

        {/* Sobre mim */}
        <li>
          <a
            href="#"
            className="text-sm font-medium tracking-wide uppercase"
            style={{
              color: "#111111",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Sobre mim
          </a>
        </li>

        {/* Trabalhos — with dropdown */}
        <li
          style={{ position: "relative" }}
          onMouseEnter={() => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            setDropdownOpen(true);
          }}
          onMouseLeave={() => {
            closeTimer.current = setTimeout(() => setDropdownOpen(false), 200);
          }}
        >
          <a
            href="#"
            className="text-sm font-medium tracking-wide uppercase"
            style={{
              color: "#111111",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Trabalhos
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              style={{
                transition: "transform 0.2s ease",
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="M1 3l4 4 4-4" stroke="#111" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </a>

          {/* Dropdown menu */}
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 12px)",
              left: 0,
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(8px)",
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              padding: "8px 0",
              minWidth: 180,
              opacity: dropdownOpen ? 1 : 0,
              pointerEvents: dropdownOpen ? "auto" : "none",
              transform: dropdownOpen ? "translateY(0px)" : "translateY(-8px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              zIndex: 100,
            }}
            onMouseEnter={() => {
              if (closeTimer.current) clearTimeout(closeTimer.current);
              setDropdownOpen(true);
            }}
            onMouseLeave={() => {
              closeTimer.current = setTimeout(() => setDropdownOpen(false), 200);
            }}
          >
            {categorias.map((cat, i) => (
              <a
                key={cat}
                href={categoriaRoutes[cat]}
                style={{
                  display: "block",
                  padding: "8px 20px",
                  color: "#111",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                  transition: "background 0.15s ease, padding-left 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                  e.currentTarget.style.paddingLeft = "28px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.paddingLeft = "20px";
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onCategoriaSelect?.(i);
                  setDropdownOpen(false);
                  router.push(categoriaRoutes[cat]);
                }}
              >
                {cat}
              </a>
            ))}
          </div>
        </li>

        {/* Contactos */}
        <li>
          <a
            href="#"
            className="text-sm font-medium tracking-wide uppercase"
            style={{
              color: "#111111",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Contactos
          </a>
        </li>
      </ul>
    </nav>
  );
}