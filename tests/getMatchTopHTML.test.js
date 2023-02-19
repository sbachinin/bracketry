/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test(`if getMatchTopHTML returns a string, a .match-top element is rendered with this string`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchTopHTML: () => 'something' }
    )
    expect(wrapper.querySelector('.match-body .match-top').innerHTML).toBe('something')
})


test(`if getMatchTopHTML is not provided, .match-top is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-top')).toBe(null)
})


test(`if getMatchTopHTML is not a function, .match-top is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }
    const { wrapper } = init(
        data,
        { getMatchTopHTML: 'i am an idiot' }
    )
    expect(wrapper.querySelector('.match-top')).toBe(null)
})


test(`if getMatchTopHTML returns an empty string, .match-top is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchTopHTML: () => '' }
    )
    expect(wrapper.querySelector('.match-body .match-top')).toBe(null)
})


test(`if getMatchTopHTML returns a non-string, .match-top is not rendered`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchTopHTML: () => 21 }
    )
    expect(wrapper.querySelector('.match-body .match-top')).toBe(null)
})


test(`getMatchTopHTML is called with match data object`, () => {

    const getMatchTopHTML = jest.fn()

    const match1 = { roundIndex: 0, order: 0, status: 'Finished' }
    const data = {
        rounds: [{}],
        matches: [match1]
    }
    init(data, { getMatchTopHTML })
    expect(getMatchTopHTML).toBeCalledWith(match1)
})


test(`renders .match-top only for matches for which getMatchTopHTML returned non-empty string`, () => {
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
        { getMatchTopHTML: m => m.status || '' }
    )
    expect(wrapper.querySelector(
        '.round-wrapper[round-index="0"] .match-wrapper[match-order="0"] .match-top'
    )).not.toBe(null)
    expect(wrapper.querySelector(
        '.round-wrapper[round-index="0"] .match-wrapper[match-order="1"] .match-top'
    )).not.toBe(null)
    expect(wrapper.querySelector(
        '.round-wrapper[round-index="1"] .match-wrapper[match-order="0"] .match-top'
    )).toBe(null)
})


test(`HTML tag returned from getMatchTopHTML is properly inserted and can be queried`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0 }]
    }

    const { wrapper } = init(
        data,
        { getMatchTopHTML: () => '<a href="aaa">bbb</a>' }
    )
    expect(wrapper.querySelector('.match-body .match-top a[href="aaa"]').innerHTML).toBe('bbb')
})





/* 
test(`match-top is rendered for every match which has matchUpperInfo`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [{
            roundIndex: 0,
            order: 0,
            matchUpperInfo: 'Finished'
        },
        {
            roundIndex: 0,
            order: 1,
        },
        {
            roundIndex: 1,
            order: 0,
            matchUpperInfo: 'Scheduled'
        }],
    }
    const { wrapper } = init(data)
    const  upper_infos = wrapper.querySelectorAll('.match-top')
    expect(upper_infos.length).toBe(2)
    expect(upper_infos[0].textContent).toBe('Finished')
    expect(upper_infos[1].textContent).toBe('Scheduled')
})


test(`invalid matchUpperInfo is not rendered`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [{
            roundIndex: 0,
            order: 0,
            matchUpperInfo: 22
        },
        {
            roundIndex: 0,
            order: 1,
            matchUpperInfo: null
        },
        {
            roundIndex: 1,
            order: 0,
            matchUpperInfo: true
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-top')).toBe(null)
})


test(`HTML provided as matchUpperInfo must be properly inserted`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            matchUpperInfo: `<a class="some-link">Link</a>`
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-top .some-link')).not.toBe(null)
})
 */