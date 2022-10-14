/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`for a missing match renders a stub .match-wrapper without body`, () => {

    const { wrapper } = init({ rounds: [{}] })

    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})

test(`.match-wrapper is always clickable, even if there was no match data for it
    (because an underlying custom match element must be clickable)`, () => {

    const { wrapper } = init({ rounds: [{}] })

    expect(
        getComputedStyle(wrapper.querySelector('.match-wrapper')).pointerEvents
    ).not.toBe('none')
})

test(`stub .match-wrapper contains only connection lines
    (unless smth is rendered from custom getMatchElement)`, () => {

    const { wrapper } = init({ rounds: [{}] })

    expect(wrapper.querySelector('.match-wrapper').children.length).toBe(1)
    expect(wrapper.querySelector('.match-lines-area')).not.toBe(null)
})

test(`fills upcoming (match-less) 4-round tournament with stub matches`, () => {

    const { wrapper } = init(
        { rounds: [{}, {}, {}, {}], matches: [], contestants: {} }
    )
    expect(wrapper.querySelectorAll('.match-wrapper')).toHaveLength(15)
})
