/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default

const create_wrapper = () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)

test('can draw asymmetrical scores where two sides have different number of elements in score array', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1',
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
        },
        wrapper
    )
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .main-score').textContent).toBe('Rt')
    // .score element is not rendered for a side with empty "score" array
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-scores').textContent).toBe('')
})


test('can draw asymmetrical scores where ONLY ONE SIDE has a score array', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1',
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
        },
        wrapper
    )
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .main-score').textContent).toBe('Rt')
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-scores').textContent).toBe('')
})


test('renders a contentful match even if "contestants" are undefined', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323',
                roundIndex: 0,
                order: 0,
                sides: [{ contestantId: 'abc' }],
                matchStatus: 'Scheduled'
            }],
        },
        wrapper,
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
});


test(`renders a contentful match even if "contestants" don't contain such contestantId`, () => {
    const wrapper = create_wrapper()
    expect.assertions(2)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323',
                roundIndex: 0,
                order: 0,
                sides: [{ contestantId: 'abc' }],
                matchStatus: 'Scheduled'
            }],
            contestants: {
                c1: { players: [{ title: 'Josh' }] }
            }
        },
        wrapper,
    )

    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `No contestant data found for this side.contestantId`
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
})

test('renders a contentful match even if match.sides is undefined', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', roundIndex: 0, order: 0, matchStatus: 'Scheduled' }],
        },
        wrapper
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
})

test('renders a contentful match even if match.sides is an empty array', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [], matchStatus: 'Scheduled' }],
        },
        wrapper
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
})



test('renders a contentful match if match.sides contains empty objects', () => {
    const wrapper = create_wrapper()
    expect.assertions(1)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: '32323', roundIndex: 0, order: 0, sides: [{}, {}], matchStatus: 'Scheduled' }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
});



test('renders a contentful match if side.score is an empty array', () => {
    const wrapper = create_wrapper()
    expect.assertions(2)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323', roundIndex: 0, order: 0,
                sides: [{ contestantId: 'contestant1', score: [] }]
            }
            ],
            contestants: {
                contestant1: { players: [{ title: 'john' }] }
            }
        },
        wrapper,
        {}
    )


    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `side.score is provided but it's an empty array`
    )
    expect(wrapper.querySelector('.player-title').textContent).toBe('john')
});



test('renders a contentful match if contestant.players is an empty array', () => {
    const wrapper = create_wrapper()
    expect.assertions(2)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323', roundIndex: 0, order: 0,
                sides: [{ contestantId: 'c1' }],
                matchStatus: 'Scheduled'
            }
            ],
            contestants: {
                c1: { players: [] }
            }
        },
        wrapper,
        {}
    )

    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `contestant.players must contain at least one element`
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
});


test(`renders 2 .side-wrapper elements if match.sides contains only 1 object`, () => {
    // (two side-wrappers are necessary for vertical alignment)
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{}] }],
        },
        wrapper
    )
    expect(wrapper.querySelectorAll('.match-body .side-wrapper').length).toBe(2)
})


test(`renders 2 .side-wrapper elements if match.sides contains more items`, () => {
    const wrapper = create_wrapper()
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0,
                sides: [{ contestantId: 'c1' }, { contestantId: 'c2' }, { contestantId: 'c3' }],
                matchStatus: 'Scheduled'
            }],
        },
        wrapper
    )
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"]')).not.toBe(null)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"]')).not.toBe(null)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c3"]')).toBe(null)
})


test(`does not add "contestant-id" attribute to .side-wrapper when match.sides[i] has no "contestantId"`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [
                    { score: [{ mainScore: 'Walkover' }] }
                ]
            }],
        },
        wrapper
    )

    expect(wrapper.querySelector('.side-wrapper:first-child').getAttribute('contestant-id')).toBe(null)
    expect(wrapper.querySelector('.side-wrapper:last-child').getAttribute('contestant-id')).toBe(null)
})


test(`allows clicks on a .side-wrapper which has a contestantId (even if no contestant data for such id)`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0,
                sides: [{ contestantId: 'c1' }]
            }],
        },
        wrapper
    )

    expect(
        getComputedStyle(
            wrapper.querySelector('.side-wrapper[contestant-id="c1"]')
        ).pointerEvents
    ).toBe('auto')
})


test(`forbids clicks on a side-wrapper without contestantId`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        },
        wrapper
    )

    expect(
        getComputedStyle(
            wrapper.querySelectorAll('.side-wrapper')[1]
        ).pointerEvents
    ).toBe('none')
})



test(`does not render scores for a side which has 0 items in "score" array`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [
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
        },
        wrapper
    )

    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .side-scores').textContent).toBe('')
})



test(`renders a score even if side has no "contestantId"`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [
                    {
                        score: [{ mainScore: 'Walkover' }]
                    }
                ]
            }],
        },
        wrapper
    )


    expect(
        wrapper.querySelector('.side-wrapper:first-of-type .side-own-score').textContent.trim()
    ).toBe('Walkover')
})



test(`renders score even if contestant not found for such side`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [
                    {
                        contestantId: 'c1',
                        score: [{ mainScore: 'Walkover' }]
                    }
                ]
            }],
        },
        wrapper
    )

    expect(
        wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-own-score').textContent.trim()
    ).toBe('Walkover')
})


test(`renders .single-score element only for side.score items which have "mainScore"`, () => {
    const wrapper = create_wrapper()
    expect.assertions(2)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [
                    {
                        contestantId: 'c1',
                        score: [{ mainScore: 'Walkover' }, { tieBreak: 12 }]
                    }
                ]
            }],
        },
        wrapper
    )

    expect(wrapper.querySelectorAll('.main-score').length).toBe(1)
    expect(wrapper.querySelector('.main-score').textContent).toBe('Walkover')
})


test(`renders as much .single-score elements as there are valid items in side.score`, () => {
    const wrapper = create_wrapper()
    expect.assertions(2)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [
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
        },
        wrapper
    )

    expect(wrapper.querySelectorAll('.main-score').length).toBe(4)
    expect(wrapper.querySelectorAll('.main-score')[1].textContent).toBe('444')
})



test(`renders player title if any of side.score items has no "mainScore (and warns in console)`, () => {
    const wrapper = create_wrapper()
    expect.assertions(1)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', score: [{}] }]
            }],
            contestants: {
                c1: { players: [{ title: 'josh' }] }
            }
        },
        wrapper
    )

    expect(wrapper.querySelector('.player-title').textContent).toBe('josh')
})

test(`renders tie break if there is a valid one`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [{ score: [{ mainScore: '6', tieBreak: 7 }] }]
            }]
        },
        wrapper
    )
    
    expect(wrapper.querySelector('.tie-break').textContent).toBe('7')
})

test(`renders a contentful match without .tie-break if score.tieBreak is of invalid (non-number) type`, () => {
    const wrapper = create_wrapper()
    expect.assertions(3)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', score: [{ mainScore: '6', tieBreak: 'jopa' }] }]
            }],
            contestants: {
                c1: { players: [] }
            }
        },
        wrapper
    )

    expect(typeof wrapper.querySelector('.main-score')).toBe('object')
    expect(wrapper.querySelector('.tie-break')).toBe(null)
    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `If you provide side.score.tieBreak, it must be a number`
    )
})


test('renders side.title into .player-title element if side has no "contestantId"', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ title: 'BYE' }] }]
        },
        wrapper
    )

    expect(wrapper.querySelector('.player-title').textContent).toBe('BYE')
})

test('does not render side.title if side has both "title" and "contestantId"', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ title: 'BYE', contestantId: 'c1' }] }],
            contestants: {
                c1: { players: [ { title: 'Pete' } ] }
            }
        },
        wrapper
    )

    expect(wrapper.querySelector('.side-title')).toBe(null)
    expect(wrapper.querySelector('.player-title').textContent.trim()).toBe('Pete')
})


test('does not render word "undefined" if contestants[i].players[j] has no title', () => {
    const wrapper = create_wrapper()
    
    const data = {
        rounds: [{}],
        matches: [ { id: 'm1', roundIndex: 0, order: 0, sides: [ { contestantId: 'c1'} ] } ],
        contestants: { c1: { players: [ {}] } }
    }

    createPlayoffs(data, wrapper, { visibleRoundsCount: 1 })

    expect(wrapper.querySelector('.player-title').textContent.trim()).toBe('')
})


// TODO split this file





// TODO does not render a match with irrelevant roundIndex and order

// TODO (in case of duplicate matches in a given position) render only 1st match in such position



// TODO test matchStatus OR score (REALLY NECESSARY?)

// TODO draws a winner mark for a side which has { isWinner: true }


// TODO does not draw a winner mark when neither side has { isWinner: true }



// TODO test subscore





// TODO renders unclickable a match without id
    // (removed {pointer-events: auto} for such matches; need to make sure that clicks on such matches don't confuse highlighting)
    // THINK: DO I NEED MATCH.ID AT ALL?
