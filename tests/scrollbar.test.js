/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


test('shows scrollbar if options.showScrollbar is unset', () => {

    const { wrapper } = init(finished_ucl)
    expect(
        getComputedStyle(
            wrapper.querySelector('.scrollbar-parent')
        ).display
    ).toBe('block')
})


test('shows scrollbar if options.showScrollbar is nonsense', () => {

    const { wrapper } = init(finished_ucl, { showScrollbar: 4234 })
    expect(
        getComputedStyle(
            wrapper.querySelector('.scrollbar-parent')
        ).display
    ).toBe('block')
})


test('shows scrollbar if options.showScrollbar is true', () => {

    const { wrapper } = init(finished_ucl, { showScrollbar: true })
    expect(
        getComputedStyle(
            wrapper.querySelector('.scrollbar-parent')
        ).display
    ).toBe('block')
})


test('hides scrollbar if options.showScrollbar is false', () => {

    const { wrapper } = init(finished_ucl, { showScrollbar: false })
    expect(
        getComputedStyle(
            wrapper.querySelector('.scrollbar-parent')
        ).display
    ).toBe('none')
})

