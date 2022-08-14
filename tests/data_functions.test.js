/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');
const finished_ucl = require('./ucl-finished.js').default

const init = () => {
    document.body.innerHTML = ''
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test('getAllData returns an exact copy of original user data', () => {
    const wrapper = init()

    const ucl_with_nameless_rounds = { ...finished_ucl, rounds: finished_ucl.rounds.map(r => ({})) }

    const { getAllData } = easyPlayoffs.createPlayoffs(
        ucl_with_nameless_rounds,
        wrapper,
        {}
    )

    expect(getAllData()).toEqual(ucl_with_nameless_rounds)
})

test('applies new data from applyFullDataUpdate', () => {
    const wrapper = init()

    const { getAllData, applyFullDataUpdate } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    const dumb_test_data = { rounds: [{ id: 'r1', name: 'round 1', title: 'dfdfd' }], matches: [], contestants: {} }
    applyFullDataUpdate(dumb_test_data)

    expect(getAllData()).toMatchObject(dumb_test_data)
    expect(document.querySelectorAll('.round-wrapper').length).toBe(1)
    expect(document.querySelectorAll('.round-name').length).toBe(1)
})


test('does not apply invalid new data', () => {
    const wrapper = init()

    const { getAllData, applyFullDataUpdate } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    applyFullDataUpdate({ rounds: null })

    expect(getAllData()).toMatchObject(finished_ucl)
    expect(document.querySelectorAll('.round-wrapper').length).toBe(4)
})
