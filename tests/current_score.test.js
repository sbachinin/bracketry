/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test(`renders valid current_score`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ current_score: { mainScore: '15' } }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.current_score .side-own-single-score .main-score').textContent).toBe('15')
})


test(`renders valid current_score.subscore (even without mainScore)`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ current_score: { subscore: '2' } }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.current_score .side-own-single-score .subscore').textContent).toBe('2')
})

test(`renders empty <current_score> if not an object`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ current_score: NaN }, { current_score: 'i am an idiot' }] },
            { roundIndex: 0, order: 1, sides: [{ current_score: Array }, { current_score: 433 }] },
            { roundIndex: 1, order: 0, sides: [{ current_score: null }, { current_score: true }] }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.current_score:empty').length).toBe(6)
})


test(`renders empty <main-score> if it's invalid`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ current_score: { mainScore: NaN } }, { current_score: { mainScore: Array } }] },
            { roundIndex: 0, order: 1, sides: [{ current_score: { mainScore: null } }, { current_score: { mainScore: true } }] },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.current_score .side-own-single-score .main-score:empty').length).toBe(4)
})


test(`renders no <subscore> if it's invalid`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ current_score: { subscore: NaN } }, { current_score: { subscore: Array } }] },
            { roundIndex: 0, order: 1, sides: [{ current_score: { subscore: null } }, { current_score: { subscore: true } }] },
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.current_score .side-own-single-score .subscore').length).toBe(0)
})


test(`<opponent-single-score> in <current_score> is made invisible`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0,
            sides: [
                { current_score: { mainScore: '12' } }, { current_score: { mainScore: '7' } }
            ]
        }]
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(
        wrapper.querySelectorAll('.current_score .opponent-single-score')[0]
    ).height).toBe('0px')
    expect(getComputedStyle(
        wrapper.querySelectorAll('.current_score .opponent-single-score')[1]
    ).height).toBe('0px')
})
