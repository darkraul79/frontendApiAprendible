describe('Libros', () => {
  it('puedo listar, ver, crear editar y borrar libros', () => {

    // Listado de Libros
    cy.visit('/').get('[data-cy=link-pagina-libros]').click()

    // Puedo crear libros
    cy.get('[href="/libros/crear"]').click().get('[data-cy=input-titulo-libro]').type('Libro de Cypress').get('[data-cy=boton-crear-libro]').click()
      .get('[data-cy=listado-libros]').contains('Libro de Cypress')

    //puedo ver un libro
    cy.get('[data-cy^=libro-click-]').last().click()
      .get('h2').should('contain.text', 'Libro de Cypress').get('[href="/libros"]').click()

    //Puedo editar libros
    cy.get('[data-cy^=libro-editar-]').last().click()
      .get('[data-cy=input-editar-libro]').clear().type('Libro de Cypress editado').get('[data-cy=boton-crear-libro]').click()
      .get('[data-cy=listado-libros]').contains('Libro de Cypress editado')

    //Puedo Eliminar libros
    cy.get('[data-cy^=libro-eliminar-]').last().click()
    cy.get('[data-cy=listado-libros]').should('not.contain.text', 'Libro de Cypress editado')
    // .get('[data-cy=listado-libros]').contains('Libro de Cypress editado')

  })
})