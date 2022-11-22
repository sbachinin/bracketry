const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${value}`
    }).join('&')
}

describe(`matchMaxWidth`, () => {

    beforeEach(() => cy.viewport(1280, 720))
    
    it(`reduces the width of match-bodies to matchMaxWidth when visibleRoundsCount is small`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            visibleRoundsCount: 1,
            matchMaxWidth: '500px'
        })}`)

        cy.get('.match-body').eq(0).should('have.css', 'width', '500px')
    })

})
