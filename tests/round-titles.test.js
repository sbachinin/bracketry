/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test('renders a given round name (even if no matches)', () => {

    const { wrapper } = init({ rounds: [{ name: 'Some round' }], matches: [] })
    expect(wrapper.querySelector('.round-title').innerHTML).toBe('Some round')
})


test('renders a default round name if none is given by user', () => {

    const { wrapper } = init({ rounds: [{}] })
    expect(wrapper.querySelector('.round-title').innerHTML).toBe('Final')
})


test(`renders as much round titles as data.rounds.length`, () => {

    const { wrapper } = init({ rounds: [{}, {}, {}, {}, {}, {}] })
    expect(wrapper.querySelectorAll('.round-title').length).toBe(6)
})


test(`rerenders round titles on replaceData`, () => {

    const { wrapper, playoffs: pl } = init({ rounds: [{}, {}, {}, {}, {}, {}] })
    pl.replaceData({ rounds: [{}] })
    expect(wrapper.querySelectorAll('.round-title').length).toBe(1)
})


test(`calls getRoundTitleElement for each round`, () => {

    const getRoundTitleElement = jest.fn()

    init(
        { rounds: [{}, {}, {}, {}, {}, {}] },
        { getRoundTitleElement }
    )
    expect(getRoundTitleElement).toHaveBeenCalledTimes(6)
})


test(`calls getRoundTitleElement with round data (with extra data too) and round index`, () => {

    const getRoundTitleElement = jest.fn()

    const data = { rounds: [{ name: 'first', id: '01' }] }

    init(data, { getRoundTitleElement })
    expect(getRoundTitleElement).toHaveBeenCalledWith(
        { name: 'first', id: '01' },
        0
    )
})


test(`appends  to the DOM all Elements returned from getRoundTitleElement`, () => {

    const data = { rounds: [{ name: 'first' }, { name: 'second' }] }
    const options = {
        getRoundTitleElement: (r) => {
            const el = document.createElement('div')
            el.className = 'custom-round-title'
            el.innerHTML = r.name
            return el
        }
    }
    const { wrapper } = init(data, options)
    expect(wrapper.querySelector('.round-title:first-child .custom-round-title').textContent).toBe('first')
    expect(wrapper.querySelector('.round-title:nth-child(2) .custom-round-title').textContent).toBe('second')
})


test(`renders bare round.name if getRoundTitleElement returns a string`, () => {

    const data = { rounds: [{ name: '1' }] }
    const { wrapper } = init(data, { getRoundTitleElement: (r) => 'oops' })
    expect(wrapper.querySelector('.round-title').innerHTML).toBe('1')
})


test(`renders bare round.name if getRoundTitleElement returns null`, () => {

    const data = { rounds: [{ name: '1' }] }
    const { wrapper } = init(data, { getRoundTitleElement: (r) => null })
    expect(wrapper.querySelector('.round-title').innerHTML).toBe('1')
})


test(`renders bare round.name if getRoundTitleElement returns undefined`, () => {

    const data = { rounds: [{ name: '1' }] }
    const { wrapper } = init(data, { getRoundTitleElement: () => {} })
    expect(wrapper.querySelector('.round-title').innerHTML).toBe('1')
})


test(`renders default round name if no round.name was given and getRoundTitleELement returned invalid stuff`, () => {

    const data = { rounds: [{}] }
    const { wrapper } = init(data, { getRoundTitleElement: (r) => true })
    expect(wrapper.querySelector('.round-title').innerHTML).toBe('Final')
})


test(`catches exceptions thrown from getRoundTitleElement and renders bare round.title`, () => {

    const data = { rounds: [{ name: 'first' }] }
    let wrapper
    const risky_fn = () => {
        wrapper = init(data, { getRoundTitleElement: () => very.bad() }).wrapper
    }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelector('.round-title').innerHTML).toBe('first')
})
