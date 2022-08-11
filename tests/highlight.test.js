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


test('highlights team history (add "highlighted" class to .match-wrapper and .side-wrapper)', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`

    expect(document.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
    expect(document.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)

    document.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(document.querySelectorAll('.match-wrapper.highlighted').length).toBe(2)
    expect(document.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test('highlights next team history', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    const real_selector = `.side-wrapper[contestant-id='real']`

    document.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    
    document.querySelector(real_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(document.querySelectorAll('.match-wrapper.highlighted').length).toBe(4)
    expect(document.querySelectorAll(real_selector + '.highlighted').length).toBe(4)
    expect(document.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)
})



test('unhighlights history after click on anything other than .side-wrapper', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    document.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(document.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
    
    document.querySelector('.matches-positioner')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(document.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)
})
