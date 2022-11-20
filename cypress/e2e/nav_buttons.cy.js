const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${value}`
    }).join('&')
}

describe('Navigation buttons', () => {

    it('applies certain styles when options.navButtonsPosition is "beforeTitles"', () => {

        cy.visit(`http://localhost:8080?${get_query({
            navButtonsPosition: 'beforeTitles'
        })}`)

        // 1. non-header buttons are hidden
        cy.get('.non-header-button').eq(0).should('have.css', 'display', 'none')
        cy.get('.non-header-button').eq(1).should('have.css', 'display', 'none')

        cy.get('.buttons-header')
            .should('have.css', 'display', 'flex')
            .and('have.css', 'position', 'static')
    })

    // shows buttons-header when 'beforeTitles'
    // shows buttons-header when 'overTitles'

    it('hides navigation buttons when options.navButtonsPosition is "hidden"', () => {
        cy.visit(`http://localhost:8080?${get_query({
            navButtonsPosition: 'hidden'
        })}`)

        cy.get(`.navigation-button`).each($b => {
            cy.wrap($b).should('have.css', 'display', 'none')
        })
        cy.get(`.buttons-header`).should('have.css', 'display', 'none')
    })


    it('hides non-header navigation buttons when tournament fits the drawing area', () => {
        
        cy.viewport(5000, 2000)
        cy.visit(`http://localhost:8080`)

        cy.get(`.navigation-button.non-header-button`).each($b => {
            cy.wrap($b).should('have.css', 'display', 'none')
        })
    })

    it('hides buttons-header when tournament fits the drawing area', () => {

        cy.viewport(5000, 2000)
        cy.visit(`http://localhost:8080?${get_query({
            navButtonsPosition: 'beforeTitles'
        })}`)
        cy.get(`.buttons-header`).should('have.css', 'display', 'none')
    })


    it('left nav button should be non-active at the beginning', () => {
        cy.visit(`http://localhost:8080`)
        cy.get('.navigation-button.left').eq(0).should('not.have.class', 'active')
        cy.get('.navigation-button.left').eq(1).should('not.have.class', 'active')
    })

    it('left nav button should become active after navigation', () => {
        cy.visit(`http://localhost:8080`)
        cy.get('.navigation-button.right').eq(1).click()
        cy.get('.navigation-button.left').eq(0).should('have.class', 'active')
        cy.get('.navigation-button.left').eq(1).should('have.class', 'active')
    })

    it('right nav button should be active at the beginning if content is wide enough', () => {
        cy.visit(`http://localhost:8080`)
        cy.get('.navigation-button.right').eq(0).should('have.class', 'active')
        cy.get('.navigation-button.right').eq(1).should('have.class', 'active')
    })

    it('righ nav button becomes non-active when end of navigation is reached', () => {
        cy.visit(`http://localhost:8080`)
        cy.get('.navigation-button.right').eq(1).click().click().click().click().click().should('not.have.class', 'active')
        cy.get('.navigation-button.right').eq(0).should('not.have.class', 'active')
    })
})
