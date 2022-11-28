/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


test('playoffs.uninstall() removes elements from DOM', () => {
    let { wrapper, playoffs: pl } = init(finished_ucl)
    pl.uninstall()
    expect(wrapper.innerHTML).toBe('')
})
