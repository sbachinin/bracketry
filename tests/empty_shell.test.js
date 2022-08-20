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

const consoleWarn = jest.spyOn(console, 'warn')

afterEach(jest.clearAllMocks)

test('renders empty shell if no data', () => {
    const wrapper = create_wrapper()
    createPlayoffs(undefined, wrapper)
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn).toHaveBeenCalledTimes(1)
});



test('renders empty shell if data is an empty object', () => {
    const wrapper = create_wrapper()
    createPlayoffs({}, wrapper)
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn).toHaveBeenCalledTimes(1)
});


test('renders empty shell if "rounds" is undefined', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        { matches: [], contestants: {} },
        wrapper
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn).toHaveBeenCalledTimes(1)
});



test('renders empty shell if "rounds" is an empty array', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        { rounds: [], matches: [], contestants: {} },
        wrapper,
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')
    expect(consoleWarn).toHaveBeenCalledTimes(1)
});



test('renders empty shell if "rounds" contains non-object element', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        { rounds: [{}, 3], matches: [], contestants: {} },
        wrapper,
    )
    expect(wrapper.querySelector('.matches-positioner')).not.toBe(null)
    expect(wrapper.querySelector('.matches-positioner').innerHTML).toBe('')

    expect(consoleWarn).toHaveBeenCalledTimes(1)
});