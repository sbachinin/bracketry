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
            sides: [ { score: [ { mainScore: 'Rt' } ] } ]
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
            sides: [ { score: [ { mainScore: 12 } ] } ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score .main-score').textContent).toBe('12')
})




test(`renders no <side-own-single-score>s when neither side has a score array`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [ {}, {} ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score')).toBe(null)
})



test(`renders no <side-own-single-score>s when both sides have EMPTY score arrays`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [ { score: [] }, { score: [] } ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score')).toBe(null)
})


test(`renders <side-own-single-score>s for both sides when ONLY 1 side has a score array`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            sides: [ {}, { score: [{ mainScore: 'Rt' }] } ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.side-own-single-score').length).toBe(2)
})


test(`renders empty <side-own-single-score> for an empty side.score when other side has a score entry`, () => {
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
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .side-own-single-score').textContent).toBe('')
})



test(`renders a score even if side has no "contestantId"`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [ { score: [{ mainScore: '12' }] } ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-own-single-score').textContent).toBe('12')
})


test(`renders as much <single-score-wrapper>s as the longest score length of both sides
(regardless of validity of single score entries)`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [
                {
                    contestantId: 'c1',
                    score: [
                        { mainScore: '1' },
                        NaN,
                        { },
                        { mainScore: '3' }
                    ]
                },
                {
                    contestantId: 'c2',
                    score: [
                        { mainScore: '1' },
                        { mainScore: '4' },
                    ]
                }
            ]
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="c1"] .single-score-wrapper').length).toBe(4)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="c2"] .single-score-wrapper').length).toBe(4)
})



test(`renders player title if side has no score array`, () => {
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


test(`should not render 'NaN' for mainScore`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ score: [{ mainScore: NaN }] }]}]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.main-score').textContent).toBe('')
})


test(`renders empty <side-own-single-score>s for undefined score entries, does not throw`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [
            { contestantId: 'c1', score: [ undefined, { mainScore: '4' } ] },
            { contestantId: 'c2', score: [ { mainScore: '2' }, undefined ] }
        ]}]
    }

    let pl = null
    const try_init = () => { pl = init(data) }

    expect(try_init).not.toThrow()

    const first_side_own_scores = pl.wrapper.querySelectorAll('.side-wrapper[contestant-id="c1"] .side-own-single-score')
    const second_side_own_scores = pl.wrapper.querySelectorAll('.side-wrapper[contestant-id="c2"] .side-own-single-score')
    expect(first_side_own_scores[0].textContent.trim()).toBe('')
    expect(first_side_own_scores[1].textContent.trim()).toBe('4')
    expect(second_side_own_scores[0].textContent.trim()).toBe('2')
    expect(second_side_own_scores[1].textContent.trim()).toBe('')
})
 
test(`renders empty <side-own-single-score> for other invalid entries, does not throw`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [
            { score: [
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
                { mainScore: true},
                { mainScore: false},
                { mainScore: []},
                { mainScore: Object},
                { mainScore: Element},
                { tieBreak: NaN },
                { tieBreak: null },
                { tieBreak: true},
                { tieBreak: false},
                { tieBreak: []},
                { tieBreak: Object},
                { tieBreak: Element}
            ]},
        ]}]
    }

    let pl = null
    const try_init = () => { pl = init(data) }

    expect(try_init).not.toThrow()

    expect(pl.wrapper.querySelectorAll('.side-own-single-score').length).toBe(23)
    expect(pl.wrapper.querySelectorAll('.side-own-single-score .main-score:empty').length).toBe(23)
    expect(pl.wrapper.querySelectorAll('.side-own-single-score .tie-break').length).toBe(0)
})






























// TIEBREAK

test(`renders valid tieBreak even without mainScore`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ score: [{ tieBreak: 32 }] }] }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.tie-break').textContent).toBe('32')
})

test(`renders valid tieBreak even if mainScore is invalid`, () => {
    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ score: [{ mainScore: Object, tieBreak: 32 }] }] }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.tie-break').textContent).toBe('32')
})



test(`renders a contentful match without .tie-break if score.tieBreak is of invalid (non-number) type`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ score: [{ mainScore: '6', tieBreak: 'i am an idiot' }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.main-score')).not.toBe(null)
    expect(wrapper.querySelector('.tie-break')).toBe(null)
    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `If you provide side.score.tieBreak, it must be a number`
    )
})


test(`renders mainScore if tieBreak is invalid`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ score: [{ mainScore: '6', tieBreak: 'i am an idiot' }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.main-score').textContent).toBe('6')
})



test(`renders <single-score-wrapper> semi-transparent when score entry HAS NOT { isWinner: true }`, () =>  {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [ { contestantId: 'c1', score: [{ mainScore: '6' }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .single-score-wrapper')
        ).opacity
    ).toBe('0.54')
})

test(`renders <single-score-wrapper> opaque when score entry HAS { isWinner: true }`, () =>  {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [ { contestantId: 'c1', score: [{ isWinner: true, mainScore: '6' }] }]
        }]
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"] .single-score-wrapper')
        ).opacity
    ).toBe('')
})



