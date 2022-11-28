import { get_query } from './get_query.js'


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


describe('Navigation buttons: "gutters"', () => {

    it(`are visible`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters'
        })}`)
        
        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')
    })

    it(`take full height (minus borders)`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters',
            height: '700px'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'height', '698px')
        cy.get('.navigation-button.right').should('have.css', 'height', '698px')
    })

    it(`attain a width which is = navButtonSize + navButtonPadding + border
    (if no custom html is provided for nav buttons)`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters',
            navButtonSize: 50,
            navButtonPadding: '0 10px'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'width', '71px')
        cy.get('.navigation-button.right').should('have.css', 'width', '71px')
    })


    it(`attain a width of left/rightNavButtonHTML + border (but without navButtonPadding)`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters',
            leftNavButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavButtonHTML: `<div style="width: 60px">🤬</div>`,
            navButtonPadding: '15px'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'width', '141px')
        cy.get('.navigation-button.right').should('have.css', 'width', '61px')
    })


    it(`consume the width of matches-scroller, making it narrower`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'gutters',
            leftNavButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavButtonHTML: `<div style="width: 60px">🤬</div>`,
            width: '1000px'
        })}`)

        cy.get('.matches-scroller').should('have.css', 'width', 1000 - 140 - 60 - 4 + 'px')
    })
})


describe('Navigation buttons: "overMatches"', () => {

    it(`are visible`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches'
        })}`)
        
        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')
    })


    it(`take same height as matches-scroller`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches'
        })}`)

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


    it(`are at the same distance from top as matches-scroller`, () => {

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


    it(`attain a width of 0`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'width', '0px')
        cy.get('.navigation-button.right').should('have.css', 'width', '0px')
    })


    it(`do not make matches-scroller narrower`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overMatches',
            leftNavButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavButtonHTML: `<div style="width: 60px">🤬</div>`,
            width: '1000px'
        })}`)

        cy.get('.matches-scroller').should('have.css', 'width', '998px')
    })
})



describe('Navigation buttons: "overTitles"', () => {

    it(`are visible`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles'
        })}`)
        
        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')
    })

    it(`take the same distance from top as round titles`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles'
        })}`)

        let titles_top = null
        cy.get('.round-titles-wrapper').then($b => {
            titles_top = $b[0].getBoundingClientRect().top
        })

        cy.get('.navigation-button.left').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.equal(titles_top)
        })

        cy.get('.navigation-button.right').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.equal(titles_top)
        })
    })


    it(`attain a width of 0`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'width', '0px')
        cy.get('.navigation-button.right').should('have.css', 'width', '0px')
    })


    it(`make round titles grow taller`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles',
            navButtonSize: 300,
            navButtonPadding: '15px'
        })}`)

        cy.get('.round-titles-grid-item').should('have.css', 'height', '330px')
        cy.get('.navigation-button.left').should('have.css', 'height', '330px')
        cy.get('.navigation-button.right').should('have.css', 'height', '330px')

    })


    it(`do not make round-titles-grid-item narrower`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'overTitles',
            leftNavButtonHTML: `<div style="width: 140px">☠️</div>`,
            rightNavButtonHTML: `<div style="width: 60px">🤬</div>`
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
    
    it(`are visible`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles'
        })}`)
        
        cy.get('.navigation-button.left').should('not.have.css', 'display', 'none')
        cy.get('.navigation-button.right').should('not.have.css', 'display', 'none')
    })

    it(`are above round titles`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles'
        })}`)

        let titles_top = null
        cy.get('.round-titles-wrapper').then($b => {
            titles_top = $b[0].getBoundingClientRect().top
        })

        cy.get('.navigation-button.left').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.be.below(titles_top)
        })

        cy.get('.navigation-button.right').then($b => {
            const button_top = $b[0].getBoundingClientRect().top
            expect(button_top).to.be.below(titles_top)
        })
    })


    it(`each nav button takes half the total playoffs' width (minus root border)`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles',
            width: '1000px'
        })}`)

        cy.get(`.navigation-button.left`).should('have.css', 'width', '499px')
        cy.get(`.navigation-button.right`).should('have.css', 'width', '499px')
    })


    it(`attain a height of navButtonSize + navButtonPadding + border
    (if no custom html is provided)`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles',
            navButtonSize: 200,
            navButtonPadding: '16px'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'height', '233px')
        cy.get('.navigation-button.right').should('have.css', 'height', '233px')
    })

    it(`attain a height of the greater left/rightNavButtonHTML + border (but without navButtonPadding)`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'beforeTitles',
            leftNavButtonHTML: `<div style="height: 70px">☠️</div>`,
            rightNavButtonHTML: `<div style="height: 120px">🤬</div>`,
            navButtonPadding: '16px'
        })}`)

        cy.get('.navigation-button.left').should('have.css', 'height', '121px')
        cy.get('.navigation-button.right').should('have.css', 'height', '121px')
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
    it(`are hidden`, () => {
        cy.visit(`http://localhost:3000?${get_query({
            navButtonsPosition: 'hidden'
        })}`)

        cy.get(`.navigation-button.left`).should('have.css', 'display', 'none')
        cy.get(`.navigation-button.right`).should('have.css', 'display', 'none')
    })
})
