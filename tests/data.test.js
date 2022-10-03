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
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [{ mainScore: 1 }] }] }],
        contestants: { c1: { players: [] } }
    }

    const { wrapper, playoffs: pl } = init(dumb_test_data)

    dumb_test_data.contestants = NaN
    dumb_test_data.rounds[0].name = 'bad round name'
    dumb_test_data.matches[0].sides[0].scores[0].mainScore = 100000000

    expect(pl.getAllData()).toEqual({
        rounds: [{ name: 'round 1' }],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [{ mainScore: 1 }] }] }],
        contestants: { c1: { players: [] } }
    })

    expect(wrapper.querySelector('.round-title').textContent).toBe('round 1')
    expect(wrapper.querySelector('.main-score').textContent).toBe('1')
})





test(`getAllData returns an exact copy of original user data`, () => {
    const { playoffs: pl } = init(finished_ucl)
    expect(pl.getAllData()).toEqual(finished_ucl)
})


test(`getAllData returns an exact copy of original user data, even if it contained extra properties`, () => {
    const data = { ...finished_ucl, extra: true }
    const { playoffs: pl } = init(data)
    expect(pl.getAllData()).toEqual(data)
})

test(`getAllData returns an exact copy of original user data, even if it was invalid`, () => {
    const data = { rounds: 'yes', shit: true }
    const { playoffs: pl } = init(data)
    expect(pl.getAllData()).toEqual(data)
})


test(`getAllData returns an exact copy of new data provided by replaceData
    (with extra properties preserved)`, () => {
    const { playoffs: pl } = init(finished_ucl)
    const new_data = { rounds: [{}], extra: true }
    pl.replaceData(new_data)
    expect(pl.getAllData()).toEqual(new_data)
})



test(`Mutating an object returned from getAllData does not change the internal data`, () => {
    const { playoffs: pl } = init(finished_ucl)
    const data = pl.getAllData()
    Object.assign(data, { some_external_stuff: true, rounds: [] })
    data.matches[0].sides[0].scores[0].mainScore = '12312312312321'
    expect(pl.getAllData()).toEqual(finished_ucl)
})



test(`Mutating an object passed to getMatchElement does not change the internal data`, () => {
    const { playoffs: pl } = init(
        finished_ucl,
        {
            getMatchElement: (r, m, data) => {
                Object.assign(data, { some_external_stuff: true, rounds: [] })
                data.matches[0].sides[0].scores[0].mainScore = '12312312312321'
            }
        }
    )
    expect(pl.getAllData()).toEqual(finished_ucl)
})
