/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

afterEach(jest.clearAllMocks)


test(`renders normal number of rounds and matches when skippedLastRoundsCount is not specified`, () => {
    
    const data = {
        rounds: [{}, {}, {}],
        matches: [],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(3)
    expect(wrapper.querySelectorAll('.round-title').length).toBe(3)
    expect(wrapper.querySelectorAll('.round-wrapper[round-index="0"] .match-wrapper').length).toBe(4)

})

test(`renders normal number of rounds and matches when skippedLastRoundsCount is set to 0`, () => {
    
    const data = {
        rounds: [{}, {}, {}],
        matches: [],
        skippedLastRoundsCount: 0
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(3)
    expect(wrapper.querySelectorAll('.round-title').length).toBe(3)
    expect(wrapper.querySelectorAll('.round-wrapper[round-index="0"] .match-wrapper').length).toBe(4)

})


test(`does not change the number of round elements in the DOM when skippedLastRoundsCount is specified as non-0`, () => {

    const data = {
        rounds: [{}, {}, {}],
        matches: [],
        skippedLastRoundsCount: 2
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(3)
    expect(wrapper.querySelectorAll('.round-title').length).toBe(3)
})

test(`increases the "breadth" of a tree when skippedLastRoundsCount is specified as non-0`, () => {

    const data = {
        rounds: [{}, {}, {}],
        matches: [],
        skippedLastRoundsCount: 2
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper[round-index="0"] .match-wrapper').length).toBe(16)
})

test(`trims the number of round elements inferred from 1st round matches`, () => {
    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament
        }],
        skippedLastRoundsCount: 2
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(5)
    expect(wrapper.querySelectorAll('.round-title').length).toBe(5)
})


test(`does not increase the "breadth" of a tree when data.rounds length was inferred from 1st round matches`, () => {
    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament with 64 matches in the 1st round
        }],
        skippedLastRoundsCount: 2
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper[round-index="0"] .match-wrapper').length).toBe(64)
})

test(`renders a number of rounds inferred from matches minus skippedLastRoundsCount`, () => {

    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament with 64 matches in the 1st round
        }],
        skippedLastRoundsCount: 3
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(4)
    expect(wrapper.querySelectorAll('.round-title').length).toBe(4)
})

test(`When n last rounds gets dropped, navigation on click is limited accordingly`, () => {

    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament with 64 matches in the 1st round
        }],
        skippedLastRoundsCount: 2
    }
    const { wrapper, bracket: br } = init(data, { visibleRoundsCount: 2 })

    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(br.getNavigationState().baseRoundIndex).toBe(3)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[3]).visibility).toBe('visible')
    expect(getComputedStyle(all_rounds[4]).visibility).toBe('visible')
})


test(`When n last rounds gets dropped, navigation by moveToNextRound is limited accordingly`, () => {

    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament with 64 matches in the 1st round
        }],
        skippedLastRoundsCount: 3
    }
    const { wrapper, bracket: br } = init(data, { visibleRoundsCount: 2 })

    br.moveToNextRound()
    br.moveToNextRound()
    br.moveToNextRound()

    expect(br.getNavigationState().baseRoundIndex).toBe(2)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})


test(`When n last rounds gets dropped, moveToLastRound navigates to the reduced last round`, () => {
    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament with 64 matches in the 1st round
        }],
        skippedLastRoundsCount: 3
    }
    const { bracket: br } = init(data, { visibleRoundsCount: 2 })

    br.moveToLastRound()
    expect(br.getNavigationState().baseRoundIndex).toBe(2)
})


test(`When n last rounds gets dropped, lastRoundIsFullyVisible is correct`, () => {
    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament with 64 matches in the 1st round
        }],
        skippedLastRoundsCount: 3
    }
    const { bracket: br } = init(data, { visibleRoundsCount: 2 })

    br.moveToNextRound()
    expect(br.getNavigationState().lastRoundIsFullyVisible).toBe(false)
    br.moveToNextRound()
    expect(br.getNavigationState().lastRoundIsFullyVisible).toBe(true)
})

test('hides nav buttons on initialization if reduced rounds count is <= options.visibleRoundsCount', () => {
    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 30, // stands for 6-round untrimmed tournament
        }],
        skippedLastRoundsCount: 3
    }

    const { wrapper } = init(data, { visibleRoundsCount: 3 })
    expect(wrapper.querySelectorAll('.navigation-button.hidden').length).toBe(2)
})

test(`When n last rounds gets dropped, right nav button is disabled when necessary`, () => {
    const data = {
        rounds: [],
        matches: [{
            roundIndex: 0,
            order: 52, // stands for 7-round untrimmed tournament
        }],
        skippedLastRoundsCount: 3
    }
    const { wrapper, bracket: br } = init(data, { visibleRoundsCount: 2 })
    
    br.moveToNextRound()
    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(true)

    br.moveToNextRound()
    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(false)
})
