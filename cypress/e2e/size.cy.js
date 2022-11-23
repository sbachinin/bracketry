const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${value}`
    }).join('&')
}

describe(`Playoffs' size`, () => {

    beforeEach(() => cy.viewport(1280, 720))
    
    it(`stretches to full width of a wrapper when "width" option is not specified`, () => {
        cy.visit(`http://localhost:3000`)

        cy.get('.playoffs-root')
            .should('have.css', 'width')
            .and(width => {
                expect(parseInt(width)).to.be.gt(1200)
                expect(parseInt(width)).to.be.lt(1300)
            })
    })


    it(`stretches to full height of a wrapper when "height" option is not specified`, () => {
        cy.visit(`http://localhost:3000`)

        cy.get('.playoffs-root')
            .should('have.css', 'height', '600px')
    })

    it(`becomes wider than user_wrapper when 'width' option is set to a greater number`, () => {
        
        cy.visit(`http://localhost:3000?${get_query({
            width: '2000px'
        })}`)

        cy.get('.playoffs-root')
            .should('have.css', 'width', '2000px')
            .and($s => {
                expect(getComputedStyle($s[0]).width).to.equal('2000px')
            })
    })


    it(`becomes taller than user_wrapper when 'height' option is set to a greater number`, () => {
        
        cy.visit(`http://localhost:3000?${get_query({
            height: '2000px'
        })}`)

        cy.get('.playoffs-root')
            .should('have.css', 'height', '2000px')
            .and($s => {
                expect(getComputedStyle($s[0]).height).to.equal('2000px')
            })
    })
})
