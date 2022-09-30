/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`hides both serving-marks when neither side is serving`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [ { contestantId: 'c1' }, {} ] }],
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[0]).display).toBe('none')
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[1]).display).toBe('none')
})

test(`adds transparency to serving-mark of non-serving side`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [ {}, { isServing: true } ] }],
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[0]).opacity).toBe('0')
})

test(`renders a visible serving-mark for a serving side`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [ {}, { isServing: true } ] }],
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[1]).display).not.toBe('none')
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[1]).opacity).not.toBe('0')
})

test(`does not add { display: none } to serving-mark of a non-serving side's if opposite side is serving`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [ {}, { isServing: true } ] }],
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[0]).display).not.toBe('none')
})


test(`does not render <.serving-mark> when match.sides is an empty array`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [] }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.serving-mark')).toBe(null)
})



test(`(questionnable) renders both serving-marks visible if both sides are { isServing: true }`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [ { isServing: true }, { isServing: true } ] }],
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[0]).display).not.toBe('none')
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[0]).opacity).not.toBe('0')
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[1]).display).not.toBe('none')
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[1]).opacity).not.toBe('0')
})


test(`does not display a serving mark when isServing is not a boolean`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [ { isServing: 'idiot' }, { isServing: { idiot: true } } ] }],
    }
    const { wrapper } = init(data)
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[0]).display).toBe('none')
    expect(getComputedStyle(wrapper.querySelectorAll('.serving-mark')[1]).display).toBe('none')
})