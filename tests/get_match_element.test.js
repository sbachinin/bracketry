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



test('does not render .sides element if match.sides is undefined', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', round_index: 0, order: 0 }],
        },
        wrapper
    )
    expect(wrapper.querySelector('.match-body .sides')).toBe(null)
})

test('does not render .sides element if match.sides is an empty array', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', round_index: 0, order: 0, sides: [] }],
        },
        wrapper
    )
    expect(wrapper.querySelector('.match-body .sides')).toBe(null)
})


test('renders .sides element if match.sides array contains at least one item', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{}] }],
        },
        wrapper
    )
    expect(wrapper.querySelector('.match-body .sides')).not.toBe(null)
})

test(`renders two .side-wrapper elements even if match.sides contains only 1 side`, () => {
    // (two sides are necessary for vertical alignment)
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


test(`allow clicks on a .side-wrapper which has a contestant_id (even if no contestant data for such id)`, () => {
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


test(`forbid clicks on a side-wrapper which has no contestant_id`, () => {
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



test(`does not render a .score element for a side which has a 0-length "score" array`, () => {
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



test(`draws a score even if side has no "contestant_id"`, () => {
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
