/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


test('bracket.uninstall() removes elements from DOM', () => {
    let { wrapper, bracket: br } = init(finished_ucl)
    br.uninstall()
    expect(wrapper.innerHTML).toBe('')
})
