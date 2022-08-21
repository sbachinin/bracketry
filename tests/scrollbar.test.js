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


test('shows scrollbar if options.showScrollbar is true / unset ', () => {
    
})

// TODO hides scrollbar  when option false

// TODO hides scrollbar when anchor round is fully visible

// TODO applies width

// TODO attains a certain height with a round of certain height and wrapper of certain height (perhaps for Cypress)
    // + alters its height after navigation

// TODO scrollbar is draggable (perhaps for Cypress)