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
                round_index: 0,
                order: 0,
                sides: [
                    { contestant_id: 'c1', score: [] },
                    { contestant_id: 'c2', score: [{ main_score: 'Rt' }] }
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
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .score')).toBe(null)
})


test('can draw asymmetrical scores where ONLY ONE SIDE has a score array', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1',
                round_index: 0,
                order: 0,
                sides: [
                    { contestant_id: 'c1' },
                    { contestant_id: 'c2', score: [{ main_score: 'Rt' }] }
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
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .score')).toBe(null)
})


test('renders a contentful match even if "contestants" are undefined', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323',
                round_index: 0,
                order: 0,
                sides: [{ contestant_id: 'abc' }],
                match_status: 'Scheduled'
            }],
        },
        wrapper,
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
});


test(`renders a contentful match even if "contestants" don't contain such contestant_id`, () => {
    const wrapper = create_wrapper()
    expect.assertions(2)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323',
                round_index: 0,
                order: 0,
                sides: [{ contestant_id: 'abc' }],
                match_status: 'Scheduled'
            }],
            contestants: {
                c1: { players: [{ title: 'Josh' }] }
            }
        },
        wrapper,
    )

    expect(consoleWarn.mock.calls[0][0]).toMatch(
        `No contestant data found for this side.contestant_id`
    )
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
})

test('renders a contentful match even if match.sides is undefined', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', round_index: 0, order: 0, match_status: 'Scheduled' }],
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
            matches: [{ id: 'm1', round_index: 0, order: 0, sides: [], match_status: 'Scheduled' }],
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
            matches: [{ id: '32323', round_index: 0, order: 0, sides: [{}, {}], match_status: 'Scheduled' }],
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
                id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }]
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
                id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'c1' }],
                match_status: 'Scheduled'
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
            matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{}] }],
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
                id: 'm1', round_index: 0, order: 0,
                sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }, { contestant_id: 'c3' }],
                match_status: 'Scheduled'
            }],
        },
        wrapper
    )
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"]')).not.toBe(null)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"]')).not.toBe(null)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c3"]')).toBe(null)
})


test(`does not add "contestant-id" attribute to .side-wrapper when match.sides[i] has no "contestant_id"`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', round_index: 0, order: 0, sides: [
                    { score: [{ main_score: 'Walkover' }] }
                ]
            }],
        },
        wrapper
    )

    expect(wrapper.querySelector('.side-wrapper:first-child').getAttribute('contestant-id')).toBe(null)
    expect(wrapper.querySelector('.side-wrapper:last-child').getAttribute('contestant-id')).toBe(null)
})


test(`allows clicks on a .side-wrapper which has a contestant_id (even if no contestant data for such id)`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', round_index: 0, order: 0,
                sides: [{ contestant_id: 'c1' }]
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


test(`forbids clicks on a side-wrapper without contestant_id`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        },
        wrapper
    )

    expect(
        getComputedStyle(
            wrapper.querySelectorAll('.side-wrapper')[1]
        ).pointerEvents
    ).toBe('none')
})



test(`does not render a .score element for a side which has 0 items in "score" array`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', round_index: 0, order: 0, sides: [
                    {
                        contestant_id: 'c1',
                        score: [{ main_score: 'Walkover' }]
                    },
                    {
                        contestant_id: 'c2',
                        score: []
                    }
                ]
            }],
        },
        wrapper
    )

    expect(
        wrapper.querySelector('.side-wrapper[contestant-id="c2"] .score')
    ).toBe(null)
})



test(`renders a score even if side has no "contestant_id"`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', round_index: 0, order: 0, sides: [
                    {
                        score: [{ main_score: 'Walkover' }]
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



test(`draws a score even if contestant not found for such side`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', round_index: 0, order: 0, sides: [
                    {
                        contestant_id: 'c1',
                        score: [{ main_score: 'Walkover' }]
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



    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1', round_index: 0, order: 0, sides: [
                    { score: [{ main_score: 'Walkover' }] }
                ]
            }],
        },
        wrapper
    )

    expect(wrapper.querySelector('.side-wrapper:first-child').getAttribute('contestant-id')).toBe(null)
    expect(wrapper.querySelector('.side-wrapper:last-child').getAttribute('contestant-id')).toBe(null)
})




// TODO does not render a match with irrelevant round_index and order

// TODO (in case of duplicate matches in a given position) render only 1st match in such position



// TODO test match_status OR score (REALLY NECESSARY?)

// TODO draws a winner mark for a side which has { is_winner: true }


// TODO does not draw a winner mark when neither side has { is_winner: true }



// TODO does not render nationalies if not provided
// TODO does not render entry statuses if not provided

// TODO test tie break

// TODO test subscore





// TODO renders unclickable a match without id
    // (removed {pointer-events: auto} for such matches; need to make sure that clicks on such matches don't confuse highlighting)
    // THINK: DO I NEED MATCH.ID AT ALL?

// TODO renders 'BYE' contestant