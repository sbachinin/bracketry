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

    it('scrollbar-parent is as high as matches-scroller', () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.matches-scroller').then($s => {
            cy.get('.scrollbar-parent').should('have.css', 'height', $s[0].clientHeight + 'px')
        })
    })


    it(`attains "top" style according to matches-scroller's scrollTop when verticalScrollMode is "native"`, () => {

        cy.visit(`http://localhost:3000`)

        cy.get('.matches-scroller').scrollTo(0, 2000)
        cy.get('.scrollbar').should(($s) => {
            const { top } = getComputedStyle($s[0])
            expect(parseInt(top)).to.be.gt(175).to.be.lt(225)
        })
    })



    it(`moves down on scroll when verticalScrollMode is not native`, () => {
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


    it('changes position on navigation (when useClassicalLayout === false)', () => {
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

    it('attains certain height accoring to content height', () => {

        cy.visit(`http://localhost:3000`)

        cy.get('.scrollbar').should(($s) => {
            const { height } = getComputedStyle($s[0])
            expect(parseInt(height)).to.be.gt(45).to.be.lt(60)
        })
    })

    it('changes height on navigation (when useClassicalLayout === false)', () => {
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


    it(`is hidden when base round is fully visible`, () => {

        cy.visit(`http://localhost:3000`)
        cy.get('.navigation-button.right').click()
        cy.get('.navigation-button.right').click()
        cy.get('.navigation-button.right').click()
        cy.get('.navigation-button.right').click()

        cy.get('.scrollbar').should(($s) => {
            const { visibility } = getComputedStyle($s[0])
            expect(visibility).to.equal('hidden')
        })
    })


    it(`does not change its height and top on navigation when 'use classical layout'`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            useClassicalLayout: true
        })}`)
        cy.get('.matches-scroller').scrollTo(0, 2000)

        cy.wait(100)
        cy.get('.scrollbar').then($s => {
            const { height: h1, top: t1 } = $s[0].getBoundingClientRect()
            cy.get('.navigation-button.right').click()
            cy.get('.scrollbar').then($sb => {
                const { height: h2, top: t2 } = $sb[0].getBoundingClientRect()
                expect(h1).to.equal(h2)
                expect(t1).to.equal(t2)
            })
        })
    })

    it(`resets its 'top' to 0 on navigation if resetScrollOnNavigation is true`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            resetScrollOnNavigation: true
        })}`)
        cy.get('.matches-scroller').scrollTo(0, 2000)

        cy.wait(100)

        cy.get('.scrollbar').should('not.have.css', 'top', '0px')
        cy.get('.navigation-button.right').click()
        cy.get('.scrollbar').should('have.css', 'top', '0px')
    })
})
