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


test('returns the same set of functions if createPlayoffs is called with invalid arguments', () => {

    const { playoffs: pl1 } = init(finished_ucl)

    const { playoffs: pl2 } = init('invalid data', 'invalid options')

    expect(Object.keys(pl1)).toEqual(Object.keys(pl2))

    const pl1_functions_count = Object.values(pl1).filter(v => typeof v === 'function').length
    const pl2_functions_count = Object.values(pl2).filter(v => typeof v === 'function').length
    expect(pl1_functions_count).toBe(pl2_functions_count)
})


test('returns the same set of functions if 0 rounds', () => {

    const { playoffs: pl1 } = init(finished_ucl)
    const { playoffs: pl2 } = init({ rounds: [] })
    expect(Object.keys(pl1)).toEqual(Object.keys(pl2))
})


test('after initialization has failed, returned functions may be called without unhandled errors', () => {

    expect.assertions(2)

    const { playoffs: pl } = init(
        'invalid data',
        'invalid options'
    )
    Object.values(pl).forEach(v => typeof v === 'function' && v())
    expect(pl.getAllData()).toBe('invalid data')
    expect(pl.getUserOptions()).toBe('invalid options')
})
