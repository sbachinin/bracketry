import { get_query } from './get_query.js'

describe('Vertical scroll buttons', () => {

    it(`Scroll buttons are hidden with "native" verticalScrollMode`, () => {
        cy.visit(`http://localhost:3000/cypress`)
        cy.get('.button-up').should('not.be.visible')
        cy.get('.button-down').should('not.be.visible')
    })

    it(`Scroll buttons are visible and clickable with "buttons" verticalScrollMode`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            buttonScrollAmount: 200
        })}`)
        cy.get('.button-up')
            .should('be.visible')

        cy.get('.button-down')
            .should('be.visible')
            .click()

        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -200)')
    })

    it(`Scroll buttons are visible and clickable with "mixed" verticalScrollMode`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'mixed',
            buttonScrollAmount: 200
        })}`)
        cy.get('.button-up')
            .should('be.visible')

        cy.get('.button-down')
            .should('be.visible')
            .click()

        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, -200)')
    })

    it(`Scroll buttons attain the same width as matches-scroller`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'mixed'
        })}`)
        cy.get('.matches-scroller').then($s => {
            cy.get('.button-up').should('have.css', 'width', $s[0].getBoundingClientRect().width + 'px')
        })
    })

    it(`clicking the inactive scroll button doesn't change synthetic scroll position`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons'
        })}`)
        cy.get('.button-up:not(.active)').click()
        cy.get('.matches-positioner').should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)')
    })

    it(`"gutters" scroll buttons attain a height of scrollButtonArrowSize + scrollButtonPadding + border`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'gutters',
            scrollButtonArrowSize: 29,
            scrollButtonPadding: '7px'
        })}`)
        cy.get('.button-up').should('have.css', 'height', 29 + 14 + 1 + 'px')
        cy.get('.button-down').should('have.css', 'height', 29 + 14 + 1 + 'px')
    })


    it(`scrollUp/DownButtonHTML is inserted`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollUpButtonHTML: `<div class="up-html">up</div>`,
            scrollDownButtonHTML: `<div class="down-html">up</div>`,
        })}`)
        cy.get('.up-html').should('be.visible')
        cy.get('.down-html').should('be.visible')
    })


    it(`"gutters" scroll buttons attain a height of scrollUp/DownButtonHTML + border (but without scrollButtonPadding)`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'gutters',
            scrollUpButtonHTML: `<div style="height: 72px">up</div>`,
            scrollDownButtonHTML: `<div style="height: 19px">up</div>`,
            scrollButtonPadding: '7px'
        })}`)
        cy.get('.button-up').should('have.css', 'height', 72 + 1 + 'px')
        cy.get('.button-down').should('have.css', 'height', 19 + 1 + 'px')
    })


    it(`scroll buttons are squashed to 0 height when scrollButtonsPosition is "overMatches"`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'overMatches'
        })}`)
        cy.get('.button-up').should('have.css', 'height', '0px')
        cy.get('.button-down').should('have.css', 'height', '0px')
    })

    it(`scroll icons are visible when "overMatches`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'overMatches'
        })}`)
        cy.get('.button-up svg').should('be.visible')
        cy.get('.button-down svg').should('be.visible')
    })

    it(`scroll icons are visible when "overMatches`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'overMatches'
        })}`)
        cy.get('.button-up svg').should('be.visible')
        cy.get('.button-down svg').should('be.visible')
    })

    it(`scroll buttons eat the height of matches if 'gutters'`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'gutters',
            height: 600,
            scrollButtonArrowSize: 300
        })}`)
        cy.get('.matches-scroller').should('have.css', 'height', '0px')
    })

    it(`scroll buttons do NOT eat the height of matches if 'overMatches'`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'overMatches',
            height: 600,
            scrollButtonArrowSize: 300
        })}`)
        cy.get('.matches-scroller').should($s => {
            expect($s[0].clientHeight).to.be.gt(400)
        })
    })
})
