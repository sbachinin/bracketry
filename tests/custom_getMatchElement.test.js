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


test(`Renders default matches elements if options.getMatchElement is not a function`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { getMatchElement: NaN }
    )

    expect(wrapper.querySelectorAll('.match-wrapper[match-id]').length).toBe(15)
})


test(`Renders a string if options.getMatchElement returns a string`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { getMatchElement: () => 'just a string' }
    )

    expect(wrapper.querySelector('.match-wrapper').textContent.trim()).toBe('just a string')
})


test(`Does not render .match-body if options.getMatchElement returns not a sting or ELement`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { getMatchElement: () => NaN }
    )

    expect(wrapper.querySelectorAll('.match-body').length).toBe(0)
})


test(`Calls mouse handlers attached to match elements provided by options.getMatchElement`, () => {
    const wrapper = init()
    const clickHandler = jest.fn()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {
            getMatchElement: () => {
                const div = document.createElement('div')
                div.className = 'custom-match-element'
                div.addEventListener('mouseup', clickHandler)
                return div
            }
        }
    )

    wrapper.querySelectorAll('.custom-match-element')[0].dispatchEvent(new MouseEvent('mouseup'))
    wrapper.querySelectorAll('.custom-match-element')[10].dispatchEvent(new MouseEvent('mouseup'))
    expect(clickHandler).toBeCalledTimes(2)
})

