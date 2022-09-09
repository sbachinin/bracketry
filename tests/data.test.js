/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const finished_ucl = require('./ucl-finished.js').default
const { init, deep_clone_object } = require('./utils.js')


test(`does not mutate data which wass passed to createPlayoffs`, () => {
    const cloned_ucl = deep_clone_object(finished_ucl)
    init(finished_ucl)
    expect(finished_ucl).toEqual(cloned_ucl)
})


test(`ignores subsequent mutations of user data passed to createPlayoffs`, () => {
    const dumb_test_data = {
        rounds: [{ name: 'round 1' }],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', score: [{ mainScore: 1 }] }] }],
        contestants: { c1: { players: [] } }
    }

    const { wrapper, playoffs: pl } = init(dumb_test_data)

    dumb_test_data.contestants = NaN
    dumb_test_data.rounds[0].name = 'bad round name'
    dumb_test_data.matches[0].sides[0].score[0].mainScore = 100000000

    expect(pl.getAllData()).toEqual({
        rounds: [{ name: 'round 1' }],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', score: [{ mainScore: 1 }] }] }],
        contestants: { c1: { players: [] } }
    })

    expect(wrapper.querySelector('.round-name').textContent).toBe('round 1')
    expect(wrapper.querySelector('.main-score').textContent).toBe('1')
})





test('getAllData returns an exact copy of original user data', () => {
    const ucl_with_nameless_rounds = { ...finished_ucl, rounds: finished_ucl.rounds.map(r => ({})) }
    const { playoffs: pl } = init(ucl_with_nameless_rounds)
    expect(pl.getAllData()).toEqual(ucl_with_nameless_rounds)
})
