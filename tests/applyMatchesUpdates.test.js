/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test('getAllData returns a new match supplied by applyMatchesUpdates in place of an old match', () => {
    const { playoffs: pl } = init(finished_ucl)

    const new_match = {roundIndex: 1, order: 2, matchStatus: 'Completed'}

    pl.applyMatchesUpdates([ new_match ])

    const all_matches = pl.getAllData().matches
    expect(all_matches.length).toBe(15)

    const matches_in_this_position = all_matches.filter(m => m.roundIndex === 1 && m.order === 2)
    expect(matches_in_this_position.length).toBe(1)
    expect(matches_in_this_position[0]).toEqual(new_match)
})




test('draws a new score for a match updated by applyMatchesUpdates', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)

    const new_match = {
        roundIndex: 1,
        order: 2,
        sides: [ { score: [{ mainScore: '6' }] } ]
    }

    pl.applyMatchesUpdates([ new_match ])

    const updated_match_score_el = wrapper.querySelector(
        '.round-wrapper[round-index="1"] .match-wrapper[match-order="2"] .main-score'
    )
    expect(updated_match_score_el.textContent.trim()).toBe('6')
})


test('applyMatchesUpdates creates new match if none was present for this round_id and order', () => {
    const { wrapper, playoffs: pl } = init({ rounds: [ {} ], matches: [] })

    const new_match = {
        roundIndex: 0,
        order: 0,
        sides: [{ score: [{ mainScore: '6' }] }]
    }

    pl.applyMatchesUpdates([ new_match ])

    expect(wrapper.querySelector('.main-score').innerHTML).toBe('6');

    expect(pl.getAllData().matches[0]).toEqual(new_match)
})



test('does not mutate data passed to applyMatchesUpdate', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)

    const new_match = {
        roundIndex: 1,
        order: 2,
        sides: [ { contestantId: 'villarreal' } ]
    }

    pl.applyMatchesUpdates([ new_match ])

    expect(new_match).toEqual({
        roundIndex: 1,
        order: 2,
        sides: [ { contestantId: 'villarreal' } ]
    })
})


test(`does not throw and does not spoil the dom if nothing is passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates() }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    expect(consoleWarn.mock.calls[0][0]).toMatch('applyMatchesUpdates must be called with an array of matches')
})

test(`does not throw and does not spoil the dom if non-array stuff is passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates('i am an idiot') }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    expect(consoleWarn.mock.calls[0][0]).toMatch('applyMatchesUpdates must be called with an array of matches')
})

test(`does not throw and ignores match with missing roundIndex passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([ { order: 0 } ]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})

test(`does not throw and ignores match with non-string roundIndex passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([ { roundIndex: true, order: 0 } ]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})

test(`does not throw and ignores match with roundIndex === NaN passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([ { roundIndex: NaN, order: 0 } ]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})


test(`does not throw and ignores match with missing order passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([ { roundIndex: 0 } ]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})

test(`does not throw and ignores match with non-string order passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([ { roundIndex: 0, order: {} } ]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})

test(`does not throw and ignores match with order === NaN passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([ { roundIndex: 0, order: NaN } ]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})