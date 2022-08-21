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

test('for a missing match renders a stub .match-wrapper without match-id attr', () => {
    const wrapper = create_wrapper()
    const data_without_one_match = { ...finished_ucl, matches: finished_ucl.matches.slice(1) }

    createPlayoffs(
        data_without_one_match,
        wrapper,
        {}
    )

    const matches_without_ids = wrapper.querySelectorAll('.match-wrapper:not([match-id])')
    expect(matches_without_ids).toHaveLength(1)
    expect(matches_without_ids[0].textContent.trim().length).toBe(0)
})

test(`.match-wrapper is always clickable, even if there was no match id for it
    (because an underlying custom match element must be clickable)`, () => {
        const wrapper = create_wrapper()

        createPlayoffs({ rounds: [ {} ] }, wrapper)

        expect(wrapper.querySelector('.match-wrapper').getAttribute('match-id')).toBe(null)

        expect(
            getComputedStyle(wrapper.querySelector('.match-wrapper')).pointerEvents
        ).not.toBe('none')
})

test(`.match-wrapper without [match-id] contains only connection lines
    (unless smth is rendered from custom getMatchElement)`, () => {
        const wrapper = create_wrapper()

        createPlayoffs({ rounds: [ {} ] }, wrapper)

        const match_el = wrapper.querySelector('.match-wrapper')
        expect(match_el.getAttribute('match-id')).toBe(null)
        expect(match_el.querySelector('.match-body')).toBe(null)
        expect(match_el.querySelector('.side-wrapper')).toBe(null)
        expect(match_el.querySelector('.match-lines-area')).not.toBe(null)
})

test('fills upcoming (match-less) 4-round tournament with stub matches', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        { rounds: [ {}, {}, {}, {} ], matches: [], contestants: {} },
        wrapper,
        {}
    )
    expect(wrapper.querySelectorAll('.match-wrapper')).toHaveLength(15)
})
