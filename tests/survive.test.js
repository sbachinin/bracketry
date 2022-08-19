/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default


test('js survives if non-element wrapper is provided', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
            }
        },
        null,
        {}
    )
    expect(true).toBe(true);
})


test('js survives if wrapper is not in the DOM', () => {
    expect.assertions(1)

    createPlayoffs(
        { rounds: [{}] },
        document.createElement('div'),
        {}
    )
    expect(true).toBe(true);
})


test('js survives if wrapper is of bad type', () => {
    const wrapper = document.createElement('img')
    document.body.append(wrapper)

    expect.assertions(1)

    createPlayoffs({rounds: [{}]}, wrapper, {})
    expect(true).toBe(true);
})


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
            matches: [{ id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
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
