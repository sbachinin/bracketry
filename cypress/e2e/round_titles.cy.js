import { get_query } from './get_query.js'

describe('Round titles', () => {

    it(`round titles grow to full height of custom content provided by getRoundTitleElement`, () => {
        // TODO seems impossible because i can't pass function option via url
        cy.visit(`http://localhost:3000?${get_query({
            getRoundTitleElement: () => {}
        })}`)
    })
})

