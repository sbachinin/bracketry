/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)



test(`renders a string for mainScore`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [{ scores: [{ mainScore: 'Rt' }] }]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score .main-score').textContent).toBe('Rt')
})


test(`renders a number for mainScore`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [{ scores: [{ mainScore: 12 }] }]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score .main-score').textContent).toBe('12')
})


test(`renders no <side-own-single-score>s when neither side has a scores array`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [{}, {}]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score')).toBe(null)
})


test(`renders no <side-own-single-score>s when both sides have EMPTY scores arrays`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [{ scores: [] }, { scores: [] }]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score')).toBe(null)
})


test(`renders empty <side-own-single-score> for an empty side.scores when other side has a scores entry`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    contestantId: 'c1',
                    scores: [{ mainScore: 'Walkover' }]
                },
                {
                    contestantId: 'c2',
                    scores: []
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .side-own-single-score').textContent).toBe('')
})


test(`renders scores even if side has no "contestantId"`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ scores: [{ mainScore: '12' }] }]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score').textContent).toBe('12')
})


test(`renders as much <single-score-wrapper>s as the longest scores length of both sides`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    contestantId: 'c1',
                    scores: [
                        { mainScore: '1' },
                        {},
                        { mainScore: '3' }
                    ]
                },
                {
                    contestantId: 'c2',
                    scores: [
                        { mainScore: '1' },
                        { mainScore: '4' },
                    ]
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="c1"] .single-score-wrapper').length).toBe(3)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="c2"] .single-score-wrapper').length).toBe(3)
})


test(`renders player title if side has no scores array`, () => {

    expect.assertions(1)

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }]
        }],
        contestants: {
            c1: { players: [{ title: 'josh' }] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.player-title').textContent).toBe('josh')
})


test(`renders subscore if there's valid mainScore and valid subscore`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ scores: [{ mainScore: '6', subscore: 7 }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.subscore').textContent).toBe('7')
})


test(`renders no .single-score-wrapper for various invalid score entries`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    scores: [
                        undefined,
                        NaN,
                        null,
                        true,
                        false,
                        12,
                        [],
                        Object,
                        Element,
                        { mainScore: NaN },
                        { mainScore: null },
                        { mainScore: true },
                        { mainScore: false },
                        { mainScore: [] },
                        { mainScore: Object },
                        { mainScore: Element },
                        { subscore: NaN },
                        { subscore: null },
                        { subscore: true },
                        { subscore: false },
                        { subscore: [] },
                        { subscore: Object },
                        { subscore: Element }
                    ]
                },
            ]
        }]
    }

    let br = null
    const try_init = () => { br = init(data) }

    expect(try_init).not.toThrow()

    expect(br.wrapper.querySelectorAll('.side-own-single-score').length).toBe(0)
})






























// SUBSCORE

test(`renders no subscore if no mainScore`, () => {

    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ scores: [{ subscore: 32 }] }] }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.subscore')).toBe(null)
})


test(`renders .single-score-wrapper for both sides if one of them has mainScore`, () => {

    const data = {
        rounds: [{}],
        matches: [
            {
                roundIndex: 0, order: 0, sides: [
                    { contestantId: 'c1' },
                    { contestantId: 'c2', scores: [{ mainScore: 32 }] }
                ]
            }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .main-score')).not.toBe(null)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .main-score')).not.toBe(null)
})


test(`renders valid mainScore even if subscore is invalid`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ scores: [{ mainScore: '6', subscore: Array }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.main-score').textContent).toBe('6')
    expect(wrapper.querySelector('.subscore')).toBe(null)
    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `If you provide "subscore", it must be a number or a string`
    )
})


// does not render NaN subscore
test(`does not render <subscore> if subscore is NaN`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ scores: [{ mainScore: '6', subscore: NaN }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.subscore')).toBe(null)
})








// WINNER SCORE

test(`renders <single-score-wrapper> semi-transparent when score entry HAS NOT { isWinner: true }`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [{ mainScore: '6' }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .single-score-wrapper')
        ).opacity
    ).toBe('0.54')
})


test(`renders <single-score-wrapper> opaque when score entry HAS { isWinner: true }`, () => {

    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [{ isWinner: true, mainScore: '6' }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .single-score-wrapper')
        ).opacity
    ).toBe('')
})

