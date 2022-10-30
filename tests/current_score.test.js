/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test(`renders valid currentScore`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ currentScore: '15' }]
        }]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.current-score .side-own-single-score .main-score').textContent).toBe('15')
})


test(`renders empty .current-score if invalid`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ currentScore: NaN }, { currentScore: {} }] },
            { roundIndex: 0, order: 1, sides: [{ currentScore: Array }, { currentScore: () => { } }] },
            { roundIndex: 1, order: 0, sides: [{ currentScore: null }, { currentScore: true }] }
        ]
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.current-score:empty').length).toBe(6)
})


test(`.opponent-single-score in .current-score is made invisible`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0,
            sides: [{ currentScore: '12' }, { currentScore: '7' }]
        }]
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(
        wrapper.querySelectorAll('.current-score .opponent-single-score')[0]
    ).height).toBe('0px')
    expect(getComputedStyle(
        wrapper.querySelectorAll('.current-score .opponent-single-score')[1]
    ).height).toBe('0px')
})
