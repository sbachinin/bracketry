/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default

const init = () => {
    document.body.innerHTML = ''
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test('draws new data supplied via replaceData', () => {
    const wrapper = init()

    const pl = createPlayoffs(finished_ucl, wrapper)

    const dumb_test_data = { rounds: [{ name: 'round 1' }], matches: [], contestants: {} }

    pl.replaceData(dumb_test_data)

    expect(document.querySelectorAll('.round-wrapper').length).toBe(1)
    expect(document.querySelectorAll('.round-name')[0].textContent).toBe('round 1')
    expect(document.querySelectorAll('.match-wrapper[match-id]').length).toBe(0)
})

test('getAllData returns the latest data supplied via replaceData', () => {
    const wrapper = init()
    const pl = createPlayoffs(finished_ucl, wrapper)

    const dumb_test_data = { rounds: [{ name: 'round 1' }], matches: [], contestants: {} }
    pl.replaceData(dumb_test_data)

    expect(pl.getAllData()).toEqual(dumb_test_data)
})


test(`does not keep old properties which aren't present in new data supplied via replaceData`, () => {
    const wrapper = init()
    const pl = createPlayoffs(finished_ucl, wrapper)

    const dumb_test_data = { rounds: [{ name: 'round 1' }] }
    pl.replaceData(dumb_test_data)

    expect(pl.getAllData().matches).toBe(undefined)
    expect(pl.getAllData().contestants).toBe(undefined)
})

test(`does not mutate data passed to replaceData`, () => {
    const wrapper = init()
    const pl = createPlayoffs(finished_ucl, wrapper)

    const dumb_test_data = { rounds: [{ name: 'round 1' }] }
    pl.replaceData(dumb_test_data)

    expect(dumb_test_data).toEqual({ rounds: [{ name: 'round 1' }] })
})



test(`ignores subsequent mutations of user data passed to replaceData`, () => {
    const wrapper = init()

    const dumb_test_data = {
        rounds: [{ name: 'round 1' }],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1', score: [{ main_score: 1 }] }] }],
        contestants: { c1: { players: [] } }
    }

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.replaceData(dumb_test_data)

    dumb_test_data.contestants = NaN
    dumb_test_data.rounds[0].name = 'bad round name'
    dumb_test_data.matches[0].sides[0].score[0].main_score = 100000000

    expect(pl.getAllData()).toEqual({
        rounds: [{ name: 'round 1' }],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1', score: [{ main_score: 1 }] }] }],
        contestants: { c1: { players: [] } }
    })

    expect(wrapper.querySelector('.round-name').textContent).toBe('round 1')
    expect(wrapper.querySelector('.main-score').textContent).toBe('1')
})



test('keeps an old data when replaceData is called with critically invalid data (and keeps DOM intact)', () => {
    const wrapper = init()

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.replaceData('')
    pl.replaceData({ rounds: null })
    pl.replaceData({ rounds: [], matches: '' })
    pl.replaceData({ rounds: [], matches: [ { id: 'm1', round_index: 1, order: 1, sides: NaN } ] })

    expect(pl.getAllData()).toEqual(finished_ucl)
    expect(
        document.querySelectorAll('.round-wrapper')[1]
            .querySelectorAll('.match-wrapper')[1]
                .querySelector('.player-title')
                    .textContent
    ).toBe('Villarreal')
})



test(`resets navigation state when calling replaceData`, () => {
    const wrapper = init()

    const pl = createPlayoffs(finished_ucl, wrapper, { visibleRoundsCount: 2 })

    pl.moveToLastRound()
    expect(pl.getNavigationState().baseRoundIndex).toBe(2)
    
    pl.replaceData({ rounds: [ {}, {}, {}, {}, {}, {} ]})
    
    expect(pl.getNavigationState().baseRoundIndex).toBe(0)
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


