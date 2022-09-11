/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test(`renders a contentful match even if "contestants" are undefined`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [{ contestantId: 'abc' }],
            matchStatus: 'Scheduled'
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
});


test(`renders a contentful match even if "contestants" don't contain such contestantId`, () => {
    expect.assertions(2)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [{ contestantId: 'abc' }],
            matchStatus: 'Scheduled'
        }],
        contestants: {
            c1: { players: [{ title: 'Josh' }] }
        }
    }
    const { wrapper } = init(data)

    expect(consoleWarn.mock.calls[0][0]).toMatch(`No contestant data found for this side.contestantId`)
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
})

test(`renders a contentful match even if match.sides is undefined`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, matchStatus: 'Scheduled' }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
})

test(`does not render .sides when match.sides is undefined`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.sides')).toBe(null)
})


test(`disables pointer-events for a .match-body that has data but no actual content`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }],
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(wrapper.querySelector('.match-body')).pointerEvents).toBe('none')
})


test(`renders a contentful match even if match.sides is an empty array`, () => {
    const data ={
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [], matchStatus: 'Scheduled' }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
})



test(`renders a contentful match if match.sides contains empty objects`, () => {
    expect.assertions(1)

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{}, {}], matchStatus: 'Scheduled' }],
        contestants: {}
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
});



test(`renders a contentful match if side.score is an empty array`, () => {
    expect.assertions(2)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0,
            sides: [{ contestantId: 'contestant1', score: [] }]
        }
        ],
        contestants: {
            contestant1: { players: [{ title: 'john' }] }
        }
    }
    const { wrapper } = init(data)

    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `side.score is provided but it's an empty array`
    )
    expect(wrapper.querySelector('.player-title').textContent).toBe('john')
});



test(`renders a contentful match if contestant.players is an empty array`, () => {
    expect.assertions(2)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0,
            sides: [{ contestantId: 'c1' }],
            matchStatus: 'Scheduled'
        }
        ],
        contestants: {
            c1: { players: [] }
        }
    }
    const { wrapper } = init(data)

    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `contestant.players must contain at least one element`
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
});


test(`renders 2 .side-wrapper elements if match.sides contains only 1 object`, () => {
    // (two side-wrappers are necessary for vertical alignment)
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{}] }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.match-body .side-wrapper').length).toBe(2)
})


test(`renders 2 .side-wrapper elements if match.sides contains more items`, () => {
    expect.assertions(3)
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0,
            sides: [{ contestantId: 'c1' }, { contestantId: 'c2' }, { contestantId: 'c3' }],
            matchStatus: 'Scheduled'
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"]')).not.toBe(null)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"]')).not.toBe(null)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c3"]')).toBe(null)
})


test(`does not add "contestant-id" attribute to .side-wrapper when match.sides[i] has no "contestantId"`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                { score: [{ mainScore: 'Walkover' }] }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper:first-child').getAttribute('contestant-id')).toBe(null)
    expect(wrapper.querySelector('.side-wrapper:last-child').getAttribute('contestant-id')).toBe(null)
})


test(`allows clicks on a .side-wrapper which has a contestantId (even if no contestant data for such id)`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"]')
        ).pointerEvents
    ).toBe('auto')
})


test(`forbids clicks on a side-wrapper without contestantId`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelectorAll('.side-wrapper')[1]
        ).pointerEvents
    ).toBe('none')
})



test(`renders side.title into .player-title element if side has no "contestantId"`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ title: 'BYE' }] }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.player-title').textContent).toBe('BYE')
})

test(`does not render side.title if side has both "title" and "contestantId"`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ title: 'BYE', contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [ { title: 'Pete' } ] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-title')).toBe(null)
    expect(wrapper.querySelector('.player-title').textContent.trim()).toBe('Pete')
})


test(`does not render word "undefined" if contestants[i].players[j] has no title`, () => {
    const data = {
        rounds: [{}],
        matches: [ { roundIndex: 0, order: 0, sides: [ { contestantId: 'c1'} ] } ],
        contestants: { c1: { players: [ {}] } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.player-title').textContent.trim()).toBe('')
})



test(`does not render .match-status if match.matchStatus is undefined`, () => {
    const data = {
        rounds: [{}],
        matches: [ { roundIndex: 0, order: 0 } ],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-status')).toBe(null)
})

test(`does not render .match-status if match.matchStatus is a non-string`, () => {
    const data = {
        rounds: [{}],
        matches: [ { roundIndex: 0, order: 0, matchStatus: {} } ],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-status')).toBe(null)
    expect(consoleWarn.mock.calls[0][0]).toMatch('Match.matchStatus must be a string')
})

test(`does not render match-status if match.matchStatus is an empty string`, () => {
    const data = {
        rounds: [{}],
        matches: [ { roundIndex: 0, order: 0, matchStatus: '' } ],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-status')).toBe(null)
})


test(`does not render a match with irrelevant roundIndex and order`, () => {
    const data = {
        rounds: [{}],
        matches: [ { roundIndex: 12, order: 12, matchStatus: 'WC' } ],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})



// TODO split this file






// TODO (in case of duplicate matches in a given position) render only 1st match in such position



// TODO draws a winner mark for a side which has { isWinner: true }


// TODO does not draw a winner mark when neither side has { isWinner: true }





