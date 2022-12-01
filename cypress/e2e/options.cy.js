describe(`Options`, () => {

    it(`falls back to default options in case of EMPTY options`, () => {

        cy.visit(`http://localhost:3000/cypress`)
        cy.get('.navigation-button.left svg').should($s => {
            expect(getComputedStyle($s[0]).width).to.equal('34px')
        })
        cy.get('.match-wrapper').should('have.css', 'padding-left', '20px')
        cy.get('.match-body').should('have.css', 'max-width', '1000px')
    })
})

// TODO still unprotected agains NaN passed to numeric options; but NaN is not passable via url