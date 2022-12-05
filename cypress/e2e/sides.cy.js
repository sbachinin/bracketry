describe(`Sides`, () => {

    beforeEach(() => cy.viewport(1280, 720))

    it(`side with data is clickable`, () => {
        
        cy.visit(`http://localhost:3000/cypress`)

        cy.get(
            '.round-wrapper[round-index="6"] .match-wrapper[match-order="0"] .side-wrapper:first-child'
        ).should('have.css', 'pointer-events', 'auto')
    })

    it(`side without data is unclickable`, () => {
        
        
        cy.visit(`http://localhost:3000/cypress`)

        cy.get(
            '.round-wrapper[round-index="6"] .match-wrapper[match-order="0"] .side-wrapper:last-child'
        )
        .should('have.class', 'empty-side')
        .and('have.css', 'pointer-events', 'none')
    })

})
