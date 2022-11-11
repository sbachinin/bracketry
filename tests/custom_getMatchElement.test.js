/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test(`options.getMatchElement gets called for each match`, () => {

    const getMatchElement = jest.fn()
    init(
        { rounds: [{}, {}, {}, {}] },
        { getMatchElement }
    )
    expect(getMatchElement).toBeCalledTimes(15)
})


test(`options.getMatchElement gets called with certain arguments`, () => {

    const getMatchElement = jest.fn()
    const data = { rounds: [{}, {}, {}, {}] }
    init(data, { getMatchElement })

    expect(getMatchElement).toHaveBeenNthCalledWith(
        1,
        0, // round index
        0, // match order
    )
    expect(getMatchElement).toHaveBeenLastCalledWith(
        3, // round index
        0, // match order
    )
})


test(`appends to .match-body an Element returned from options.getMatchElement`, () => {

    const getMatchElement = jest.fn(() => {
        const div = document.createElement('div')
        div.className = 'custom-match-element'
        div.innerText = 'some match'
        return div
    })
    const { wrapper } = init(
        { rounds: [{}, {}, {}, {}] },
        { getMatchElement }
    )

    const custom_matches = wrapper.querySelectorAll('.custom-match-element')
    expect(custom_matches.length).toBe(15)
    expect(custom_matches[0].innerText).toBe('some match')
})


test(`Renders default match layout if options.getMatchElement is not a function`, () => {

    const { wrapper } = init(finished_ucl, { getMatchElement: NaN })
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="benfica"]').length).toBe(2)
})


test(`Renders default match layout if options.getMatchElement returns a string`, () => {

    const { wrapper } = init(finished_ucl, { getMatchElement: () => 'just a string' })
    expect(wrapper.querySelector('.match-wrapper').textContent.trim()).toMatch('Benfica')
})


test(`Renders default match layout if options.getMatchElement returns undefined`, () => {

    const { wrapper } = init(finished_ucl, { getMatchElement: () => { } })
    expect(wrapper.querySelector('.match-wrapper').textContent.trim()).toMatch('Benfica')
})


test(`Renders .match-wrapper without .match-body if options.getMatchElement returns null`, () => {

    const { wrapper } = init(finished_ucl, { getMatchElement: () => null })
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})


test(`Calls mouse handlers attached to match elements provided by options.getMatchElement`, () => {

    const clickHandler = jest.fn()
    const { wrapper } = init(
        finished_ucl,
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


test(`renders default match layout if getMatchElement throws`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, matchStatus: 'Scheduled' }],
    }

    const { wrapper } = init(data, { getMatchElement: () => { very.bad() } })
    expect(wrapper.querySelector('.match-body').innerHTML).toBe('<div class=\"match-status\">Scheduled</div>')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Failed to get a valid return from getMatchElement`)
})
