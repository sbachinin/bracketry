const get_query = (o) => {
    return Object.entries(o).map(([name, value]) => {
        return `${name}=${value}`
    }).join('&')
}

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
})
