const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${value}`
    }).join('&')
}

describe('Highlight contestant history', () => {
    it('applies rootBorderColor to all borders without color specified', () => {
        cy.visit(`http://localhost:8080?${get_query({
            rootBorderColor: 'rgb(1, 1, 1)'
        })}`)

        cy.get(`.playoffs-root`).should('have.css', 'border-color', 'rgb(1, 1, 1)')
        cy.get(`.button-up`).should('have.css', 'border-bottom-color', 'rgb(1, 1, 1)')
        cy.get(`.button-down`).should('have.css', 'border-top-color', 'rgb(1, 1, 1)')
        cy.get(`.navigation-button.non-header-button.left`).should('have.css', 'border-right-color', 'rgb(1, 1, 1)')
        cy.get(`.navigation-button.non-header-button.right`).should('have.css', 'border-left-color', 'rgb(1, 1, 1)')
        cy.get(`.buttons-header`).should('have.css', 'border-bottom-color', 'rgb(1, 1, 1)')
    })

    it('applies subordinate border colors instead of rootBorderColor when such colors are provided', () => {
        cy.visit(`http://localhost:8080?${get_query({
            rootBorderColor: 'rgb(1, 1, 1)',
            wrapperBorderColor: 'rgb(2, 2, 2)',
            scrollGutterBorderColor: 'rgb(3, 3, 3)',
            navigationGutterBorderColor: 'rgb(4, 4, 4)',
            liveMatchBorderColor: 'rgb(5, 5, 5)'
        })}`)

        cy.get(`.playoffs-root`).should('have.css', 'border-color', 'rgb(2, 2, 2)')
        cy.get(`.button-up`).should('have.css', 'border-bottom-color', 'rgb(3, 3, 3)')
        cy.get(`.button-down`).should('have.css', 'border-top-color', 'rgb(3, 3, 3)')
        cy.get(`.navigation-button.non-header-button.left`).should('have.css', 'border-right-color', 'rgb(4, 4, 4)')
        cy.get(`.navigation-button.non-header-button.right`).should('have.css', 'border-left-color', 'rgb(4, 4, 4)')
        cy.get(`.buttons-header`).should('have.css', 'border-bottom-color', 'rgb(4, 4, 4)')
        cy.get(`.buttons-header`).should('have.css', 'border-bottom-color', 'rgb(4, 4, 4)')

        cy.get(`.match-body.live`).eq(0).should('have.css', 'border-color', 'rgb(5, 5, 5)')
    })
})



