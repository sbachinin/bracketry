/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test('renders a given round name (even if no matches)', () => {
    const { wrapper } = init({ rounds: [{ name: 'Some round' }], matches: [] })
    expect(wrapper.querySelector('.round-name').innerHTML).toBe('Some round')
})


test('renders a default round name if none is given by user', () => {
    const { wrapper } = init({ rounds: [{}], matches: [], contestants: {} })
    expect(wrapper.querySelector('.round-name').innerHTML).toBe('Final')
})


test(`renders as much round titles as data.rounds.length`, () => {
    const { wrapper } = init({ rounds: [{}, {}, {}, {}, {}, {}], matches: [], contestants: {} })
    expect(wrapper.querySelectorAll('.round-name').length).toBe(6)
})

test(`rerenders round titles on replaceData`, () => {
    const { wrapper, playoffs: pl } = init({ rounds: [{}, {}, {}, {}, {}, {}], matches: [], contestants: {} })
    pl.replaceData({ rounds: [{}] })
    expect(wrapper.querySelectorAll('.round-name').length).toBe(1)
})
