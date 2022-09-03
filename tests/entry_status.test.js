/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test(`renders empty .entry-status IF side has NO entry_status AND getEntryStatusHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { players: [{ title: 'Josh' }] } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-info-item.entry-status').textContent).toBe('')
})

test(`renders empty .entry-status IF side has NON-STRING entry_status AND getEntryStatusHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: {} } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('')
})



test(`renders side's VALID entry_status as such if getEntryStatusHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: 'WC' } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('WC')
})


test(`renders side's VALID entry_status as such if getEntryStatusHTML is INVALID (not a function)`, async () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { entry_status: 'WC', players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data, { getEntryStatusHTML: [] })
    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('WC')

    await new Promise(r => setTimeout(r, 0))
    expect(consoleWarn.mock.calls[0][0]).toMatch('Impossible value provided for "getEntryStatusHTML" option')
})


test(`renders html provided as entry_status (when no options.getEntryStatusHTML)`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { entry_status: '<span class="user-status" style="background: tomato">WC</span>' }
        }
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-info-item.entry-status .user-status')
        ).background
    ).toBe('tomato')
})


















test(`calls getEntryStatusHTML with entry_status of a contestant`, () => {
    const getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: 'WC' } }
    }
    init(data, { getEntryStatusHTML })
    expect(getEntryStatusHTML.mock.calls[0][0]).toBe('WC')
})


test(`calls getEntryStatusHTML with entry_status of a contestant, even if entry_status is not a string`, () => {
    const getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: {} } }
    }
    init(data, { getEntryStatusHTML })
    expect(getEntryStatusHTML.mock.calls[0][0]).toEqual({})
})

test(`calls getEntryStatusHTML for all contestants, even those with missing or invalid entry_status`, () => {
    const getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { entry_status: {} },
            c2: { players: [{ title: 'Pete' }] }
        }
    }
    init(data, { getEntryStatusHTML })
    expect(getEntryStatusHTML).toHaveBeenCalledTimes(2)
})



test(`renders bare contestant.entry_status if getEntryStatusHTML is provided but it's not a function`, async () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: 'LL', players: [{ title: 'j' }] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: [] })
    expect(wrapper.querySelector('.entry-status').textContent).toBe('LL')
    await new Promise(r => setTimeout(r, 0))
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Impossible value provided for "getEntryStatusHTML" option`)
})


test(`renders bare contestant.entry_status if getEntryStatusHTML throws`, async () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: 'LL', players: [{ title: 'j' }] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => very.bad() })
    expect(wrapper.querySelector('.entry-status').textContent).toBe('LL')
    await new Promise(r => setTimeout(r, 0))
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Failed to get a string from getEntryStatusHTML`)
})


test(`calls getEntryStatusHTML with context object as 2nd arg and data as 3rd`, () => {
    getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: {} }
    }

    init(data, { getEntryStatusHTML })

    expect(getEntryStatusHTML.mock.calls[0][1]).toEqual({
        matchId: 'm1',
        contestantId: 'c1'
    })
    expect(getEntryStatusHTML.mock.calls[0][2]).toEqual(data)
})










test(`injects the return value of getEntryStatusHTML even if contestant has no entry_status`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: {} }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: n => `I am an asshole` })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe('I am an asshole')
})


test(`injects the return value of getEntryStatusHTML even if contestant's entry_status is not a string`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: {} } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: n => `I am an asshole` })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe(`I am an asshole`)
    expect(consoleWarn.mock.calls[0][0]).toMatch(`If entry_status is provided for a contestant, it must be a string`)
})


test(`injects a valid return value of getEntryStatusHTML to ALL sides`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] },
            { id: 'm2', roundIndex: 0, order: 1, sides: [{ contestant_id: 'c3' }, { contestant_id: 'c4' }] }
        ],
        contestants: { c1: {}, c2: {}, c3: {}, c4: {} }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => 'foo' })
    const elements = [...wrapper.querySelectorAll('.entry-status')]
    expect(elements.length).toBe(4)

    const all_players_have_foo = elements.every(el => el.innerHTML === 'foo')
    expect(all_players_have_foo).toBe(true)
})


test(`Falls back to bare contestant.entry_status (valid one) IF getEntryStatusHTML returns invalid value`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: 'WC', players: [{title: ''}] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => 23232 })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe(`WC`)
    expect(consoleWarn.mock.calls[0][0]).toMatch('Failed to get a string from getEntryStatusHTML')
})


test(`renders empty .entry-status if both contestant.entry_status and getEntryStatusHTML's return value are invalid`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', roundIndex: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: [] } }
    }

    const { wrapper } = init(data, { getNationalityHTML: () => 23232 })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe('')
})



// TODO should it be called if there is no data for contestant_id? (now it's not called)

