/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test(`renders empty .entry-status IF side has NO entryStatus AND getEntryStatusHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { players: [{ title: 'Josh' }] } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-info-item.entry-status').textContent).toBe('')
})

test(`renders empty .entry-status IF side has NON-STRING entryStatus AND getEntryStatusHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: {} } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('')
})



test(`renders side's VALID entryStatus as such if getEntryStatusHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: 'WC' } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('WC')
})


test(`renders side's VALID entryStatus as such if getEntryStatusHTML is INVALID (not a function)`, async () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { entryStatus: 'WC', players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data, { getEntryStatusHTML: [] })
    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('WC')

    await new Promise(r => setTimeout(r, 0))
    expect(consoleWarn.mock.calls[0][0]).toMatch('Impossible value provided for "getEntryStatusHTML" option')
})


test(`renders html provided as entryStatus (when no options.getEntryStatusHTML)`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { entryStatus: '<span class="user-status" style="background: tomato">WC</span>' }
        }
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-info-item.entry-status .user-status')
        ).background
    ).toBe('tomato')
})


















test(`calls getEntryStatusHTML with entryStatus of a contestant`, () => {
    const getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: 'WC' } }
    }
    init(data, { getEntryStatusHTML })
    expect(getEntryStatusHTML.mock.calls[0][0]).toBe('WC')
})


test(`calls getEntryStatusHTML with entryStatus of a contestant, even if entryStatus is not a string`, () => {
    const getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: {} } }
    }
    init(data, { getEntryStatusHTML })
    expect(getEntryStatusHTML.mock.calls[0][0]).toEqual({})
})

test(`calls getEntryStatusHTML for all contestants, even those with missing or invalid entryStatus`, () => {
    const getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }, { contestantId: 'c2' }] }],
        contestants: {
            c1: { entryStatus: {} },
            c2: { players: [{ title: 'Pete' }] }
        }
    }
    init(data, { getEntryStatusHTML })
    expect(getEntryStatusHTML).toHaveBeenCalledTimes(2)
})



test(`renders bare contestant.entryStatus if getEntryStatusHTML is provided but it's not a function`, async () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: 'LL', players: [{ title: 'j' }] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: [] })
    expect(wrapper.querySelector('.entry-status').textContent).toBe('LL')
    await new Promise(r => setTimeout(r, 0))
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Impossible value provided for "getEntryStatusHTML" option`)
})


test(`renders bare contestant.entryStatus if getEntryStatusHTML throws`, async () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: 'LL', players: [{ title: 'j' }] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => very.bad() })
    expect(wrapper.querySelector('.entry-status').textContent).toBe('LL')
    await new Promise(r => setTimeout(r, 0))
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Failed to get a string from getEntryStatusHTML`)
})


test(`calls getEntryStatusHTML with context object as 2nd arg`, () => {
    getEntryStatusHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: {} }
    }

    init(data, { getEntryStatusHTML })

    expect(getEntryStatusHTML.mock.calls[0][1]).toEqual({
        roundIndex: 0,
        matchOrder: 0,
        contestantId: 'c1'
    })
})










test(`injects the return value of getEntryStatusHTML even if contestant has no entryStatus`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: {} }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: n => `I am an asshole` })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe('I am an asshole')
})


test(`injects the return value of getEntryStatusHTML even if contestant's entryStatus is not a string`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: {} } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: n => `I am an asshole` })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe(`I am an asshole`)
    expect(consoleWarn.mock.calls[0][0]).toMatch(`If entryStatus is provided for a contestant, it must be a string`)
})


test(`injects a valid return value of getEntryStatusHTML to ALL sides`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }, { contestantId: 'c2' }] },
            { roundIndex: 0, order: 1, sides: [{ contestantId: 'c3' }, { contestantId: 'c4' }] }
        ],
        contestants: { c1: {}, c2: {}, c3: {}, c4: {} }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => 'foo' })
    const elements = [...wrapper.querySelectorAll('.entry-status')]
    expect(elements.length).toBe(4)

    const all_players_have_foo = elements.every(el => el.innerHTML === 'foo')
    expect(all_players_have_foo).toBe(true)
})


test(`Falls back to bare contestant.entryStatus (valid one) IF getEntryStatusHTML returns undefined`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: 'WC', players: [{title: ''}] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => {} })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe(`WC`)
    expect(consoleWarn.mock.calls[0][0]).toMatch('Failed to get a string from getEntryStatusHTML')
})


test(`Falls back to bare contestant.entryStatus (valid one) IF getEntryStatusHTML returns invalid value`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: 'WC', players: [{title: ''}] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => 23232 })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe(`WC`)
    expect(consoleWarn.mock.calls[0][0]).toMatch('Failed to get a string from getEntryStatusHTML')
})


test(`renders empty .entry-status if both contestant.entryStatus and getEntryStatusHTML's return value are invalid`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: [] } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => 23232 })
    expect(wrapper.querySelector('.entry-status').innerHTML).toBe('')
})


test(`entry-status element takes no space if empty string is returned from getEntryStatusHTML
    (even if there is a valid entryStatus for contestant)`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: { c1: { entryStatus: 'WC' } }
    }

    const { wrapper } = init(data, { getEntryStatusHTML: () => '' })
    const el = wrapper.querySelector('.side-wrapper[contestant-id="c1"] .entry-status')
    expect(el.innerHTML).toBe('')
    expect(getComputedStyle(el).padding).toBe('0px')
    expect(getComputedStyle(el).margin).toBe('0px')
    expect(getComputedStyle(el).width).toBe('auto')
})
