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

test('hides a number of rounds beyond options.visibleRoundsCount', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const all_rounds = [...document.querySelectorAll('.round-wrapper')]
    const hidden_rounds = all_rounds.filter(w => w.classList.contains('hidden'))
    expect(hidden_rounds.length).toBe(2)
    expect(getComputedStyle(all_rounds[0]).display).not.toBe('none')
    expect(getComputedStyle(all_rounds[3]).display).toBe('none')
})



test('floors the fractional visibleRoundsCount', () => {
    const wrapper = init()

    const { setBaseRoundIndex, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2.5 }
    )

    const all_rounds = [...document.querySelectorAll('.round-wrapper')]
    const visible_rounds = all_rounds.filter(w => !w.classList.contains('hidden'))
    expect(visible_rounds.length).toBe(2)

    setBaseRoundIndex(2)
    expect(getNavigationState().baseRoundIndex).toBe(2)
})




test('survives with negative visibleRoundsCount', () => {
    const wrapper = init()
    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: -2.5 }
    )

    expect(true).toBe(true);
})


test('shows more rounds when a greater visibleRoundsCount is supplied via applyNewOptions', () => {
    const wrapper = init()

    const { applyNewOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    applyNewOptions({ visibleRoundsCount: 4 })

    expect(
        document.querySelectorAll('.round-wrapper:not(.hidden)').length
    ).toBe(4)
})


test('shows less rounds when a lesser visibleRoundsCount is supplied via applyNewOptions', () => {
    const wrapper = init()

    const { applyNewOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 4 }
    )

    applyNewOptions({ visibleRoundsCount: 2 })

    expect(
        document.querySelectorAll('.round-wrapper:not(.hidden)').length
    ).toBe(2)
})



test(`shows more rounds when
    a) a greater visibleRoundsCount is supplied via applyNewOptions
    and b) navigation is at the very right
`, () => {
    const wrapper = init()

    const { applyNewOptions, setBaseRoundIndex } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    setBaseRoundIndex(2)
    applyNewOptions({ visibleRoundsCount: 3 })

    expect(
        document.querySelectorAll('.round-wrapper:not(.hidden)').length
    ).toBe(3)
})



test('sets the base round index + tells this index via getNavigationState', () => {
    const wrapper = init()

    const { setBaseRoundIndex, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    setBaseRoundIndex(2)
    expect(getNavigationState().baseRoundIndex).toBe(2)

    // first round now should be hidden:
    const all_rounds = [...document.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).display).toBe('none')
})



test('limits the base round index when setBaseRoundIndex is called with invalid number', () => {
    const wrapper = init()

    const { setBaseRoundIndex, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    setBaseRoundIndex(235152)
    expect(getNavigationState().baseRoundIndex).toBe(2);
    setBaseRoundIndex(-23123)
    expect(getNavigationState().baseRoundIndex).toBe(0);
})



test('moves to next round when "moveToNextRound" is called', () => {
    const wrapper = init()

    const { moveToNextRound, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    moveToNextRound()
    expect(getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...document.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).display).toBe('none')
    expect(getComputedStyle(all_rounds[2]).display).not.toBe('none')
})


test('moves to next round when right button is clicked', () => {
    const wrapper = init()

    const { getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    document.querySelector('.navigation-button.non-header-button.right')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...document.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).display).toBe('none')
    expect(getComputedStyle(all_rounds[2]).display).not.toBe('none')
})


test('moves to previous round', () => {
    const wrapper = init()

    const { moveToNextRound, moveToPreviousRound, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    moveToNextRound()
    moveToPreviousRound()
    expect(getNavigationState().baseRoundIndex).toBe(0)
})


test('moves next only to the last possible round', () => {
    const wrapper = init()

    const { moveToNextRound, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    moveToNextRound()
    moveToNextRound()
    moveToNextRound()
    moveToNextRound()
    moveToNextRound()
    moveToNextRound()
    moveToNextRound()
    moveToNextRound()

    expect(getNavigationState().baseRoundIndex).toBe(2)
})


test('tells that it reached right edge when it is so', () => {
    const wrapper = init()

    const { moveToNextRound, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    moveToNextRound()
    expect(getNavigationState().reachedRightEdge).toBe(false)
    moveToNextRound()
    expect(getNavigationState().reachedRightEdge).toBe(true)
})




test('does nothing on navigation-buttons click if all rounds are visible', () => {
    const wrapper = init()

    const { getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 4 }
    )

    document.querySelector('.navigation-button.non-header-button.right')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(getNavigationState().baseRoundIndex).toBe(0)
})



test('ignores setBaseRoundIndex() if all rounds are visible', () => {
    const wrapper = init()

    const { setBaseRoundIndex, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 4 }
    )

    setBaseRoundIndex(4)

    expect(getNavigationState().baseRoundIndex).toBe(0)
})