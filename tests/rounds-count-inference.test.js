/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

afterEach(jest.clearAllMocks)



test(`renders as much round elements as data.rounds.length IF no matches`, () => {

    const data = {
        rounds: [{}, {}, {}],
        matches: [],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(data.rounds.length)
})


test(`renders as much round elements as data.rounds.length IF too few matches in first round`, () => {

    const data = {
        rounds: [{}, {}, {}],
        matches: [{
            roundIndex: 0,
            order: 2,
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(data.rounds.length)
})

test(`renders as much round elements as necessary to display all matches of first round IF too few rounds in data.rounds`, () => {
    const data = {
        rounds: [{}, {}, {}],
        matches: [{
            roundIndex: 0,
            order: 52,
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(7)
})


test(`renders an amount of round elements according to 1st round matches IF data.rounds is an empty array`, () => {
    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52,
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(7)
})