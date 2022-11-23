const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${value}`
    }).join('&')
}

describe('Navigation', () => {

    beforeEach(() => cy.viewport(1280, 720))

    it(`changes the matches-scroller's margin-left on navigation (free width)`, () => {

        cy.visit(`http://localhost:3000`)

        cy.get('.navigation-button.non-header-button.right').eq(0).click()
        cy.get('.matches-scroller').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-350)
            expect(parseFloat(marginLeft)).to.be.gt(-450)
        })

        cy.get('.navigation-button.non-header-button.right').eq(0).click()
        cy.get('.matches-scroller').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-750)
            expect(parseFloat(marginLeft)).to.be.gt(-850)
        })

        cy.get('.navigation-button.non-header-button.left').eq(0).click().click()
        cy.get('.matches-scroller').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.equal(0)
        })
    })


    it(`changes the matches-scroller's margin-left on navigation (with displayWholeRounds)`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            displayWholeRounds: true
        })}`)

        cy.get('.navigation-button.non-header-button.right').eq(0).click()
        cy.get('.matches-scroller').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-300)
            expect(parseFloat(marginLeft)).to.be.gt(-400)
        })

        cy.get('.navigation-button.non-header-button.right').eq(0).click()
        cy.get('.matches-scroller').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.be.lt(-700)
            expect(parseFloat(marginLeft)).to.be.gt(-800)
        })

        cy.get('.navigation-button.non-header-button.left').eq(0).click().click()
        cy.get('.matches-scroller').should($s => {
            const { marginLeft } = getComputedStyle($s[0])
            expect(parseFloat(marginLeft)).to.equal(0)
        })
    })


    it(`applies certain width to matches-scroller when visibleRoundsCount is automatic`, () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.matches-scroller').should($s => {
            const { width } = $s[0].style
            expect(width.slice(-1)).to.equal('%')
            expect(parseFloat(width)).to.be.gt(200)
            expect(parseFloat(width)).to.be.lt(300)
        })
    })

    it(`applies certain width to matches-scroller when visibleRoundsCount is set to a specific number`, () => {
        
        cy.visit(`http://localhost:3000?${get_query({
            visibleRoundsCount: 4
        })}`)

        cy.get('.matches-scroller').should($s => {
            expect($s[0].style.width).to.equal('175%')
        })
    })

    it(`applies certain width to matches-scroller when displayWholeRounds is set to true`, () => {
        
        cy.visit(`http://localhost:3000?${get_query({
            displayWholeRounds: true
        })}`)

        cy.get('.matches-scroller').should($s => {
            expect(parseInt($s[0].style.width)).to.equal(233)
        })
    })
})
