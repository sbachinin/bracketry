/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default

// TODO
test('if verticalScrollMode is set to nonsense, it falls back to mousewheel', () => {
    //  let { wrapper, playoffs: pl } = init(finished_ucl)

})


// TODO test: resets scroll on navigation with classical layout
