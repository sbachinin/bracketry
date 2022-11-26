import { get_query } from './get_query.js'

describe('Scrollbar', () => {
    it('applies options.scrollbarWidth', () => {
        cy.visit(`http://localhost:3000?${get_query({
            scrollbarWidth: 15,
        })}`)
        cy.get('.scrollbar').should('have.css', 'width', '15px')
    })

    it('applies default scrollbar width when options.scrollbarWidth is nonsense', () => {
        cy.visit(`http://localhost:3000?${get_query({
            scrollbarWidth: 'i am an idiot',
        })}`)
        cy.get('.scrollbar').should('have.css', 'width', '5px')
    })

    it('scrollbar is as high as matches-scroller', () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.matches-scroller').then($s => {
            cy.get('.scrollbar-parent').should('have.css', 'height', $s[0].clientHeight + 'px')
        })
    })

    it('scrollbar moves down on scroll', () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons'
        })}`)
        cy.get('.button-down').click()
        cy.get('.button-down').click()
        cy.get('.scrollbar').should($s => {
            expect(
                parseFloat(getComputedStyle($s[0]).top)
            ).to.be.gt(40).to.be.lt(50)
        })
    })


    it('scrollbar changes position on navigation (when useClassicalLayout === false)', () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons'
        })}`)
        cy.get('.button-down').click().click()
        cy.wait(500)
        cy.get('.scrollbar').then($s => {
            const top1 = $s[0].offsetTop
            cy.get('.navigation-button.right').click()
            cy.get('.scrollbar').then($sb => {
                expect($sb[0].offsetTop).to.be.lt(top1)
            })
        })
    })

    it('scrollbar changes height on navigation (when useClassicalLayout === false)', () => {
        cy.visit(`http://localhost:3000?${get_query({
            verticalScrollMode: 'buttons'
        })}`)
        cy.get('.button-down').click().click()
        cy.wait(500)
        cy.get('.scrollbar').then($s => {
            const height1 = $s[0].clientHeight
            cy.get('.navigation-button.right').click()
            cy.get('.scrollbar').then($sb => {
                expect($sb[0].clientHeight).to.be.gt(height1)
            })
        })
    })

    // TODO scrollbar's height and top don't change on navigation when 'use classical layout'
    // TODO scrollbar's top is reset to 0 on navigation if resetScrollOnNavigation is true
})
