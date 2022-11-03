import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/libros/${context.params.lid}`
  );
  const data = await res.json();

  return {
    props: {
      libro: data,
    },
  };
}

const EditarLibro = ({ libro }) => {
  const router = useRouter();
  const [NombreLibro, setLibroNombre] = useState(libro.titulo);
  const [Errores, setErrores] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting("true");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/libros/${libro.id}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          titulo: NombreLibro,
          _method: "PATCH",
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
          value={String(NombreLibro)}
          disabled={submitting}
          data-cy="input-editar-libro"
        />
        <button disabled={submitting}  data-cy="boton-crear-libro">
          {submitting ? "Enviando..." : "Enviar"}
        </button>
      </form>

      <Link href="/libros" value={NombreLibro}>
        Listado Libros
      </Link>
    </div>
  );
};

export default EditarLibro;
