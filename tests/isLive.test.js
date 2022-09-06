/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test(`applies certain styles to a match element which { isLive: true }`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, isLive: true, sides: [{ subscore: '1' }, {}] }],
    }
    const options = { liveMatchBorderColor: 'red', liveMatchBackgroundColor: 'blue' }
    const { wrapper } = init(data, options)
    expect(getComputedStyle(wrapper.querySelector('.match-body')).borderColor).toBe('red')
    expect(getComputedStyle(wrapper.querySelector('.match-body')).backgroundColor).toBe('blue')
    expect(getComputedStyle(wrapper.querySelector('.subscore:not(:empty)')).borderColor).toBe('red')
})


test(`does not apply live styles to a match element which { isLive: false }`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, isLive: false, sides: [{ subscore: '1' }, {}] }],
    }
    const options = { liveMatchBorderColor: 'red', liveMatchBackgroundColor: 'blue' }
    const { wrapper } = init(data, options)
    expect(getComputedStyle(wrapper.querySelector('.match-body')).borderColor).not.toBe('red')
    expect(getComputedStyle(wrapper.querySelector('.match-body')).backgroundColor).not.toBe('blue')
    expect(getComputedStyle(wrapper.querySelector('.subscore:not(:empty)')).borderColor).not.toBe('red')
})

test(`does not apply live styles to a match element which has no 'isLive' property`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ subscore: '1' }, {}] }],
    }
    const options = { liveMatchBorderColor: 'red', liveMatchBackgroundColor: 'blue' }
    const { wrapper } = init(data, options)
    expect(getComputedStyle(wrapper.querySelector('.match-body')).borderColor).not.toBe('red')
    expect(getComputedStyle(wrapper.querySelector('.match-body')).backgroundColor).not.toBe('blue')
    expect(getComputedStyle(wrapper.querySelector('.subscore:not(:empty)')).borderColor).not.toBe('red')
})


test(`does not apply live styles to a match element which has non-boolean 'isLive' property`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, isLive: 'yes', sides: [{ subscore: '1' }, {}] }],
    }
    const options = { liveMatchBorderColor: 'red', liveMatchBackgroundColor: 'blue' }
    const { wrapper } = init(data, options)
    expect(getComputedStyle(wrapper.querySelector('.match-body')).borderColor).not.toBe('red')
    expect(getComputedStyle(wrapper.querySelector('.match-body')).backgroundColor).not.toBe('blue')
    expect(getComputedStyle(wrapper.querySelector('.subscore:not(:empty)')).borderColor).not.toBe('red')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Match.isLive must be a boolean`)
})


test(`does not apply live styles to a match element WITHOUT sides, even if { isLive: true }`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, isLive: true }],
    }
    const options = { liveMatchBorderColor: 'red', liveMatchBackgroundColor: 'blue' }
    const { wrapper } = init(data, options)
    expect(getComputedStyle(wrapper.querySelector('.match-body')).borderColor).not.toBe('red')
    expect(getComputedStyle(wrapper.querySelector('.match-body')).backgroundColor).not.toBe('blue')
})