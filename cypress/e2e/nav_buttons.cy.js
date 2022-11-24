import { get_query } from './get_query.js'

describe('Navigation buttons: "gutters"', () => {

    it('nav buttons take full height when navButtonsPosition is "gutters"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters'
        })}`)

        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')

        let full_height = null
        cy.get('.playoffs-root').then($b => {
            full_height = $b[0].clientHeight
        })

        cy.get('.navigation-button.left').then($b => {
            expect($b[0].clientHeight).to.equal(full_height - 2) // 2 is borders height
        })

        cy.get('.navigation-button.right').then($b => {
            expect($b[0].clientHeight).to.equal(full_height - 2) // 2 is borders height
        })
    })

    it(`nav buttons in "gutters" position attain a width which is slightly greater than defaultNavigationIconSize
    (when no custom html is provided for nav buttons)`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters',
            defaultNavigationIconSize: 100
        })}`)

        cy.get('.navigation-button.left').then($b => {
            expect($b[0].clientWidth).to.be.gt(100)
            expect($b[0].clientWidth).to.be.lt(150)
        })

        cy.get('.navigation-button.right').then($b => {
            expect($b[0].clientWidth).to.be.gt(100)
            expect($b[0].clientWidth).to.be.lt(150)
        })
    })


    it(`nav buttons in "gutters" position attain widths of custom html provided in left/rightNavigationButtonHTML`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters',
            leftNavigationButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavigationButtonHTML: `<div style="width: 60px">🤬</div>`
        })}`)

        cy.get('.navigation-button.left').then($b => {
            expect($b[0].clientWidth).to.equal(140)
        })
        cy.get('.navigation-button.right').then($b => {
            expect($b[0].clientWidth).to.equal(60)
        })
    })


    it(`matches-scroller is narrowed by nav buttons in "gutters" position`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters',
            leftNavigationButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavigationButtonHTML: `<div style="width: 60px">🤬</div>`
        })}`)

        let full_width = null
        cy.get('.playoffs-root').then($b => {
            full_width = $b[0].clientWidth
        })

        cy.get('.matches-scroller').then($b => {
            expect($b[0].clientWidth).to.be.lt(full_width - 200)
            expect($b[0].clientWidth).to.be.gt(full_width - 200 - 10) // some inaccuracy for borders etc
        })
    })
})


describe('Navigation buttons: "overMatches"', () => {

    it('nav buttons take same height as matches-scroller when navButtonsPosition is "overMatches"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches'
        })}`)

        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')

        let scroller_height = null
        cy.get('.matches-scroller').then($s => {
            scroller_height = $s[0].clientHeight
        })

        cy.get('.navigation-button.left').then($b => {
            expect($b[0].clientHeight).to.equal(scroller_height)
        })

        cy.get('.navigation-button.right').then($b => {
            expect($b[0].clientHeight).to.equal(scroller_height)
        })
    })


    it('nav buttons are at the same distance from top as matches-scroller when navButtonsPosition is "overMatches"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches'
        })}`)

        let scroller_top = null
        cy.get('.matches-scroller').then($s => {
            scroller_top = $s[0].getBoundingClientRect().top
        })

        cy.get('.navigation-button.left').then($b => {
            expect($b[0].getBoundingClientRect().top).to.equal(scroller_top)
        })

        cy.get('.navigation-button.right').then($b => {
            expect($b[0].getBoundingClientRect().top).to.equal(scroller_top)
        })
    })


    it('reduces nav buttons to 0 width when options.navButtonsPosition is "overMatches"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'width', '0px')
        cy.get('.navigation-button.right').should('have.css', 'width', '0px')
    })


    it(`matches-scroller is NOT narrowed by nav buttons in "overMatches" position`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches',
            leftNavigationButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavigationButtonHTML: `<div style="width: 60px">🤬</div>`
        })}`)

        let full_width = null
        cy.get('.playoffs-root').then($b => {
            full_width = $b[0].clientWidth
        })

        cy.get('.matches-scroller').then($b => {
            expect($b[0].clientWidth).to.equal(full_width)
        })
    })
})



describe('Navigation buttons: "overTitles"', () => {

    it('displays nav buttons at the same distance from top as round titles when options.navButtonsPosition is "overTitles"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles'
        })}`)

        let titles_top = null
        cy.get('.round-titles-wrapper').then($b => {
            titles_top = $b[0].getBoundingClientRect().top
        })

        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')

        cy.get('.navigation-button.left').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.equal(titles_top)
        })

        cy.get('.navigation-button.right').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.equal(titles_top)
        })
    })


    it('nav buttons are of the same height as round titles when options.navButtonsPosition is "overTitles"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles',
            defaultNavigationIconSize: 300
        })}`)

        let titles_height = null
        cy.get('.round-titles-wrapper').then($b => {
            titles_height = $b[0].getBoundingClientRect().height
        })

        cy.get('.navigation-button.left').then($b => {
            const button_height = $b[0].getBoundingClientRect().height
            expect(button_height).to.equal(titles_height)
        })

        cy.get('.navigation-button.right').then($b => {
            const button_height = $b[0].getBoundingClientRect().height
            expect(button_height).to.equal(titles_height)
        })
    })


    it('reduces nav buttons to 0 width when options.navButtonsPosition is "overTitles"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'width', '0px')
        cy.get('.navigation-button.right').should('have.css', 'width', '0px')
    })


    it(`round-titles-grid-item is NOT narrowed by nav buttons in "overTitles" position`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles',
            leftNavigationButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavigationButtonHTML: `<div style="width: 60px">🤬</div>`
        })}`)

        let full_width = null
        cy.get('.playoffs-root').then($b => {
            full_width = $b[0].clientWidth
        })

        cy.get('.round-titles-grid-item').then($b => {
            expect($b[0].clientWidth).to.equal(full_width)
        })
    })

})


describe('Navigation buttons: "beforeTitles"', () => {
    it('displays nav buttons above titles when options.navButtonsPosition is "beforeTitles"', () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles'
        })}`)

        let titles_top = null
        cy.get('.round-titles-wrapper').then($b => {
            titles_top = $b[0].getBoundingClientRect().top
        })

        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')

        cy.get('.navigation-button.left').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.be.below(titles_top)
        })

        cy.get('.navigation-button.right').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.be.below(titles_top)
        })
    })


    it(`each nav button takes half the total playoffs' width when navButtonsPosition is 'beforeTitles'`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles',
        })}`)

        let full_width = null
        cy.get('.playoffs-root').then($b => {
            full_width = $b[0].clientWidth
            cy.get(`.navigation-button.left`).should('have.css', 'width', full_width / 2 + 'px')
            cy.get(`.navigation-button.right`).should('have.css', 'width', full_width / 2 + 'px')
        })
    })


    it(`nav buttons attain a height which is slightly greater than defaultNavigationIconSize
    (if no custom html is provided)`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles',
            defaultNavigationIconSize: 200
        })}`)

        cy.get('.navigation-button.left').then($b => {
            expect($b[0].clientHeight).to.be.gt(200)
            expect($b[0].clientHeight).to.be.lt(300)
        })
        cy.get('.navigation-button.right').then($b => {
            expect($b[0].clientHeight).to.be.gt(200)
            expect($b[0].clientHeight).to.be.lt(300)
        })
    })

    it(`nav buttons "beforeTitles" attain a slightly greater height than that of a custom html provided by left/rightNavigationButtonHTML`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles',
            leftNavigationButtonHTML: `<div style="height: 70px">☠️</div>`,
            rightNavigationButtonHTML: `<div style="height: 120px">🤬</div>`
        })}`)

        cy.get('.navigation-button.left').then($b => {
            expect($b[0].clientHeight).to.be.gt(120)
            expect($b[0].clientHeight).to.be.lt(160)
        })
        cy.get('.navigation-button.right').then($b => {
            expect($b[0].clientHeight).to.be.gt(120)
            expect($b[0].clientHeight).to.be.lt(160)
        })
    })

    it(`nav buttons "beforeTitles" attain a bottom border color === roundTitlesBorderColor`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles',
            roundTitlesBorderColor: 'rgb(42, 125, 1)'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'border-bottom-color', 'rgb(42, 125, 1)')
        cy.get('.navigation-button.right').should('have.css', 'border-bottom-color', 'rgb(42, 125, 1)')
    })
})


describe('Navigation buttons: "hidden"', () => {
    it('hides navigation buttons when options.navButtonsPosition is "hidden"', () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'hidden'
        })}`)

        cy.get(`.navigation-button.left`).should('have.css', 'display', 'none')
        cy.get(`.navigation-button.right`).should('have.css', 'display', 'none')
    })
})


describe('Navigation buttons', () => {

    it('hides navigation buttons when tournament fits the drawing area', () => {

        cy.viewport(5000, 2000)
        cy.visit(`http://localhost:3000`)

        cy.get(`.navigation-button.left`).should('have.css', 'display', 'none')
        cy.get(`.navigation-button.right`).should('have.css', 'display', 'none')
    })


    it('left nav button should be non-active at the beginning', () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.navigation-button.left').should('not.have.class', 'active')
    })

    it('left nav button should become active after navigation', () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.navigation-button.right').click()
        cy.get('.navigation-button.left').should('have.class', 'active')
    })

    it('right nav button should be active at the beginning if content is wide enough', () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.navigation-button.right').should('have.class', 'active')
    })

    it('righ nav button becomes non-active when end of navigation is reached', () => {
        cy.visit(`http://localhost:3000`)
        cy.get('.navigation-button.right').click().click().click().click().click().should('not.have.class', 'active')
        cy.get('.navigation-button.right').should('not.have.class', 'active')
    })

})
