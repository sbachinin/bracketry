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

test('options.getMatchElement gets called for each match', () => {
    const wrapper = init()
    const getMatchElement = jest.fn()

    easyPlayoffs.createPlayoffs(
        { rounds: [{}, {}, {}, {}] },
        wrapper,
        { getMatchElement }
    )

    expect(getMatchElement).toBeCalledTimes(15)
})

test('options.getMatchElement gets called with certain arguments', () => {
    const wrapper = init()
    const getMatchElement = jest.fn()

    const data = { rounds: [{}, {}, {}, {}] }

    easyPlayoffs.createPlayoffs(
        data,
        wrapper,
        { getMatchElement }
    )

    expect(getMatchElement).toHaveBeenNthCalledWith(
        1,
        0, // round index
        0, // match order
        data
    )

    expect(getMatchElement).toHaveBeenLastCalledWith(
        3, // round index
        0, // match order
        data
    )
})


test(`populates .match-body element with whatever is returned from user's getMatchElement`, () => {
    const wrapper = init()
    const getMatchElement = jest.fn(() => {
        const div = document.createElement('div')
        div.className = 'custom-match-element'
        div.innerText = 'some match'
        return div
    })

    easyPlayoffs.createPlayoffs(
        { rounds: [{}, {}, {}, {}] },
        wrapper,
        { getMatchElement }
    )

    const custom_matches = wrapper.querySelectorAll('.custom-match-element')

    expect(custom_matches.length).toBe(15)
    expect(custom_matches[0].innerText).toBe('some match')
})



// mouse handlers attached to user's match elements get called
