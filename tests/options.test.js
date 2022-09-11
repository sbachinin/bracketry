/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');
const finished_ucl = require('./ucl-finished.js').default

const { init } = require('./utils.js')


test('tells user options via getUserOptions', () => {
    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    expect(pl.getUserOptions()).toEqual({ visibleRoundsCount: 2 })
})

test('applies new visibleRoundsCount via applyNewOptions', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.applyNewOptions({ visibleRoundsCount: 4 })

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    const visible_rounds = all_rounds.filter(w => !w.classList.contains('hidden'))
    expect(visible_rounds.length).toBe(4)
    expect(pl.getUserOptions()).toMatchObject({ visibleRoundsCount: 4 })
})


test('merges old and new options', () => {
    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.applyNewOptions({ matchMinVerticalGap: 4 })
    expect(pl.getUserOptions().visibleRoundsCount).toBe(2)
    expect(pl.getUserOptions().matchMinVerticalGap).toBe(4)
})





test('applies matchMaxWidth to .match-body', () => {
    const { wrapper } = init(finished_ucl, { matchMaxWidth: '250px' })
    expect(
        getComputedStyle(wrapper.querySelector('.match-body')).maxWidth
    ).toBe('250px')
})



test(`falls back to default options in case of EMPTY options`, () => {
    const { wrapper } = init(finished_ucl)
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('50px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-wrapper')).paddingLeft
    ).toBe('20px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-body')).maxWidth
    ).toBe('unset')
})


test(`falls back to default option if NaN is provided for an option of type "number"`, () => {
    const { wrapper } = init(finished_ucl, {
        roundTitlesHeight: NaN, matchHorMargin: NaN
    })
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('50px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-wrapper')).paddingLeft
    ).toBe('20px')
})


test(`falls back to default options in case of INVALID options`, () => {
    const { wrapper } = init(finished_ucl, {
        roundTitlesHeight: {}, matchHorMargin: [], matchMaxWidth: Object
    })
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('50px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-wrapper')).paddingLeft
    ).toBe('20px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-body')).maxWidth
    ).toBe('unset')
})

// TODO other heavy-logic options

// TODO ignores subsequent mutations of an options object by a user

// TODO does not mutate an options object supplied by a user