/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

afterEach(jest.clearAllMocks)

test(`renders normal number of rounds when dropNLastRounds is not specified`, () => {

    const data = {
        rounds: [{}, {}, {}],
        matches: [],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(data.rounds.length)
})

test(`renders normal number of rounds when dropNLastRounds is provided as 0`, () => {

    const data = {
        rounds: [{}, {}, {}],
        matches: [],
    }
    const { wrapper } = init(data, { dropNLastRounds: 0 })
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(data.rounds.length)
})

test(`renders a number of rounds reduced by dropNLastRounds`, () => {

    const data = {
        rounds: [{}, {}, {}, {}, {}],
        matches: [],
    }
    const { wrapper } = init(data, { dropNLastRounds: 2 })
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(3)
})

test(`renders a number of rounds reduced by dropNLastRounds when data.rounds was extended due to the number of 1st round matches`, () => {

    const data = {
        rounds: [{}, {}, {}, {}, {}],
        matches: [{
            roundIndex: 0,
            order: 52,
        }],
    }
    const { wrapper } = init(data, { dropNLastRounds: 2 })
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(5)
})

test(`When n last rounds gets dropped, navigation on click is limited accordingly`, () => {

    const data = {
        rounds: [{}, {}, {}, {}, {}],
        matches: [],
    }
    const { wrapper, bracket: br } = init(data, { dropNLastRounds: 2, visibleRoundsCount: 2 })

    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(br.getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})


test(`When n last rounds gets dropped, navigation by moveToNextRound is limited accordingly`, () => {

    const data = {
        rounds: [{}, {}, {}, {}, {}],
        matches: [],
    }
    const { wrapper, bracket: br } = init(data, { dropNLastRounds: 2, visibleRoundsCount: 2 })

    br.moveToNextRound()
    br.moveToNextRound()
    br.moveToNextRound()

    expect(br.getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})


test(`When n last rounds gets dropped, moveToLastRound navigates to the reduced last round`, () => {
    const data = {
        rounds: [{}, {}, {}, {}, {}],
        matches: [],
    }
    const { bracket: br } = init(data, { dropNLastRounds: 2, visibleRoundsCount: 2 })

    br.moveToLastRound()
    expect(br.getNavigationState().baseRoundIndex).toBe(1)
})


test(`When n last rounds gets dropped, lastRoundIsFullyVisible is correct`, () => {
    const data = {
        rounds: [{}, {}, {}, {}, {}, {}],
        matches: [],
    }
    const { bracket: br } = init(data, { dropNLastRounds: 2, visibleRoundsCount: 2 })

    br.moveToNextRound()
    expect(br.getNavigationState().lastRoundIsFullyVisible).toBe(false)
    br.moveToNextRound()
    expect(br.getNavigationState().lastRoundIsFullyVisible).toBe(true)
})

test('hides nav buttons on initialization if reduced rounds count is <= options.visibleRoundsCount', () => {
    const data = {
        rounds: [{}, {}, {}, {}, {}, {}],
        matches: [],
    }

    const { wrapper } = init(data, { dropNLastRounds: 2, visibleRoundsCount: 4 })
    expect(wrapper.querySelectorAll('.navigation-button.hidden').length).toBe(2)
})

test(`When n last rounds gets dropped, right nav button is disabled when necessary`, () => {
    const data = {
        rounds: [{}, {}, {}, {}, {}, {}],
        matches: [],
    }
    const { wrapper, bracket: br } = init(data, { dropNLastRounds: 2, visibleRoundsCount: 2 })
    
    br.moveToNextRound()
    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(true)

    br.moveToNextRound()
    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(false)
})

// hides nav buttons when reduced tournament is narrower than the screen

// right nav button enabled/disabled