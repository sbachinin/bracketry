/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default


test('survives non-object options', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    createPlayoffs(
        { rounds: [{}] },
        wrapper,
        null
    )
    expect(true).toBe(true);
})

test('survives non-existent options', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ roundIndex: 0, order: 0,
                sides: [{ contestantId: 'contestant1', scores: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'Josh' } ] }
            }
        },
        wrapper,
        { fsdfsd: false}
    )
    expect(true).toBe(true);
})





test('returns the same set of functions if createPlayoffs is called with invalid arguments', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    const successful_playoffs = createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    const failed_playoffs = createPlayoffs(
        'invalid data',
        'invalid wrapper',
        'invalid options'
    )

    expect(Object.keys(successful_playoffs)).toEqual(Object.keys(failed_playoffs))

    const all_return_values_are_functions = Object.values(failed_playoffs).every(v => typeof v === 'function')
    expect(all_return_values_are_functions).toBe(true)
})


test('returns the same set of functions if 0 rounds', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    const roundful_playoffs = createPlayoffs(finished_ucl, wrapper)

    const roundless_playoffs = createPlayoffs({ rounds: [] }, wrapper)

    expect(Object.keys(roundful_playoffs)).toEqual(Object.keys(roundless_playoffs))
})


test('after initialization has failed, returned functions may be called without unhandled errors', () => {
    expect.assertions(2)

    const failed_playoffs = createPlayoffs(
        'invalid data',
        'invalid wrapper',
        'invalid options'
    )

    Object.values(failed_playoffs).forEach(v => v())

    expect(failed_playoffs.getAllData()).toBe('invalid data')
    expect(failed_playoffs.getUserOptions()).toBe('invalid options')
})
