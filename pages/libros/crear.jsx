import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

const CrearLibro = () => {
  const router = useRouter();
  const [NombreLibro, setLibroNombre] = useState("");
  const [Errores, setErrores] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting("true");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/libros`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          titulo: NombreLibro,
        }),
      }
    );

    if (res.ok) {
      setErrores([]);
      setLibroNombre("");

      return router.push("/libros");
    }

    const data = await res.json();

    setErrores(data.errors);
    setSubmitting(false);
  }

  return (
    <div>
      <h1>Editar Libro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setLibroNombre(e.target.value)}
          value={NombreLibro}
          disabled={submitting}
          data-cy="input-titulo-libro"
        />
        <button disabled={submitting} data-cy="boton-crear-libro">
          {submitting ? "Enviando..." : "Enviar"}
        </button>
        {Errores.titulo && (
          <span style={{ color: "red", display: "block" }}>
            {Errores.titulo}
          </span>
        )}
      </form>

      <Link href="/libros" value={NombreLibro}>
        Listado Libros
      </Link>
    </div>
  );
};

export default CrearLibro;
