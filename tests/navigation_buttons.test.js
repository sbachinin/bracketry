/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');
const finished_ucl = require('./ucl-finished.js').default

const init = () => {
    document.body.innerHTML = ''
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test('disables left navigation buttons on initialization', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_header_button).pointerEvents).toBe('none')

    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_non_header_button).pointerEvents).toBe('none')
})


test('enables right nav buttons on initialization if rounds count is greater than options.visibleRoundsCount', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_header_button).pointerEvents).toBe('auto')

    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_non_header_button).pointerEvents).toBe('auto')
})

test('disables right nav buttons on initialization if rounds count is <= options.visibleRoundsCount', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        { ...finished_ucl, rounds: finished_ucl.rounds.slice(0, 3) },
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_header_button).pointerEvents).toBe('auto')

    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_non_header_button).pointerEvents).toBe('auto')
})