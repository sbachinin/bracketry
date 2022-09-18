/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test(`tells user options via getUserOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    expect(pl.getUserOptions()).toEqual({ visibleRoundsCount: 2 })
})



test(`applies options.matchMaxWidth to .match-body`, () => {

    const { wrapper } = init(finished_ucl, { matchMaxWidth: '250px' })
    expect(
        getComputedStyle(wrapper.querySelector('.match-body')).maxWidth
    ).toBe('250px')
})



test(`applies new visibleRoundsCount via applyNewOptions`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.applyNewOptions({ visibleRoundsCount: 1 })
    expect(wrapper.querySelector('.content-horizontal-scroller').style.width).toBe('400%')
})



test(`does not apply invalid options supplied by applyNewOptions`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { roundTitlesHeight: 38 })

    pl.applyNewOptions({ roundTitlesHeight: 'poop', scrollbarWidth: NaN })

    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('38px')

    expect(
        getComputedStyle(wrapper.querySelector('.scrollbar-parent')).width
    ).toBe('5px')
})



test(`getUserOptions returns only valid options supplied to createPlayoffs`, () => {

    const { playoffs: pl } = init(finished_ucl, {
        roundTitlesHeight: 'poop',
        scrollbarWidth: NaN,
        visibleRoundsCount: 2
    })

    expect(pl.getUserOptions()).toEqual({ visibleRoundsCount: 2 })
})



test(`getUserOptions returns only valid options supplied by applyNewOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { roundTitlesHeight: 38 })

    pl.applyNewOptions({ roundTitlesHeight: 'poop', scrollbarWidth: NaN, visibleRoundsCount: 2 })

    expect(pl.getUserOptions()).toMatchObject({ roundTitlesHeight: 38, visibleRoundsCount: 2 })
})



test(`falls back to default options in case of non-object options`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, 'i am an idiot')
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('50px')
    expect(pl.getUserOptions()).toEqual({})
})



test(`ignores non-object options passed to applyNewOptions`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)
    pl.applyNewOptions('i am an idiot')
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('50px')
    expect(pl.getUserOptions()).toEqual({})
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



test(`Ignores subsequent mutations of an options object by a user`, () => {

    const options = { roundTitlesHeight: 30 }
    const { wrapper, playoffs: pl } = init(finished_ucl, options)
    options.roundTitlesHeight = 50
    expect(pl.getUserOptions()).toEqual({ roundTitlesHeight: 30 })
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('30px')
})



test(`does not mutate an options object supplied by a user`, () => {

    const options = { roundTitlesHeight: 30 }
    init(finished_ucl, options)
    expect(options).toEqual(options)
})



test(`ignores mutations of object returned by getUserOptions`, () => {

    const options = { roundTitlesHeight: 30 }
    const { wrapper, playoffs: pl } = init(finished_ucl, options)

    const returned_options = pl.getUserOptions()
    returned_options.roundTitlesHeight = 5000

    expect(pl.getUserOptions()).toEqual({ roundTitlesHeight: 30 })
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('30px')
})



test(`getUserOptions returns object which is a merge of initial options and those changed by applyNewOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { roundTitlesHeight: 30 })
    pl.applyNewOptions({ matchMaxWidth: '333px' })
    expect(pl.getUserOptions()).toEqual({ roundTitlesHeight: 30, matchMaxWidth: '333px' })
})
