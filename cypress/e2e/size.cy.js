import { get_query } from './get_query.js'

describe(`Bracket's size`, () => {

    beforeEach(() => cy.viewport(1280, 720))

    it(`stretches to full width of a wrapper when "width" option is not specified`, () => {
        cy.visit(`http://localhost:3000/cypress`)

        cy.get('.bracket-root')
            .should('have.css', 'width')
            .and(width => {
                expect(parseInt(width)).to.be.gt(1200)
                expect(parseInt(width)).to.be.lt(1300)
            })
    })


    it(`stretches to full height of a wrapper when "height" option is not specified`, () => {
        cy.visit(`http://localhost:3000/cypress`)

        cy.get('.bracket-root')
            .should('have.css', 'height', '600px')
    })

    it(`does not become wider than user_wrapper even if 'width' option is set to a greater number`, () => {

        cy.visit(`http://localhost:3000/cypress?${get_query({
            width: '2000px'
        })}`)

        cy.get('.bracket-root')
            .should('have.css', 'width', '1280px')
            .and($s => {
                expect(getComputedStyle($s[0]).width).to.equal('1280px')
            })
    })


    it(`bracket-root is narrower than user_wrapper if actual content is narrower`, () => {

        cy.viewport(3000, 720)

        cy.visit(`http://localhost:3000/cypress`)

        cy.get('.bracket-root')
            .should('have.css', 'width')
            .and(width => {
                expect(parseInt(width)).to.be.lt(2500)
            })
    })


    it(`bracket-root's width is 100% of the parent when actual content is narrower but width option is set to 100%`, () => {

        cy.viewport(3000, 720)

        cy.visit(`http://localhost:3000/cypress?${get_query({
            width: '100%'
        })}`)

        cy.get('.bracket-root')
            .should('have.css', 'width', '3000px')
            .and($s => {
                expect(getComputedStyle($s[0]).width).to.equal('3000px')
            })
    })


    it(`becomes taller than user_wrapper when 'height' option is set to a greater number`, () => {

        cy.visit(`http://localhost:3000/cypress?${get_query({
            height: '2000px'
        })}`)

        cy.get('.bracket-root')
            .should('have.css', 'height', '2000px')
            .and($s => {
                expect(getComputedStyle($s[0]).height).to.equal('2000px')
            })
    })
})
