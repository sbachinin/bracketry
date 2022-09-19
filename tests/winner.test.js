/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`draws a winner mark without {display: none} for a side which has { isWinner: true }`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', isWinner: true }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .winner-mark')
        ).display
    ).not.toBe('none')
})


test(`applies { display: none } to a <winner-mark> of a side which has no 'isWinner' property`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .winner-mark')
        ).display
    ).toBe('none')
})


test(`applies { display: none } to a <winner-mark> of a side which has { isWinner: false }`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', isWinner: false }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .winner-mark')
        ).display
    ).toBe('none')
})


test(`applies { display: none } to a <winner-mark> of a side which has a non-boolean truthy 'isWinner' property`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', isWinner: 3123213 }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .winner-mark')
        ).display
    ).toBe('none')
})


test(`adds 'looser' class to a side whose opponent has {isWinner: true}`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', isWinner: true }, { contestantId: 'c2' }]
        }],
        contestants: {
            c2: { players: [{ title: 'Josh' }] }
        }
    }
    const { wrapper } = init(data)
    expect(
        wrapper.querySelector('.side-wrapper[contestant-id="c2"]').classList.contains('looser')
    ).toBe(true)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c2"] .player-title')
        ).opacity
    ).toBe('0.54')
})
