import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/libros`);

  const data = await res.json();

  return {
    props: {
      libros: data,
    },
  };
}

const ListaLibros = ({ libros }) => {
  async function handleDelete(e, LibroID) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/libros/${LibroID}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _method: "DELETE",
        }),
      }
    );

    if (res.ok) {
      window.location.href = "/libros";
    }
  }

  return (
    <div>
      <h1>Libros Listado</h1>
      <ul data-cy="listado-libros">
        {libros.map((libro) => (
          <li key="{`book-${libro.id}`}">
            <Link href={`/libros/${libro.id}`}  data-cy={`libro-click-${libro.id}`}>{libro.titulo}</Link>
            {" - "}
            <Link href={`/libros/${libro.id}/editar`}  data-cy={`libro-editar-${libro.id}`}>Editar</Link>

            {" - "}

            <form
              onSubmit={(e) => handleDelete(e, libro.id)}
              style={{ display: "inline" }}
              
            >
              <button data-cy={`libro-eliminar-${libro.id}`}>
                Eliminar
              </button>
            </form>
          </li>
        ))}
      </ul>
      <Link href="/libros/crear" >Crear Libro</Link>
    </div>
  );
};

export default ListaLibros;
