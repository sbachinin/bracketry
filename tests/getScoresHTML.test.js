/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')



test(`fills .side-scores element with a string returned from getScoresHTML`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
    }
    const { wrapper } = init(data, { getScoresHTML: () => '123' })
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-scores').textContent).toBe('123')
})


test(`passes side data and match data to getScoresHTML`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
    }
    const getScoresHTML = jest.fn()
    init(data, { getScoresHTML })
    expect(getScoresHTML).toHaveBeenCalledWith(
        data.matches[0].sides[0],
        data.matches[0]
    )
})


test(`fills .side-scores element with default scores output if getScoresHTML returns no-string`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [{ mainScore: '1234' }] }] }],
    }
    const { wrapper } = init(data, { getScoresHTML: () => true })
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-scores').textContent).toBe('1234')
})


test(`inserts HTML returned by getScoresHTML to the DOM`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
    }
    const { wrapper } = init(data, { getScoresHTML: (s) => `<div class="user-score">1</div>` })
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .user-score').textContent).toBe('1')
})


test(`renders empty .side-scores if there are no side.scores and getScoresHTML returned no-string`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
    }
    const { wrapper } = init(data, { getScoresHTML: () => true })
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .side-scores').textContent).toBe('')
})


test(`catches errors from getScoresHTML`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }], matchStatus: 'Paused' }]
    }

    let wrapper
    const risky_fn = () => {
        wrapper = init(data, { getScoresHTML: () => very.bad() }).wrapper
    }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelector('.match-status').textContent).toBe('Paused')
})


test(`calls getScoresHTML() for each side`, () => {

    const data = {
        rounds: [{}, {}],
        matches: [
            { roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }, { contestantId: 'c2' }] },
            { roundIndex: 0, order: 1, sides: [{ contestantId: 'c3' }] }
        ]
    }

    const getScoresHTML = jest.fn()
    init(data, { getScoresHTML })
    expect(getScoresHTML).toHaveBeenCalledTimes(3)
})


test(`does not call getScoresHTML() if getMatchElement is provided`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }]
    }
    const getScoresHTML = jest.fn()
    init(data, { getScoresHTML, getMatchElement: () => document.createElement('div') })
    expect(getScoresHTML).not.toHaveBeenCalled()
})


test(`calls getScoresHTML even if side.scores is undefined`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }] }],
    }
    const getScoresHTML = jest.fn()
    init(data, { getScoresHTML })
    expect(getScoresHTML).toHaveBeenCalledWith(
        data.matches[0].sides[0],
        data.matches[0]
    )
})


// *** if side.scores is a no-array, it's a critical error, thus nothing gets called


test(`calls getScoresHTML even if side.scores is an empty array`, () => {

    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [] }] }],
    }
    const getScoresHTML = jest.fn()
    init(data, { getScoresHTML })
    expect(getScoresHTML).toHaveBeenCalledWith(
        data.matches[0].sides[0],
        data.matches[0]
    )
})


test(`side and match objects passed to getScoresHTML are protected from modification by a user`, () => {
    
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1', scores: [] }] }],
    }
    const getScoresHTML = (side, match) => {
        side.contestantId = 'crap'
        match.roundIndex = 1212
    }
    const { playoffs: pl } = init(data, { getScoresHTML })
    expect(pl.getAllData()).toEqual(data)
})