export const dynamic = "force-dynamic";

import Navbar from "../../public/components/Navbar";
import { createClient } from "@/utils/supabase/server";

export default async function TrabalhosPage() {
  const supabase = await createClient();
  const { data: works, error } = await supabase
    .from("Work")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) console.error(error);

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80, minHeight: "100vh", background: "#fff" }}>
        <h1
          style={{
            textAlign: "center",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 40,
            letterSpacing: "0.1em",
          }}
        >
          Trabalhos
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 32px",
          }}
        >
          {works?.map((work, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                background: "#fff",
              }}
            >
              <img
                src={work.imagem}
                alt={work.titulo}
                style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
              />
              <div style={{ padding: 16 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 8px" }}>
                  {work.titulo}
                </h2>
                <p style={{ color: "#666", fontSize: 14, margin: "0 0 8px" }}>
                  {work.descricao}
                </p>
                <p style={{ fontSize: 12, color: "#999", margin: "0 0 4px" }}>
                  {work.categoria.join(", ")}
                </p>
                <p style={{ fontSize: 12, color: "#bbb", margin: "0 0 4px" }}>
                  {work.ferramentas.join(", ")}
                </p>
                <p style={{ fontSize: 11, color: "#ccc", margin: 0 }}>
                  {work.data_de_criacao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}