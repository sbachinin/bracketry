/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test(`if getMatchBottomHTML returns a string, a .match-bottom element is rendered with this string`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchBottomHTML: () => 'something' }
    )
    expect(wrapper.querySelector('.match-body .match-bottom').innerHTML).toBe('something')
})


test(`if getMatchBottomHTML is not provided, .match-bottom is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-bottom')).toBe(null)
})


test(`if getMatchBottomHTML is not a function, .match-bottom is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }
    const { wrapper } = init(
        data,
        { getMatchBottomHTML: 'i am an idiot' }
    )
    expect(wrapper.querySelector('.match-bottom')).toBe(null)
})


test(`if getMatchBottomHTML returns an empty string, .match-bottom is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchBottomHTML: () => '' }
    )
    expect(wrapper.querySelector('.match-body .match-bottom')).toBe(null)
})


test(`if getMatchBottomHTML returns a non-string, .match-bottom is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchBottomHTML: () => 21 }
    )
    expect(wrapper.querySelector('.match-body .match-bottom')).toBe(null)
})


test(`getMatchBottomHTML is called with match data object`, () => {

    const getMatchBottomHTML = jest.fn()

    const match1 = { roundIndex: 0, order: 0, status: 'Finished' }
    const data = {
        rounds: [{}],
        matches: [match1]
    }
    init(data, { getMatchBottomHTML })
    expect(getMatchBottomHTML).toBeCalledWith(match1)
})


test(`renders .match-bottom only for matches for which getMatchBottomHTML returned non-empty string`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, status: 'Finished' },
            { roundIndex: 0, order: 1, status: 'Scheduled' },
            { roundIndex: 1, order: 0 }
        ]
    }
    const { wrapper } = init(
        data,
        { getMatchBottomHTML: m => m.status || '' }
    )
    expect(wrapper.querySelector(
        '.round-wrapper[round-index="0"] .match-wrapper[match-order="0"] .match-bottom'
    )).not.toBe(null)
    expect(wrapper.querySelector(
        '.round-wrapper[round-index="0"] .match-wrapper[match-order="1"] .match-bottom'
    )).not.toBe(null)
    expect(wrapper.querySelector(
        '.round-wrapper[round-index="1"] .match-wrapper[match-order="0"] .match-bottom'
    )).toBe(null)
})


test(`HTML tag returned from getMatchBottomHTML is properly inserted and can be queried`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchBottomHTML: () => '<a href="aaa">bbb</a>' }
    )
    expect(wrapper.querySelector('.match-body .match-bottom a[href="aaa"]').innerHTML).toBe('bbb')
})
