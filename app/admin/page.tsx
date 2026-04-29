"use client";

import { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";

const allTools = [
  "Affinity Photo",
  "Procreate",
  "Affinity Publisher",
  "Solid Works",
  "Affinity Designer",
  "Filmora",
  "Blender",
];

const allCategories = [
  "Pintura",
  "Escultura",
  "Desenho",
  "Design Gráfico",
  "Design Editorial",
  "Design de Produto",
  "Fotografia",
];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState<string[]>([]);
  const [ferramentas, setFerramentas] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    val: string
  ) => {
    setList(
      list.includes(val) ? list.filter((x) => x !== val) : [...list, val]
    );
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setMessage("⚠️ O ficheiro deve ser uma imagem.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage("");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { error } = await supabase.storage
      .from("works-images")
      .upload(fileName, file, { upsert: false });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage
      .from("works-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async () => {
    if (
      !titulo ||
      !descricao ||
      !imageFile ||
      categoria.length === 0 ||
      ferramentas.length === 0
    ) {
      setMessage("⚠️ Preenche todos os campos e adiciona uma imagem.");
      return;
    }

    setLoading(true);
    setMessage("");

    let imageUrl = "";
    try {
      imageUrl = await uploadImage(imageFile);
    } catch (err) {
      setLoading(false);
      setMessage(`❌ Erro ao fazer upload da imagem: ${err instanceof Error ? err.message : String(err)}`);
      return;
    }

    const res = await fetch("/api/works", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password,
        titulo,
        descricao,
        imagem: imageUrl,
        categoria,
        ferramentas,
      }),
    });

    setLoading(false);

    if (res.ok) {
      setMessage("✅ Trabalho adicionado com sucesso!");
      setTitulo("");
      setDescricao("");
      setCategoria([]);
      setFerramentas([]);
      setPassword("");
      setImageFile(null);
      setImagePreview(null);
    } else if (res.status === 401) {
      setMessage("❌ Senha incorreta.");
    } else {
      setMessage("❌ Ocorreu um erro. Tenta novamente.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          background: "#dbd6d6",
          borderRadius: 24,
          padding: "48px 48px",
          boxShadow: "0 4px 32px rgba(0,0,0,0.07)",
        }}
      >
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 6, color: "#111" }}>
          Admin
        </h1>
        <p style={{ color: "#888", marginBottom: 36, fontSize: 14 }}>
          Adicionar novo trabalho ao portfolio.
        </p>

        <label style={labelStyle}>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          placeholder="••••••••"
        />

        <label style={labelStyle}>Título</label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={inputStyle}
          placeholder="Ex: Poster Tipográfico"
        />

        <label style={labelStyle}>Descrição</label>
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ ...inputStyle, height: 100, resize: "vertical" }}
          placeholder="Breve descrição do trabalho..."
        />

        <label style={labelStyle}>Imagem</label>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${isDragging ? "#555" : "#ccc"}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 24,
            textAlign: "center",
            cursor: "pointer",
            background: isDragging ? "#ebebeb" : "#ffffff",
            transition: "all 0.2s ease",
            minHeight: 160,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            style={{ display: "none" }}
          />
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxHeight: 200,
                  maxWidth: "100%",
                  borderRadius: 8,
                  objectFit: "contain",
                }}
              />
              <p style={{ fontSize: 12, color: "#999", margin: 0 }}>
                Clica ou arrasta para substituir
              </p>
            </>
          ) : (
            <>
              <div style={{ fontSize: 36 }}>🖼️</div>
              <p style={{ fontSize: 14, color: "#666", margin: 0 }}>
                Arrasta uma imagem para aqui
              </p>
              <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
                ou clica para escolher ficheiro
              </p>
            </>
          )}
        </div>

        <label style={labelStyle}>Categorias</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggle(categoria, setCategoria, cat)}
              style={tagStyle(categoria.includes(cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        <label style={labelStyle}>Ferramentas</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
          {allTools.map((tool) => (
            <button
              key={tool}
              onClick={() => toggle(ferramentas, setFerramentas, tool)}
              style={tagStyle(ferramentas.includes(tool))}
            >
              {tool}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 0",
            background: loading ? "#999" : "#111",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s ease",
          }}
        >
          {loading ? "A guardar..." : "Adicionar Trabalho"}
        </button>

        {message && (
          <p style={{ marginTop: 20, textAlign: "center", fontSize: 15 }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#555",
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  marginBottom: 20,
  padding: "10px 14px",
  fontSize: 15,
  borderRadius: 8,
  border: "1px solid #e0e0e0",
  boxSizing: "border-box",
  outline: "none",
  background: "#ffffff",
  color: "#111",
};

const tagStyle = (active: boolean): React.CSSProperties => ({
  padding: "7px 16px",
  borderRadius: 20,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  background: active ? "#111" : "#e4e4e4",
  color: active ? "#fff" : "#333",
  border: "none",
  transition: "background 0.15s ease, color 0.15s ease",
});