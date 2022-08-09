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
    expect(hidden_rounds.length).toBe(2);
    expect(getComputedStyle(all_rounds[0]).display).not.toBe('none')
    expect(getComputedStyle(all_rounds[3]).display).toBe('none')
});





test('sets the base round index + tells this index via getNavigationState', () => {
    const wrapper = init()

    const { setBaseRoundIndex, getNavigationState } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    setBaseRoundIndex(2)
    expect(getNavigationState().baseRoundIndex).toBe(2);

    // first round now should be hidden:
    const all_rounds = [...document.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).display).toBe('none')
});



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
});



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
});


test('moves to next round when right button is clicked', () => {
    const wrapper = init()

    const { moveToNextRound, getNavigationState } = easyPlayoffs.createPlayoffs(
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
});


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
});


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
});


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
});


