/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)




test('can draw asymmetrical scores where two sides have different number of elements in score array', () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [
                { contestantId: 'c1', score: [] },
                { contestantId: 'c2', score: [{ mainScore: 'Rt' }] }
            ]
        }],
        contestants: {
            c1: { players: [{ title: 'John' }] },
            c2: { players: [{ title: 'Pete' }] }
        }
    }

    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .main-score').textContent).toBe('Rt')
    // .score element is not rendered for a side with empty "score" array
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-scores').textContent).toBe('')
})


test('can draw asymmetrical scores where ONLY ONE SIDE has a score array', () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [
                { contestantId: 'c1' },
                { contestantId: 'c2', score: [{ mainScore: 'Rt' }] }
            ]
        }],
        contestants: {
            c1: { players: [{ title: 'John' }] },
            c2: { players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .main-score').textContent).toBe('Rt')
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-scores').textContent).toBe('')
})


test(`does not render scores for a side which has 0 items in "score" array`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    contestantId: 'c1',
                    score: [{ mainScore: 'Walkover' }]
                },
                {
                    contestantId: 'c2',
                    score: []
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .side-scores').textContent).toBe('')
})



test(`renders a score even if side has no "contestantId"`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    score: [{ mainScore: 'Walkover' }]
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(
        wrapper.querySelector('.side-wrapper:first-of-type .side-own-score').textContent.trim()
    ).toBe('Walkover')
})



test(`renders score even if contestant not found for such side`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    contestantId: 'c1',
                    score: [{ mainScore: 'Walkover' }]
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(
        wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-own-score').textContent.trim()
    ).toBe('Walkover')
})


test(`renders .single-score element only for side.score items which have "mainScore"`, () => {
    expect.assertions(2)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    contestantId: 'c1',
                    score: [{ mainScore: 'Walkover' }, { tieBreak: 12 }]
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.main-score').length).toBe(1)
    expect(wrapper.querySelector('.main-score').textContent).toBe('Walkover')
})


test(`renders as much .single-score elements as there are valid items in side.score`, () => {
    expect.assertions(2)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    contestantId: 'c1',
                    score: [
                        { mainScore: 'Walkover' },
                        { tieBreak: 12 },
                        { mainScore: '444' },
                        { mainScore: '323', tieBreak: 21 },
                        { mainScore: '323', isWinner: true }
                    ]
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.main-score').length).toBe(4)
    expect(wrapper.querySelectorAll('.main-score')[1].textContent).toBe('444')
})



test(`renders player title if any of side.score items has no "mainScore (and warns in console)`, () => {
    expect.assertions(1)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', score: [{}] }]
        }],
        contestants: {
            c1: { players: [{ title: 'josh' }] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.player-title').textContent).toBe('josh')
})

test(`renders tie break if there is a valid one`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ score: [{ mainScore: '6', tieBreak: 7 }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.tie-break').textContent).toBe('7')
})

test(`renders a contentful match without .tie-break if score.tieBreak is of invalid (non-number) type`, () => {
    expect.assertions(3)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', score: [{ mainScore: '6', tieBreak: 'jopa' }] }]
        }],
        contestants: {
            c1: { players: [] }
        }
    }
    const { wrapper } = init(data)
    expect(typeof wrapper.querySelector('.main-score')).toBe('object')
    expect(wrapper.querySelector('.tie-break')).toBe(null)
    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `If you provide side.score.tieBreak, it must be a number`
    )
})
