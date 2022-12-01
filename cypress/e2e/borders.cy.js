import { get_query } from './get_query.js'

describe('Borders', () => {
    it('applies rootBorderColor to all borders without color specified', () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            rootBorderColor: 'rgb(1, 1, 1)'
        })}`)

        cy.get(`.playoffs-root`).should('have.css', 'border-color', 'rgb(1, 1, 1)')
        cy.get(`.button-up`).should('have.css', 'border-bottom-color', 'rgb(1, 1, 1)')
        cy.get(`.button-down`).should('have.css', 'border-top-color', 'rgb(1, 1, 1)')
        cy.get(`.navigation-button.left`).should('have.css', 'border-right-color', 'rgb(1, 1, 1)')
        cy.get(`.navigation-button.right`).should('have.css', 'border-left-color', 'rgb(1, 1, 1)')
    })

    it('applies subordinate border colors instead of rootBorderColor when such colors are provided', () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            rootBorderColor: 'rgb(1, 1, 1)',
            wrapperBorderColor: 'rgb(2, 2, 2)',
            scrollGutterBorderColor: 'rgb(3, 3, 3)',
            navGutterBorderColor: 'rgb(4, 4, 4)',
            liveMatchBorderColor: 'rgb(5, 5, 5)'
        })}`)

        cy.get(`.playoffs-root`).should('have.css', 'border-color', 'rgb(2, 2, 2)')
        cy.get(`.button-up`).should('have.css', 'border-bottom-color', 'rgb(3, 3, 3)')
        cy.get(`.button-down`).should('have.css', 'border-top-color', 'rgb(3, 3, 3)')
        cy.get(`.navigation-button.left`).should('have.css', 'border-right-color', 'rgb(4, 4, 4)')
        cy.get(`.navigation-button.right`).should('have.css', 'border-left-color', 'rgb(4, 4, 4)')

        cy.get(`.match-body.live`).eq(0).should('have.css', 'border-color', 'rgb(5, 5, 5)')
    })
})



