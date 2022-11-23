const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${value}`
    }).join('&')
}

describe('Highlight contestant history', () => {
    it('applies highlighted color to .player-title', () => {
        cy.visit(`http://localhost:3000?${get_query({
            highlightedPlayerTitleColor: 'rgb(255, 192, 203)'
        })}`)

        cy.get(`.side-wrapper[contestant-id='163911']`).eq(0).click()
        cy.get('.side-wrapper.highlighted .player-title').should('have.css', 'color', 'rgb(255, 192, 203)')
    })


    it(`".line-wrapper" elements of a .highlighted (but not .last-highlighted) match
        have style.color === options.highlightedConnectionLinesColor`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            highlightedConnectionLinesColor: 'rgb(10, 10, 10)'
        })}`)

        cy.get(`.side-wrapper[contestant-id='163911']`).eq(0).click()
        cy.get(`.match-wrapper.highlighted .line-wrapper`).eq(0)
            .should('have.css', 'color', 'rgb(10, 10, 10)')
    })


    it(`".line-wrapper" elements of last highlighted match have style.color === options.connectionLinesColor
        (it unhighlights a right pseudo border which is actually a box-shadow)`, () => {

        cy.visit(`http://localhost:3000?${get_query({
            highlightedConnectionLinesColor: 'rgb(10, 10, 10)',
            connectionLinesColor: 'rgb(100, 100, 100)',
        })}`)

        cy.get(`.side-wrapper[contestant-id='163911']`).eq(0).click()

        cy.get(`.match-wrapper.last-highlighted .line-wrapper`).eq(0)
            .should('have.css', 'color', 'rgb(100, 100, 100)')
    })

})



