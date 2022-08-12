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


test('disables left navigation buttons on initialization', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_header_button).pointerEvents).toBe('none')

    const left_non_header_button =  wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_non_header_button).pointerEvents).toBe('none')
})


test('enables right nav buttons on initialization if rounds count is greater than options.visibleRoundsCount', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_header_button).pointerEvents).toBe('auto')

    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_non_header_button).pointerEvents).toBe('auto')
})

test('disables right nav buttons on initialization if rounds count is <= options.visibleRoundsCount', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        { ...finished_ucl, rounds: finished_ucl.rounds.slice(0, 3) },
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_header_button).pointerEvents).toBe('auto')

    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_non_header_button).pointerEvents).toBe('auto')
})