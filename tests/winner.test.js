/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`does not add a "winner" class to a side-wrapper for which isWinner is false`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"].winner')).toBe(null)
})


test(`adds "winner" class to a side-wrapper for which isWinner is true`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', isWinner: true }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"].winner')).not.toBe(null)
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
