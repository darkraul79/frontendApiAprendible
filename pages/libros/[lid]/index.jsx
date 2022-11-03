import React from "react";
import Link from "next/link";

export async function getStaticProps(context) {
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

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/libros`);

  const data = await res.json();

  return {
    paths: data.map((libro) => ({ params: { lid: String(libro.id) } })),
    fallback: false,
  };
}

const DetalleLibro = ({ libro }) => {
  return (
    <>
      <h2>{libro.titulo}</h2>
      <Link href="/libros" data-cy="volver-listado-libros">Listado Libros</Link>
    </>
  );
};

export default DetalleLibro;
