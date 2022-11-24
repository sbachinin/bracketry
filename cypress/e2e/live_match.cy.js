import { get_query } from './get_query.js'

describe(`Live match`, () => {

    beforeEach(() => cy.viewport(1280, 720))
    
    it(`applies certain styles to a match element which { isLive: true }`, () => {
        
        cy.visit(`http://localhost:3000?${get_query({
            liveMatchBorderColor: 'rgb(255, 0, 0)', liveMatchBgColor: 'rgb(0, 0, 255)'
        })}`)

        cy.get('.match-body.live')
            .should('have.css', 'border-color', 'rgb(255, 0, 0)')
            .and('have.css', 'background-color', 'rgb(0, 0, 255)')
        
        cy.get('.match-body.live .current-score')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(255, 0, 0)')
    })
})
