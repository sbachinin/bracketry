describe(`Options`, () => {

    it(`falls back to default options in case of EMPTY options`, () => {

        cy.visit(`http://localhost:3000`)
        cy.get('.round-titles-wrapper').should('have.css', 'height', '50px')
        cy.get('.match-wrapper').should('have.css', 'padding-left', '20px')
        cy.get('.match-body').should('have.css', 'max-width', 'none')
    })
})
