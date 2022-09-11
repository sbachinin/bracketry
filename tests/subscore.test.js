/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test(`renders valid subscore`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ subscore: { mainScore: '15' } }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.subscore .side-own-single-score .main-score').textContent).toBe('15')
})


test(`renders valid subscore.tieBreak (even without mainScore)`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ subscore: { tieBreak: '2' } }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.subscore .side-own-single-score .tie-break').textContent).toBe('2')
})

test(`renders empty <subscore> if not an object`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ subscore: NaN }, { subscore: 'i am an idiot' }] },
            { roundIndex: 0, order: 1, sides: [{ subscore: Array }, { subscore: 433 }] },
            { roundIndex: 1, order: 0, sides: [{ subscore: null }, { subscore: true }] }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.subscore:empty').length).toBe(6)
})


test(`renders empty <main-score> if it's invalid`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ subscore: { mainScore: NaN } }, { subscore: { mainScore: Array } }] },
            { roundIndex: 0, order: 1, sides: [{ subscore: { mainScore: null } }, { subscore: { mainScore: true } }] },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.subscore .side-own-single-score .main-score:empty').length).toBe(4)
})


test(`renders no <tie-break> if it's invalid`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ subscore: { tieBreak: NaN } }, { subscore: { tieBreak: Array } }] },
            { roundIndex: 0, order: 1, sides: [{ subscore: { tieBreak: null } }, { subscore: { tieBreak: true } }] },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.subscore .side-own-single-score .tie-break').length).toBe(0)
})


test(`<opponent-single-score> in <subscore> is made invisible`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0,
            sides: [
                { subscore: { mainScore: '12' } }, { subscore: { mainScore: '7' } }
            ]
        }]
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(
        wrapper.querySelectorAll('.subscore .opponent-single-score')[0]
    ).height).toBe('0px')
    expect(getComputedStyle(
        wrapper.querySelectorAll('.subscore .opponent-single-score')[1]
    ).height).toBe('0px')
})
