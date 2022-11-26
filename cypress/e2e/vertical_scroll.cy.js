import { get_query } from './get_query.js'

describe('Vertical scroll on button clicks', () => {
    it('scrolls down on button click', () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons',
        })}`)
        cy.get('.button-down').click()
        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -300)')
    })

    it('scrolls down on button click by an amount specified by syntheticScrollAmount', () => {

        const query = get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 100,
        })
        cy.visit(`http://localhost:3000?${query}`)
        cy.get('.button-down').click()
        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -100)')
    })

    it('"scroll up" button is disabled at the beginning', () => {

        const query = get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 100,
        })
        cy.visit(`http://localhost:3000?${query}`)
        cy.get('.button-up').should('have.css', 'pointer-events', 'none')
        cy.get('.button-up').not('.active')
    })

    it('"scroll up" button is enabled after scrolling down', () => {

        const query = get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 100,
        })
        cy.visit(`http://localhost:3000?${query}`)
        cy.get('.button-down').click()
        cy.get('.button-up').should('have.css', 'pointer-events', 'auto')
        cy.get('.button-up.active')
    })

    it('click on "scroll up" button scrolls the content up', () => {

        const query = get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 100,
        })
        cy.visit(`http://localhost:3000?${query}`)
        cy.get('.button-down').click()
        cy.get('.button-down').click()
        cy.get('.button-down').click()
        cy.get('.button-up').click()
        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -200)')
    })

    it('scrolls down on button click only to the edge of content', () => {

        const query = get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 1000000,
        })
        cy.visit(`http://localhost:3000?${query}`)
        cy.get('.button-down').click()
        cy.wait(300)

        cy.get('.round-wrapper[round-index=0] .match-wrapper[match-order=0]').should('not.be.visible')
        cy.get('.round-wrapper[round-index=0] .match-wrapper[match-order=55]').should('not.be.visible')
        cy.get('.round-wrapper[round-index=0] .match-wrapper[match-order=60]').should('be.visible')
        cy.get('.round-wrapper[round-index=0] .match-wrapper[match-order=63]').should('be.visible')
    })

    it('"scroll down" button is disabled when end is reached', () => {

        const query = get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 1000000,
        })
        cy.visit(`http://localhost:3000?${query}`)
        cy.get('.button-down').click()
        cy.get('.button-down').should('have.css', 'pointer-events', 'none')
    })

    it('translateY (synthetic scroll position) is adjusted after navigation', () => {

        const query = get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 1000
        })
        cy.visit(`http://localhost:3000?${query}`)
        cy.get('.button-down').click()
        cy.get('.navigation-button.right').click()
        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -389)')
    })

    it('translateY (synthetic scroll position) is NOT changed after navigation if useClassicalLayout', () => {

        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 1000,
            useClassicalLayout: true
        })}`)
        cy.get('.button-down').click()
        cy.get('.navigation-button.right').click()
        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -1000)')
    })


    it.only('translateY (synthetic scroll position) is reset to 0 on navigation if resetScrollOnNavigation', () => {

        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons',
            syntheticScrollAmount: 1000,
            resetScrollOnNavigation: true
        })}`)
        cy.get('.button-down').click()
        cy.get('.navigation-button.right').click()
        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)')
    })
})


describe('Native scroll mode', () => {
    
    it(`scrollTop is adjusted after navigation (if not useClassicalLayout)`, () => {

        cy.visit(`http://localhost:3000`)
        cy.get('.matches-scroller').scrollTo(0, 2000)
        cy.get('.navigation-button.right').click()
        cy.get('.matches-scroller').should($s => {
            expect($s[0].scrollTop).to.equal(872)
        })
    })

    it(`scrollTop is NOT adjusted after navigation if useClassicalLayout`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            useClassicalLayout: true
        })}`)

        cy.get('.matches-scroller').scrollTo(0, 2000)
        cy.get('.navigation-button.right').click()
        cy.get('.matches-scroller').should($s => {
            expect($s[0].scrollTop).to.equal(2000)
        })
    })

    it(`scrollTop is reset to 0 on navigation if resetScrollOnNavigation`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            resetScrollOnNavigation: true
        })}`)

        cy.get('.matches-scroller').scrollTo(0, 2000)
        cy.get('.navigation-button.right').click()
        cy.get('.matches-scroller').should($s => {
            expect($s[0].scrollTop).to.equal(0)
        })
    })
})
