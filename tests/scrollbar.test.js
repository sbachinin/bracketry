/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


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


test('applies default scrollbar width when options.scrollbarWidth is not specified', () => {

    const { wrapper } = init(finished_ucl)
    expect(
        getComputedStyle(
            wrapper.querySelector('.scrollbar-parent')
        ).width
    ).toBe('5px')
})


test('applies default scrollbar width when options.scrollbarWidth is nonsense', () => {

    const { wrapper } = init(finished_ucl, {scrollbarWidth: 'i am an idiot'})
    expect(
        getComputedStyle(
            wrapper.querySelector('.scrollbar-parent')
        ).width
    ).toBe('5px')
})


test('applies options.scrollbarWidth', () => {

    const { wrapper } = init(finished_ucl, { scrollbarWidth: 13 })
    expect(
        getComputedStyle(
            wrapper.querySelector('.scrollbar-parent')
        ).width
    ).toBe('13px')
})

