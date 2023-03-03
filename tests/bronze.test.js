/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test(`does not render bronze-round-wrapper if there is no bronze match`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0 }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.bronze-round-wrapper')).toBe(null)
    expect(wrapper.querySelectorAll('.round-wrapper .match-wrapper').length).toBe(1)
})



test(`renders bronze-round-wrapper if there IS a bronze match`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0 },
            { roundIndex: 0, order: 1, isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.bronze-round-wrapper')).not.toBe(null)
})



test(`does not render bronze-round-wrapper if isBronzeMatch not boolean`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0 },
            { roundIndex: 0, order: 1, isBronzeMatch: 'true' },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.bronze-round-wrapper')).toBe(null)
})



test(`renders 2 matches within bronze-round-wrapper`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0 },
            { roundIndex: 0, order: 1, isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.bronze-round-wrapper .round-wrapper .match-wrapper').length).toBe(2)
})



test(`first renders final match, then bronze match`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            { roundIndex: 0, order: 1, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data)
    const m_wrs = wrapper.querySelectorAll('.bronze-round-wrapper .round-wrapper .match-wrapper')
    expect(m_wrs[0].querySelector('.side-wrapper[contestant-id="John"]')).not.toBe(null)
    expect(m_wrs[1].querySelector('.side-wrapper[contestant-id="Pete"]')).not.toBe(null)
})

