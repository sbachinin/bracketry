/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


test('survives non-object options', () => {

    expect.assertions(1)
    init({ rounds: [{}] }, null)
    expect(true).toBe(true)
})


test('survives non-existent options keys', () => {

    expect.assertions(1)
    init(
        {
            rounds: [{}],
            matches: [{
                roundIndex: 0, order: 0,
                sides: [{ contestantId: 'contestant1', scores: [] }]
            }
            ],
            contestants: {
                contestant1: { players: [{ title: 'Josh' }] }
            }
        },
        { fsdfsd: false }
    )
    expect(true).toBe(true);
})


test('returns the same set of functions if createBracket is called with invalid arguments', () => {

    const { bracket: br1 } = init(finished_ucl)

    const { bracket: br2 } = init('invalid data', 'invalid options')

    expect(Object.keys(br1)).toEqual(Object.keys(br2))

    const pl1_functions_count = Object.values(br1).filter(v => typeof v === 'function').length
    const pl2_functions_count = Object.values(br2).filter(v => typeof v === 'function').length
    expect(pl1_functions_count).toBe(pl2_functions_count)
})


test('returns the same set of functions if 0 rounds', () => {

    const { bracket: br1 } = init(finished_ucl)
    const { bracket: br2 } = init({ rounds: [] })
    expect(Object.keys(br1)).toEqual(Object.keys(br2))
})


test('after initialization has failed, returned functions may be called without unhandled errors', () => {

    expect.assertions(2)

    const { bracket: br } = init(
        'invalid data',
        'invalid options'
    )
    Object.values(br).forEach(v => typeof v === 'function' && v())
    expect(br.getAllData()).toBe('invalid data')
    expect(br.getUserOptions()).toBe('invalid options')
})
