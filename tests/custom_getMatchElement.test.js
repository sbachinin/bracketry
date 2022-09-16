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
        data
    )

    expect(getMatchElement).toHaveBeenLastCalledWith(
        3, // round index
        0, // match order
        data
    )
})


test(`populates .match-body element with whatever is returned from user's getMatchElement`, () => {
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


test(`Renders matches elements if options.getMatchElement is not a function`, () => {
    const { wrapper } = init(finished_ucl, { getMatchElement: NaN })
    expect(wrapper.querySelectorAll('.match-body').length).toBe(15)
})


test(`Renders a string if options.getMatchElement returns a string`, () => {
    const { wrapper } = init(finished_ucl, { getMatchElement: () => 'just a string' })
    expect(wrapper.querySelector('.match-wrapper').textContent.trim()).toBe('just a string')
})


test(`Renders empty .match-body if options.getMatchElement returns not a sting or ELement`, () => {
    const { wrapper } = init(finished_ucl, { getMatchElement: () => NaN })
    expect(wrapper.querySelector('.match-body').innerHTML).toBe('')
})

test(`Renders empty .match-body if options.getMatchElement returns undefined (which is a valid return)`, () => {
    const { wrapper } = init(finished_ucl, { getMatchElement: () => {} })
    expect(wrapper.querySelector('.match-body').innerHTML).toBe('')
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

test(`renders empty .match-body if getMatchElement throws`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, matchStatus: 'Scheduled' }],
    }

    const { wrapper } = init(data, { getMatchElement: () => { very.bad() } })
    expect(wrapper.querySelector('.match-body').innerHTML).toBe('')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Failed to get an element from getMatchElement`)
})


test(`calls getMatchElement with an updated match data on applyMatchesUpdates`, () => {
    const getMatchElement = jest.fn(() => {})

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, matchStatus: 'Scheduled' }],
    }

    const { playoffs: pl } = init(data, { getMatchElement })
    getMatchElement.mockClear()

    pl.applyMatchesUpdates([{ roundIndex: 0, order: 0, something_new: true }])
    
    const new_data = getMatchElement.mock.calls[0][2]
    expect(new_data.matches[0]).toEqual({
        roundIndex: 0,
        order: 0,
        matchStatus: 'Scheduled',
        something_new: true
    })
})


// TODO think of other vulnerable features of this custom element which must be preserved


// TODO resume

