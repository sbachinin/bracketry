/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`renders no player title if player.title is undefined`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{}] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .player-title').textContent).toBe('')
})


test(`renders no player title if player.title is not a string`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: true }] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .player-title').textContent).toBe('')
})


test(`fills .player-title element with bare player.title if getPlayerTitleHTML is not defined`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .player-title').textContent).toBe('Pete')
})


test(`fills .player-title element with a string returned from getPlayerTitleHTML (instead of bare player.title)`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data, { getPlayerTitleHTML: () => 'Josh' })
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .player-title').textContent).toBe('Josh')
})


test(`passes player data, contestantId and all_data to getPlayerTitleHTML`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ nationality: 'US', title: 'Pete' }] }
        }
    }
    const getPlayerTitleHTML = jest.fn()
    init(data, { getPlayerTitleHTML })
    expect(getPlayerTitleHTML).toHaveBeenCalledWith(
        { nationality: 'US', title: 'Pete' },
        { contestantId: 'c1', matchOrder: 0, playerIndex: 0, roundIndex: 0 },
        data
    )
})


test(`fills .player-title element with bare player.title if getPlayerTitleHTML returns not a string`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data, { getPlayerTitleHTML: () => true })
    expect(wrapper.querySelector('.player-title').textContent).toBe('Pete')
})


test(`inserts HTML returned by getPlayerTitleHTML to the DOM`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data, { getPlayerTitleHTML: (pl) => `<a class="user-link">${pl.title}</a>` })
    expect(wrapper.querySelector('.player-title .user-link').textContent).toBe('Pete')
})


test(`catches errors from getPlayerTitleHTML`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }], matchStatus: 'Paused' }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] }
        }
    }

    let wrapper
    const risky_fn = () => {
        wrapper = init(data, { getPlayerTitleHTML: (pl) => very.bad() }).wrapper
    }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelector('.match-status').textContent).toBe('Paused')
})


test(`calls getPlayerTitleHTML() for each player`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }, { contestantId: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Josh' }, { title: 'Pete' }] },
            c2: { players: [{ title: 'Tom' }] }
        }
    }

    const getPlayerTitleHTML = jest.fn()
    init(data, { getPlayerTitleHTML })
    expect(getPlayerTitleHTML).toHaveBeenCalledTimes(3)
})


test(`does not call getPlayerTitleHTML() if getMatchElement is provided`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] }
        }
    }
    const getPlayerTitleHTML = jest.fn()
    init(data, { getPlayerTitleHTML, getMatchElement: () => document.createElement('div') })
    expect(getPlayerTitleHTML).not.toHaveBeenCalled()
})


test(`does not call getPlayerTitleHTML if side has no contestantId`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{}] }]
    }
    const getPlayerTitleHTML = jest.fn()
    init(data, { getPlayerTitleHTML })
    expect(getPlayerTitleHTML).not.toHaveBeenCalled()
})


test(`does not call getPlayerTitleHTML if there is no contestant for side.contestantId`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }]
    }
    const getPlayerTitleHTML = jest.fn()
    init(data, { getPlayerTitleHTML })
    expect(getPlayerTitleHTML).not.toHaveBeenCalled()
})


test(`does not call getPlayerTitleHTML if there are no players for a contestant`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { entryStatus: 'WC' }
        }
    }
    const getPlayerTitleHTML = jest.fn()
    init(data, { getPlayerTitleHTML })
    expect(getPlayerTitleHTML).not.toHaveBeenCalled()
})


test(`calls getPlayerTitleHTML even if player.title is undefined`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
        contestants: {
            c1: { players: [{ id: 'pl1' }] }
        }
    }
    const getPlayerTitleHTML = jest.fn()
    init(data, { getPlayerTitleHTML })
    expect(getPlayerTitleHTML).toHaveBeenCalledWith(
        { id: 'pl1' },
        { contestantId: 'c1', matchOrder: 0, playerIndex: 0, roundIndex: 0 },
        data
    )
})

