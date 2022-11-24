import { get_query } from './get_query.js'

describe(`matchMaxWidth`, () => {

    beforeEach(() => cy.viewport(1280, 720))
    
    it(`reduces the width of match-bodies to matchMaxWidth when visibleRoundsCount is small`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            visibleRoundsCount: 1,
            matchMaxWidth: 500
        })}`)

        cy.get('.match-body').eq(0).should('have.css', 'width', '500px')
    })

})
