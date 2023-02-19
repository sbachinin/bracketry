import { get_query } from './get_query.js'

describe('Navigation', () => {

    beforeEach(() => cy.viewport(1280, 720))

    it(`changes the matches-scroller's margin-left on navigation (free width)`, () => {

        cy.visit(`http://localhost:3000/cypress`)

        cy.get('.navigation-button.right').eq(0).click()
        cy.get('.matches-positioner').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-300)
            expect(parseFloat(marginLeft)).to.be.gt(-450)
        })

        cy.get('.navigation-button.right').eq(0).click()
        cy.get('.matches-positioner').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-650)
            expect(parseFloat(marginLeft)).to.be.gt(-750)
        })

        cy.get('.navigation-button.left').eq(0).click().click()
        cy.get('.matches-positioner').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.equal(0)
        })
    })


    it(`changes the matches-scroller's margin-left on navigation (with displayWholeRounds)`, () => {

        cy.visit(`http://localhost:3000/cypress?${get_query({
            displayWholeRounds: true
        })}`)

        cy.get('.navigation-button.right').eq(0).click()
        cy.get('.matches-positioner').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-300)
            expect(parseFloat(marginLeft)).to.be.gt(-400)
        })

        cy.get('.navigation-button.right').eq(0).click()
        cy.get('.matches-positioner').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-700)
            expect(parseFloat(marginLeft)).to.be.gt(-800)
        })

        cy.get('.navigation-button.left').eq(0).click().click()
        cy.get('.matches-positioner').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.equal(0)
        })
    })


    it(`applies certain width to matches-scroller when visibleRoundsCount is automatic`, () => {
        cy.visit(`http://localhost:3000/cypress`)
        cy.get('.matches-positioner').should($s => {
            const { width } = $s[0].style
            expect(width.slice(-1)).to.equal('%')
            expect(parseFloat(width)).to.be.gt(200)
            expect(parseFloat(width)).to.be.lt(300)
        })
    })

    it(`applies certain width to matches-scroller when visibleRoundsCount is set to a specific number`, () => {
        
        cy.visit(`http://localhost:3000/cypress?${get_query({
            visibleRoundsCount: 4
        })}`)

        cy.get('.matches-positioner').should($s => {
            expect($s[0].style.width).to.equal('175%')
        })
    })

    it(`applies certain width to matches-scroller when displayWholeRounds is set to true`, () => {
        
        cy.visit(`http://localhost:3000/cypress?${get_query({
            displayWholeRounds: true
        })}`)

        cy.get('.matches-positioner').should($s => {
            expect(parseInt($s[0].style.width)).to.equal(233)
        })
    })

    it(`matches-positioner's height is reduced almost twice on every next base round`, () => {
        cy.visit(`http://localhost:3000/cypress`)
        
        let height1
        cy.get('.matches-positioner').then($p => {
            height1 = $p[0].getBoundingClientRect().height
        })
        cy.get('.navigation-button.right').click()
        cy.get('.matches-positioner').should($p => {
            const height2 = $p[0].getBoundingClientRect().height
            const ratio = height1 / height2
            expect(ratio).to.be.gt(1.8)
            expect(ratio).to.be.lt(2)
        })
    })

    it(`matches-positioner's height is not changed on navigation when useClassicalLayout`, () => {
        cy.visit(`http://localhost:3000/cypress?${get_query({
            useClassicalLayout: true
        })}`)
        
        let height1
        cy.get('.matches-positioner').then($p => {
            height1 = $p[0].getBoundingClientRect().height
        })
        cy.get('.navigation-button.right').click()
        cy.get('.matches-positioner').should($p => {
            const height2 = $p[0].getBoundingClientRect().height
            expect(height2).to.equal(height1)
        })
    })
})
