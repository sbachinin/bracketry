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

    const new_match = {
        id: 'some_id',
        roundIndex: 1,
        order: 2,
        sides: [ { contestantId: 'c123', score: [{ mainScore: '666' }] } ]
    }

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
        id: 'some_id',
        roundIndex: 1,
        order: 2,
        sides: [ { contestantId: 'c123', score: [{ mainScore: '666' }] } ]
    }

    pl.applyMatchesUpdates([ new_match ])

    const updated_match_score_el = wrapper.querySelectorAll('.round-wrapper')[1]
        .querySelectorAll('.match-wrapper')[2]
        .querySelector('.main-score')
    expect(updated_match_score_el.textContent.trim()).toBe(new_match.sides[0].score[0].mainScore)
})


test('applyMatchesUpdates creates new match if none was present for this round_id and order', () => {
    const { wrapper, playoffs: pl } = init(
        {
            rounds: [ { name: 'Some round' } ],
            matches: [],
            contestants: { c1: { players: [ { title: 'John Doe' } ] } }
        }
    )

    expect(wrapper.querySelector('.main-score')).toBe(null);

    const new_match = {
        id: '32323',
        roundIndex: 0,
        order: 0,
        sides: [
            { contestantId: 'c1', score: [{ mainScore: '6' }] },
        ]
    }

    pl.applyMatchesUpdates([ new_match ])

    expect(wrapper.querySelector('.main-score').innerHTML).toBe('6');

    expect(pl.getAllData().matches[0]).toEqual(new_match)
})



test('does not mutate data passed to applyMatchesUpdate', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)

    const new_match = {
        id: 'some_id',
        roundIndex: 1,
        order: 2,
        sides: [ { contestantId: 'villarreal', score: [{ mainScore: '666' }] } ]
    }

    pl.applyMatchesUpdates([ new_match ])

    expect(new_match).toEqual({
        id: 'some_id',
        roundIndex: 1,
        order: 2,
        sides: [ { contestantId: 'villarreal', score: [{ mainScore: '666' }] } ]
    })
})


test(`does not throw and does not spoil the dom if nothing is passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const apply_nothing = () => { pl.applyMatchesUpdates() }
    expect(apply_nothing).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    expect(consoleWarn.mock.calls[0][0]).toMatch('applyMatchesUpdates must be called with an array of matches')
})

test(`does not throw and does not spoil the dom if non-array stuff is passed to applyMatchesUpdates`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    const apply_nothing = () => { pl.applyMatchesUpdates('i am an idiot') }
    expect(apply_nothing).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    expect(consoleWarn.mock.calls[0][0]).toMatch('applyMatchesUpdates must be called with an array of matches')
})