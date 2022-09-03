/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const finished_ucl = require('./ucl-finished.js').default
const { deep_clone_object, init } = require('./utils.js')


test('draws new data supplied via replaceData', () => {
    const { wrapper, playoffs } = init(finished_ucl)

    const dumb_test_data = { rounds: [{ name: 'round 1' }], matches: [], contestants: {} }

    playoffs.replaceData(dumb_test_data)

    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(1)
    expect(wrapper.querySelectorAll('.round-name')[0].textContent).toBe('round 1')
    expect(wrapper.querySelectorAll('.match-wrapper[match-id]').length).toBe(0)
})

test('getAllData returns the latest data supplied via replaceData', () => {
    const { playoffs } = init(finished_ucl)

    const dumb_test_data = { rounds: [{ name: 'round 1' }], matches: [], contestants: {} }
    playoffs.replaceData(dumb_test_data)

    expect(playoffs.getAllData()).toEqual(dumb_test_data)
})


test(`does not keep old properties which aren't present in new data supplied via replaceData`, () => {
    const { playoffs } = init(finished_ucl)

    const dumb_test_data = { rounds: [{ name: 'round 1' }] }
    playoffs.replaceData(dumb_test_data)

    expect(playoffs.getAllData().matches).toBe(undefined)
    expect(playoffs.getAllData().contestants).toBe(undefined)
})

test(`does not mutate data passed to replaceData`, () => {
    const { playoffs } = init({ rounds: [{ name: 'round 1' }] })

    const cloned_ucl = deep_clone_object(finished_ucl)
    playoffs.replaceData(finished_ucl)

    expect(finished_ucl).toEqual(cloned_ucl)
})



test(`ignores subsequent mutations of user data passed to replaceData`, () => {
    const dumb_test_data = {
        rounds: [{ name: 'round 1' }],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1', score: [{ main_score: 1 }] }] }],
        contestants: { c1: { players: [] } }
    }

    const { wrapper, playoffs } = init(dumb_test_data)

    playoffs.replaceData(dumb_test_data)

    dumb_test_data.contestants = NaN
    dumb_test_data.rounds[0].name = 'bad round name'
    dumb_test_data.matches[0].sides[0].score[0].main_score = 100000000

    expect(playoffs.getAllData()).toEqual({
        rounds: [{ name: 'round 1' }],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1', score: [{ main_score: 1 }] }] }],
        contestants: { c1: { players: [] } }
    })

    expect(wrapper.querySelector('.round-name').textContent).toBe('round 1')
    expect(wrapper.querySelector('.main-score').textContent).toBe('1')
})



test('keeps an old data when replaceData is called with critically invalid data (and keeps DOM intact)', () => {
    const { wrapper, playoffs } = init(finished_ucl)

    playoffs.replaceData('')
    playoffs.replaceData({ rounds: null })
    playoffs.replaceData({ rounds: [], matches: '' })
    playoffs.replaceData({ rounds: [], matches: [ { id: 'm1', roundIndex: 1, order: 1, sides: NaN } ] })

    expect(playoffs.getAllData()).toEqual(finished_ucl)
    expect(
        wrapper.querySelectorAll('.round-wrapper')[1]
            .querySelectorAll('.match-wrapper')[1]
                .querySelector('.player-title')
                    .textContent
    ).toBe('Villarreal')
})



test(`resets navigation state when calling replaceData`, () => {
    const { wrapper, playoffs } = init(finished_ucl, { visibleRoundsCount: 2 })

    playoffs.moveToLastRound()
    expect(playoffs.getNavigationState().baseRoundIndex).toBe(2)
    
    playoffs.replaceData({ rounds: [ {}, {}, {}, {}, {}, {} ]})
    
    expect(playoffs.getNavigationState().baseRoundIndex).toBe(0)
    expect(
        getComputedStyle(
            wrapper.querySelectorAll('.round-wrapper')[0]
        ).display
    ).not.toBe('none')
    expect(
        getComputedStyle(
            wrapper.querySelectorAll('.round-wrapper')[2]
        ).display
    ).toBe('none')
})


