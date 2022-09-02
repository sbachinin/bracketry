/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)





// IF getNationalityHTML is missing / invalid

test(`renders empty .nationality IF player has NO nationality AND getNationalityHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { players: [{ title: 'Josh' }] } }
    }

    const { wrapper } = init(data)

    expect((wrapper.querySelector('.player-wrapper .nationality')).innerHTML).toBe('')
})


test(`renders empty .nationality IF player has NON-STRING nationality AND getNationalityHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { players: [{ title: 'Josh', nationality: {} }] } }
    }

    const { wrapper } = init(data)

    expect((wrapper.querySelector('.player-wrapper .nationality')).innerHTML).toBe('')
})


test(`renders player's VALID nationality as such if getNationalityHTML is NOT provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { players: [{ title: 'Josh', nationality: 'US' }] } }
    }

    const { wrapper } = init(data)

    expect((wrapper.querySelector('.player-wrapper .nationality')).innerHTML).toBe('US')
})


test(`renders player's VALID nationality as such if getNationalityHTML is INVALID (not a function)`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { players: [{ title: 'Josh', nationality: 'US' }] } }
    }

    const { wrapper } = init(data, { getNationalityHTML: { value: 'asshole' } })

    expect((wrapper.querySelector('.player-wrapper .nationality')).innerHTML).toBe('US')
})

test(`renders html provided as player's nationality (when no options.getNationalityHTML)`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{
                nationality: '<span class="user-nationality" style="width: 36px">US</span>',
            }]}
        }
    }

    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.player-wrapper .nationality .user-nationality')
        ).width
    ).toBe('36px')
})















// How getNationalityHTML is called

test(`calls getNationalityHTML with nationality of a player`, () => {
    getNationalityHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: 'US' }] }
        }
    }

    init(data, { getNationalityHTML })

    expect(getNationalityHTML).toBeCalledWith('US')
})


test(`calls getNationalityHTML with nationality of a player, even if it's not a string`, () => {
    getNationalityHTML = jest.fn()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: { value: 'asshole' } }] }
        }
    }

    init(data, { getNationalityHTML })

    expect(getNationalityHTML).toBeCalledWith({ value: 'asshole' })
})


test(`calls getNationalityHTML for ALL players, even those with missing or invalid nationality`, () => {
    getNationalityHTML = jest.fn()

    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [
                { title: 'Pete', nationality: 'US' },
                { title: 'Ivan' }
            ]},
            c2: { players: [
                { title: 'Pavel', nationality: {} },
                { title: 'Mario', nationality: 'IT' }
            ]}
        }
    }

    init(data, { getNationalityHTML })
    expect(getNationalityHTML).toHaveBeenCalledTimes(4)
})


test(`renders contentful match if non-function getNationalityHTML is provided`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }], match_status: 'Scheduled' }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: 'US' }] }
        }
    }

    const { wrapper } = init(data, { getNationalityHTML: [] })
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Impossible value provided for getNationalityHTML option`)
})


test(`renders contentful match if getNationalityHTML throws`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }], match_status: 'Scheduled' }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: 'US' }] }
        }
    }

    const { wrapper } = init(data, { getNationalityHTML: () => { very.bad() }})
    expect(wrapper.querySelector('.match-status').textContent).toBe('Scheduled')
    expect(consoleWarn.mock.calls[0][0]).toMatch(`Failed to get a string from getNationalityHTML`)
})














// How a return value of getNationalityHTML is used

test(`injects the return value of getNationalityHTML even if player has no nationality`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] }
        }
    }

    const { wrapper } = init(data, { getNationalityHTML: n => `I am an asshole`})
    expect(wrapper.querySelector('.player-wrapper .nationality').innerHTML).toBe('I am an asshole')
})

test(`injects the return value of getNationalityHTML even if player's nationality is not a string`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: {} }] }
        }
    }

    const { wrapper } = init(data, { getNationalityHTML: n => `I am an asshole`})
    expect(wrapper.querySelector('.player-wrapper .nationality').innerHTML).toBe(`I am an asshole`)
    expect(consoleWarn.mock.calls[0][0]).toMatch(`If nationality is provided for a player, it must be a string`)
})

test(`injects a valid return value of getNationalityHTML to ALL players`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [
                { title: 'Pete', nationality: 'US' },
                { title: 'Ivan' }
            ]},
            c2: { players: [
                { title: 'Pavel', nationality: 'PO' },
                { title: 'Mario', nationality: 'IT' }
            ]}
        }
    }

    const { wrapper } = init(data, { getNationalityHTML: () => 'foo' })
    const nat_elements = [...wrapper.querySelectorAll('.player-wrapper .nationality')]
    const all_players_have_foo = nat_elements.every(el => el.innerHTML === 'foo')
    expect(all_players_have_foo).toBe(true)
})

test(`Falls back to bare player's nationality (valid one) IF getNationalityHTML returns invalid value`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: 'CAN' }] }
        }
    }

    const { wrapper } = init(data, { getNationalityHTML: () => 23232 })
    expect(wrapper.querySelector('.player-wrapper .nationality').innerHTML).toBe(`CAN`)
    expect(consoleWarn.mock.calls[0][0]).toMatch('Failed to get a string from getNationalityHTML')
})

test(`renders empty .nationality if both player's nationality and getNationalityHTML's return value are invalid`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: Object }] }
        }
    }

    const { wrapper } = init(data, { getNationalityHTML: () => 23232 })
    expect(wrapper.querySelector('.player-wrapper .nationality').innerHTML).toBe('')
})

