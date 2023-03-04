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


test(`renders default title for bronze match`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            { roundIndex: 0, order: 1, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data)
    const m_wrs = wrapper.querySelectorAll('.bronze-round-wrapper .round-wrapper .match-wrapper')
    expect(m_wrs[1].querySelector('.match-top').textContent).toBe('3RD PLACE')
})


test(`does not render default title for bronze match if getMatchTopHTML is specified`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            { roundIndex: 0, order: 1, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data, { getMatchTopHTML: () => '' })
    const m_wrs = wrapper.querySelectorAll('.bronze-round-wrapper .round-wrapper .match-wrapper')
    expect(m_wrs[1].querySelector('.match-top')).toBe(null)
})



test(`does not render bronze-round-wrapper when bronze match has irrelevant roundIndex and order`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            { roundIndex: 20, order: 31, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.bronze-round-wrapper')).toBe(null)
})

test(`does not render bronze-round-wrapper when bronze match has no roundIndex`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            { order: 1, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.bronze-round-wrapper')).toBe(null)
})


test(`does not render bronze-round-wrapper when bronze match has no order`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            { roundIndex: 0, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.bronze-round-wrapper')).toBe(null)
})


test(`calls onMatchClick with a data of bronze match`, () => {

    const onMatchClick = jest.fn()

    const brnzm = { roundIndex: 0, order: 1, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true }

    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            brnzm,
        ]
    }
    const { wrapper } = init(data, { onMatchClick })

    wrapper.querySelector(
        '.round-wrapper[round-index="0"] .match-wrapper[match-order="1"] .match-body'
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(onMatchClick).toBeCalledWith(expect.objectContaining(brnzm))
})


test(`bronze match is due updated when applyMatchesUpdates is called`, () => {

    const brnzm = {
        roundIndex: 0,
        order: 1,
        sides: [{ contestantId: 'Pete', scores: [ { mainScore: 1 }] }],
        isBronzeMatch: true
    }

    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            brnzm,
        ]
    }
    const { wrapper, bracket: br } = init(data)

    br.applyMatchesUpdates([{
        ...brnzm,
        sides: [{ contestantId: 'Pete', scores: [ { mainScore: 222 }] }],
    }])

    expect(wrapper.querySelector('.match-wrapper[match-order="1"] .main-score').textContent).toBe('222')
})


test(`bronze match is due highlighted when its side is clicked`, () => {

    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'John' }] },
            { roundIndex: 0, order: 1, sides: [{ contestantId: 'Pete' }], isBronzeMatch: true },
        ]
    }

    const { wrapper } = init(data)

    wrapper.querySelector(
        '.side-wrapper[contestant-id="Pete"]'
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelector('.match-wrapper[match-order="1"].highlighted')).not.toBe(null)
})
