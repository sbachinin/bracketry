/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const finished_ucl = require('./data/ucl-finished.js').default
const { deep_clone_object, init } = require('./utils.js')


test(`draws new data supplied via replaceData`, () => {
    const { wrapper, bracket } = init(finished_ucl)

    const dumb_test_data = { rounds: [{ name: 'round 1' }], matches: [], contestants: {} }

    bracket.replaceData(dumb_test_data)

    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(1)
    expect(wrapper.querySelectorAll('.round-title')[0].textContent).toBe('round 1')
    expect(wrapper.querySelectorAll('.match-body').length).toBe(0)
})

test(`getAllData returns the latest data supplied via replaceData`, () => {
    const { bracket } = init(finished_ucl)

    const dumb_test_data = { rounds: [{ name: 'round 1' }], matches: [], contestants: {} }
    bracket.replaceData(dumb_test_data)

    expect(bracket.getAllData()).toEqual(dumb_test_data)
})


test(`does not keep old properties which aren't present in new data supplied via replaceData`, () => {
    const { bracket } = init(finished_ucl)

    const dumb_test_data = { rounds: [{ name: 'round 1' }] }
    bracket.replaceData(dumb_test_data)

    expect(bracket.getAllData().matches).toBe(undefined)
    expect(bracket.getAllData().contestants).toBe(undefined)
})

test(`does not mutate data passed to replaceData`, () => {
    const { bracket } = init({ rounds: [{ name: 'round 1' }] })

    const cloned_ucl = deep_clone_object(finished_ucl)
    bracket.replaceData(finished_ucl)

    expect(finished_ucl).toEqual(cloned_ucl)
})



test(`ignores subsequent mutations of user data passed to replaceData`, () => {
    const dumb_test_data = {
        rounds: [{ name: 'round 1' }],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [{ mainScore: 1 }] }] }],
        contestants: { c1: { players: [] } }
    }

    const { wrapper, bracket } = init(dumb_test_data)

    bracket.replaceData(dumb_test_data)

    dumb_test_data.contestants = NaN
    dumb_test_data.rounds[0].name = 'bad round name'
    dumb_test_data.matches[0].sides[0].scores[0].mainScore = 100000000

    expect(bracket.getAllData()).toEqual({
        rounds: [{ name: 'round 1' }],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [{ mainScore: 1 }] }] }],
        contestants: { c1: { players: [] } }
    })

    expect(wrapper.querySelector('.round-title').textContent).toBe('round 1')
    expect(wrapper.querySelector('.main-score').textContent).toBe('1')
})



test(`keeps an old data when replaceData is called with critically invalid data (and keeps DOM intact)`, () => {
    const { wrapper, bracket } = init(finished_ucl)

    bracket.replaceData('')
    bracket.replaceData({ rounds: null })
    bracket.replaceData({ rounds: [], matches: '' })
    bracket.replaceData({ rounds: [], matches: [ { roundIndex: 1, order: 1, sides: NaN } ] })

    expect(bracket.getAllData()).toEqual(finished_ucl)
    expect(
        wrapper.querySelectorAll('.round-wrapper')[1]
            .querySelectorAll('.match-wrapper')[1]
                .querySelector('.player-title')
                    .textContent
    ).toBe('Villarreal')
})



test(`resets navigation state when calling replaceData`, () => {
    const { wrapper, bracket } = init(finished_ucl, { visibleRoundsCount: 2 })

    bracket.moveToLastRound()
    expect(bracket.getNavigationState().baseRoundIndex).toBe(2)
    
    bracket.replaceData({ rounds: [ {}, {}, {}, {}, {}, {} ]})
    
    expect(bracket.getNavigationState().baseRoundIndex).toBe(0)
    expect(
        getComputedStyle(
            wrapper.querySelectorAll('.round-wrapper')[0]
        ).display
    ).not.toBe('none')
})


