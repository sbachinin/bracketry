/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test(`renders empty shell if no data`, () => {

    expect.assertions(3)
    const { wrapper } = init(undefined)

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Data must be an object`)
})


test(`renders empty shell if data is an empty object`, () => {

    expect.assertions(3)
    const { wrapper } = init({})

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Data must contain "rounds" property and it must be an array`)
})


test(`renders empty shell if data.rounds is undefined`, () => {

    expect.assertions(3)
    const { wrapper } = init({ matches: [], contestants: {} })

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Data must contain "rounds" property and it must be an array`)
})


test(`renders empty shell if "rounds" is an empty array`, () => {

    expect.assertions(3)
    const { wrapper } = init({ rounds: [], matches: [], contestants: {} })

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`At least one round or one match must be provided`)
})


test(`renders empty shell if "rounds" contains non-object element`, () => {

    expect.assertions(3)
    const { wrapper } = init({ rounds: [{}, 3], matches: [], contestants: {} })

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`data.rounds may contain only objects`)
})


test(`renders empty shell when "matches" are not an array`, () => {

    expect.assertions(1)
    const { wrapper } = init({ rounds: [{}], matches: true, contestants: {} })
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
})


test(`renders empty shell when string is given for a match`, () => {

    expect.assertions(1)
    const { wrapper } = init(
        {
            rounds: [],
            matches: ['i am an diot'],
            contestants: {}
        },
    )
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
})


test(`renders empty shell when match.sides is not an array`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{ roundIndex: 0, order: 0, sides: true }],
            contestants: {}
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Match.sides is required and must be an array`)
})


test(`renders empty shell if match.sides contains non-object items`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{ roundIndex: 0, order: 0, sides: ['crap'], matchStatus: 'Scheduled' }],
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Match's side must be an object`)
})


test(`renders empty shell if match.sides[0].contestantId is not a string`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: [] }] }],
            contestants: {}
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `If you provide side.contestantId, it must be a string`
    )
})


test(`renders empty shell when contestant is not an object`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
            contestants: {
                c1: 333
            }
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Contestant must be an object`)
})


test(`renders matches when contestant is an empty object`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'contestant1' }] }],
            contestants: {
                contestant1: {}
            }
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(consoleWarn.mock.calls[0][0]).toMatch(`contestant.players is required`)
})

test(`renders empty shell when side.scores is not an array`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{
                roundIndex: 0, order: 0,
                sides: [{ contestantId: 'contestant1', scores: 312312 }]
            }
            ],
            contestants: {
                contestant1: { players: [{ title: 'john' }] }
            }
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`If side.scores is provided, it must be an array`)
})















test(`renders empty shell when contestant.players is not an array`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{
                roundIndex: 0, order: 0,
                sides: [{ contestantId: 'contestant1', scores: [] }]
            }
            ],
            contestants: {
                contestant1: { players: 3232 }
            }
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`contestant.players must be an array`)
})


test(`renders empty shell when contestant.players contains non-objects`, () => {

    expect.assertions(3)
    const { wrapper } = init(
        {
            rounds: [{}],
            matches: [{
                roundIndex: 0, order: 0,
                sides: [{ contestantId: 'contestant1', scores: [] }]
            }
            ],
            contestants: {
                contestant1: { players: ['3232'] }
            }
        }
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`contestant.players array must contain only objects`)
})
