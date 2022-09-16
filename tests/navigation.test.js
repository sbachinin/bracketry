/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test(`sets <horizontal-scroller> width according to options.visibleRoundsCount`, () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 2 })
    expect(wrapper.querySelector('.content-horizontal-scroller').style.width).toBe('200%')
})


test(`sets <horizontal-scroller> marginLeft according to base round index`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.setBaseRoundIndex(1)
    expect(wrapper.querySelector('.content-horizontal-scroller').style.marginLeft).toBe('-50%')
})



test(`renders fractional number of rounds if fractional visibleRoundsCount`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2.5 })
    expect(wrapper.querySelector('.content-horizontal-scroller').style.width).toBe('160%')
})



test(`renders content with negative visibleRoundsCount`, () => {

    expect.assertions(1)
    const { wrapper } = init(finished_ucl, { visibleRoundsCount: -2.5 })
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(4)
})



test(`shows more rounds (sets smaller width for <horizontal-scroller>)
    when a greater visibleRoundsCount is supplied via applyNewOptions`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    expect(wrapper.querySelector('.content-horizontal-scroller').style.width).toBe('200%')

    pl.applyNewOptions({ visibleRoundsCount: 4 })
    expect(wrapper.querySelector('.content-horizontal-scroller').style.width).toBe('100%')
})



test(`shows less rounds (sets greater width for <horizontal-scroller>)
    when a lesser visibleRoundsCount is supplied via applyNewOptions`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 4 })
    expect(wrapper.querySelector('.content-horizontal-scroller').style.width).toBe('100%')

    pl.applyNewOptions({ visibleRoundsCount: 2 })
    expect(wrapper.querySelector('.content-horizontal-scroller').style.width).toBe('200%')
})



test(`shows more rounds when
    a) a greater visibleRoundsCount is supplied via applyNewOptions
    and b) navigation is at the very right
`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.setBaseRoundIndex(2)
    pl.applyNewOptions({ visibleRoundsCount: 3 })
    expect(wrapper.querySelectorAll('.round-wrapper:not(.collapsed)').length).toBe(3)
})



test(`sets the base round index + tells this index via getNavigationState`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.setBaseRoundIndex(2)
    expect(pl.getNavigationState().baseRoundIndex).toBe(2)

    // first round now should be collapsed:
    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).height).toBe('0px')
})



test(`limits the base round index when setBaseRoundIndex is called with invalid number`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.setBaseRoundIndex(235152)
    expect(pl.getNavigationState().baseRoundIndex).toBe(2);
    pl.setBaseRoundIndex(-23123)
    expect(pl.getNavigationState().baseRoundIndex).toBe(0);
})



test(`moves to next round when "moveToNextRound" is called`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.moveToNextRound()
    expect(pl.getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})



test(`moves to next round when right button is clicked`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    wrapper.querySelector('.navigation-button.non-header-button.right')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(pl.getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})



test(`moves to previous round`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.moveToNextRound()
    pl.moveToPreviousRound()
    expect(pl.getNavigationState().baseRoundIndex).toBe(0)
})



test(`moves next only to the last possible round`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.moveToNextRound()
    pl.moveToNextRound()
    pl.moveToNextRound()
    pl.moveToNextRound()
    pl.moveToNextRound()
    pl.moveToNextRound()
    pl.moveToNextRound()
    pl.moveToNextRound()

    expect(pl.getNavigationState().baseRoundIndex).toBe(2)
})



test(`moves to last round when moveToLastRound is called`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.moveToLastRound()

    expect(pl.getNavigationState().baseRoundIndex).toBe(2)
    expect(pl.getNavigationState().lastRoundIsFullyVisible).toBe(true)
    expect(
        getComputedStyle(wrapper.querySelector('.round-wrapper:last-of-type')).display
    ).not.toBe('none')
})



test(`tells that it reached right edge when it is so`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.moveToNextRound()
    expect(pl.getNavigationState().lastRoundIsFullyVisible).toBe(false)
    pl.moveToNextRound()
    expect(pl.getNavigationState().lastRoundIsFullyVisible).toBe(true)
})



test(`does nothing on navigation-buttons click if all rounds are visible`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 4 })

    wrapper.querySelector('.navigation-button.non-header-button.right')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(pl.getNavigationState().baseRoundIndex).toBe(0)
})



test(`ignores setBaseRoundIndex() if all rounds are visible`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 4 })
    pl.setBaseRoundIndex(4)
    expect(pl.getNavigationState().baseRoundIndex).toBe(0)
})



test(`ignores non-numeric values passed to setBaseRoundIndex()`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.setBaseRoundIndex(1)
    pl.setBaseRoundIndex('shit')
    expect(pl.getNavigationState().baseRoundIndex).toBe(1)
    expect(getComputedStyle(wrapper.querySelectorAll('.round-wrapper')[0]).visibility).toBe('hidden')
    expect(getComputedStyle(wrapper.querySelectorAll('.round-wrapper')[1]).visibility).toBe('visible')
})



test(`ignores NaN passed to setBaseRoundIndex()`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.setBaseRoundIndex(1)
    pl.setBaseRoundIndex(NaN)
    expect(pl.getNavigationState().baseRoundIndex).toBe(1)
    expect(getComputedStyle(wrapper.querySelectorAll('.round-wrapper')[0]).visibility).toBe('hidden')
    expect(getComputedStyle(wrapper.querySelectorAll('.round-wrapper')[1]).visibility).toBe('visible')
})



test(`returns stub values if getNavigationState is called after elements were removed`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)
    wrapper.remove()
    expect(pl.getNavigationState()).toEqual({ lastRoundIsFullyVisible: false, allRoundsAreVisible: false, baseRoundIndex: 0 })
})



test(`getNavigationState tells if allRoundsAreVisible`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 4 })
    expect(pl.getNavigationState().allRoundsAreVisible).toBe(true)
    pl.applyNewOptions({ visibleRoundsCount: 2 })
    expect(pl.getNavigationState().allRoundsAreVisible).toBe(false)
})



// sets marginLeft for content_horizontal_scroller according to base_round_index