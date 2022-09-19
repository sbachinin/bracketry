/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`renders as much <player-wrapper>s as a contestant.players.length`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }]
        }],
        contestants: {
            c1: { players: [{ title: 'Josh' }, { title: 'Job' }, { title: 'John' }] }
        }
    }
    const { wrapper } = init(data)
    const player_wrappers = wrapper.querySelectorAll('.side-wrapper[contestant-id="c1"] .player-wrapper')
    expect(player_wrappers.length).toBe(3)
    expect(player_wrappers[0].textContent.trim()).toBe('Josh')
    expect(player_wrappers[1].textContent.trim()).toBe('Job')
    expect(player_wrappers[2].textContent.trim()).toBe('John')
})


test(`renders only 1 entry status and scores per side regardless of players.length`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }]
        }],
        contestants: {
            c1: { players: [{ title: 'Josh' }, { title: 'Job' }, { title: 'John' }] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="c1"] .entry-status').length).toBe(1)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="c1"] .side-scores').length).toBe(1)
})


test(`options.getNationalityHTML() is called for each player`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }]
        }],
        contestants: {
            c1: { players: [{ title: 'Josh' }, { title: 'Job' }, { title: 'John' }] }
        }
    }
    const getNationalityHTML = jest.fn((n) => `<div class="custom-nationality">${n}</div`)
    const options = { getNationalityHTML }
    const { wrapper } = init(data, options)

    expect(getNationalityHTML).toBeCalledTimes(3)
    expect(wrapper.querySelectorAll('.custom-nationality').length).toBe(3)
})
