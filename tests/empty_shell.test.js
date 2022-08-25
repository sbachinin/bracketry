/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs

const create_wrapper = () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)



test('renders empty shell if no data', () => {
    const wrapper = create_wrapper()
    expect.assertions(3)

    createPlayoffs(undefined, wrapper)

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Data must be an object`)
})



test('renders empty shell if data is an empty object', () => {
    const wrapper = create_wrapper()
    createPlayoffs({}, wrapper)
    expect.assertions(3)
    
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Data must contain "rounds" property and it must be an array`)
})


test('renders empty shell if data.rounds is undefined', () => {
    const wrapper = create_wrapper()
    createPlayoffs({ matches: [], contestants: {} }, wrapper)
    expect.assertions(3)

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Data must contain "rounds" property and it must be an array`)
})



test('renders empty shell if "rounds" is an empty array', () => {
    const wrapper = create_wrapper()
    expect.assertions(3)

    createPlayoffs({ rounds: [], matches: [], contestants: {} }, wrapper)

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`At least one round should be provided`)
})



test('renders empty shell if "rounds" contains non-object element', () => {
    const wrapper = create_wrapper()
    createPlayoffs({ rounds: [{}, 3], matches: [], contestants: {} }, wrapper)
    expect.assertions(3)

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`data.rounds may contain only objects`)
})



test('renders empty shell when match.sides is not an array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: '32323', round_index: 0, order: 0, sides: true }],
            contestants: {}
        },
        wrapper
    )

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Match.sides is required and must be an array`)
})


test('renders empty shell if match.sides contains non-object items', () => {
    const wrapper = create_wrapper()
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', round_index: 0, order: 0, sides: ['crap'], match_status: 'Scheduled' }],
        },
        wrapper
    )

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Match's side must be an object`)
})




test('renders empty shell if match.sides[0].contestant_id is not a string', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: '32323', round_index: 0, order: 0, sides: [{ contestant_id: [] }] }],
            contestants: {}
        },
        wrapper
    )

    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `If you provide side.contestant_id, it must be a string`
    )
})




test('renders empty shell when contestant is not an object', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: '32323', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
            contestants: {
                c1: 333
            }
        },
        wrapper
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Contestant must be an object`)
})




test('renders empty shell when contestant is an empty object', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: '32323', round_index: 0, order: 0, sides: [{ contestant_id: 'contestant1' }] }],
            contestants: {
                contestant1: {}
            }
        },
        wrapper
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`contestant.players is required and it must be an array`)
})



test('renders empty shell when side.score is not an array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'contestant1', score: 312312 }]
            }
            ],
            contestants: {
                contestant1: { players: [{ title: 'john' }] }
            }
        },
        wrapper
    )
    
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`If side.score is provided, it must be an array`)
})















test('renders empty shell when contestant.players is not an array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }]
            }
            ],
            contestants: {
                contestant1: { players: 3232 }
            }
        },
        wrapper,
        {}
    )
    
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`contestant.players is required and it must be an array`)
})

test('renders empty shell when contestant.players contains non-objects', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }]
            }
            ],
            contestants: {
                contestant1: { players: ['3232'] }
            }
        },
        wrapper,
        {}
    )
    
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`contestant.players array must contain only objects`)
})
