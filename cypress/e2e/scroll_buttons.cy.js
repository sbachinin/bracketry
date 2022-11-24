import { get_query } from './get_query.js'

describe('Vertical scroll buttons', () => {
    
    it(`Scroll buttons are hidden with "native" verticalScrollMode`, () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.button-up').should('not.be.visible')
    })

    it(`Scroll buttons are visible with "buttons" verticalScrollMode`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons'
        })}`)
        cy.get('.button-up').should('be.visible')
    })

    it(`Scroll buttons are visible with "mixed" verticalScrollMode`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'mixed'
        })}`)
        cy.get('.button-up').should('be.visible')
    })

    it(`Scroll buttons attain the same width as matches-scroller`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'mixed'
        })}`)
        cy.get('.matches-scroller').then($s => {
            cy.get('.button-up').should('have.css', 'width', $s[0].getBoundingClientRect().width + 'px')
        })
    })

    it(`vertical scroll buttons in "gutters" attain a slightly greater height than defaultScrollIconSize`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'gutters',
            defaultScrollIconSize: 29
        })}`)
        cy.get('.button-up').should($b => {
            expect(parseFloat(getComputedStyle($b[0]).height)).to.be.gt(29)
            expect(parseFloat(getComputedStyle($b[0]).height)).to.be.lt(40)
        })
        cy.get('.button-down').should($b => {
            expect(parseFloat(getComputedStyle($b[0]).height)).to.be.gt(29)
            expect(parseFloat(getComputedStyle($b[0]).height)).to.be.lt(40)
        })
    })


    it(`vertical scroll buttons in "gutters" attain a height of custom HTML provided by scrollUp/DownButtonHTML`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'gutters',
            scrollUpButtonHTML: `<div style="height: 72px">up</div>`,
            scrollDownButtonHTML: `<div style="height: 19px">up</div>`
        })}`)
        cy.get('.button-up').should('have.css', 'height', '74px') // +2 for borders
        cy.get('.button-down').should('have.css', 'height', '21px') // +2 for borders
    })


    it(`vertical scroll buttons are squashed to 0 height when scrollButtonsPosition is "overMatches"`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons',
            scrollButtonsPosition: 'overMatches'
        })}`)
        cy.get('.button-up').should('have.css', 'height', '0px')
    })

    // TODO buttons are clickable in all positions
})
