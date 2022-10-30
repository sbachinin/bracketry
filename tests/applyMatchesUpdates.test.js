/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


test(`getAllData returns a match object with new properties from applyMatchesUpdates`, () => {

    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, matchStatus: 'Old status', isLive: true }
        ]
    }
    const { playoffs: pl } = init(data)

    const match_update = { roundIndex: 0, order: 0, matchStatus: 'New status', isLive: false }

    pl.applyMatchesUpdates([match_update])

    expect(pl.getAllData().matches[0].matchStatus).toBe('New status')
    expect(pl.getAllData().matches[0].isLive).toBe(false)
})



test(`getAllData returns a match with old properties unchanged if applyMatchesUpdates did not provide such properties`, () => {

    const data = {
        rounds: [{}],
        matches: [
            { roundIndex: 0, order: 0, matchStatus: 'Old status', isLive: true }
        ]
    }
    const { playoffs: pl } = init(data)

    const match_update = { roundIndex: 0, order: 0, matchStatus: 'New status' }

    pl.applyMatchesUpdates([match_update])

    expect(pl.getAllData().matches[0].isLive).toBe(true)
})



test(`keeps old matches elements untouched
    when applyMatchesUpdates did not contain updates for such matches`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    const old_match_html = wrapper.querySelector(
        `.round-wrapper[round-index="1"] .match-wrapper[match-order="0"]`
    ).innerHTML

    pl.applyMatchesUpdates([{ roundIndex: 0, order: 0, matchStatus: 'New status' }])

    const new_match_html = wrapper.querySelector(
        `.round-wrapper[round-index="1"] .match-wrapper[match-order="0"]`
    ).innerHTML

    expect(new_match_html).toBe(old_match_html)
})



test(`keeps old scores element untouched when no scores provided by applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    const selector = `.round-wrapper[round-index="0"] .match-wrapper[match-order="0"] .side-wrapper:first-child .side-scores`
    const old_score = wrapper.querySelector(selector)

    pl.applyMatchesUpdates([{ roundIndex: 0, order: 0, matchStatus: 'New status' }])

    const new_score = wrapper.querySelector(selector)

    expect(new_score.textContent.trim()).not.toBe('')
    expect(new_score.textContent).toBe(old_score.textContent)
})



test(`draws a new matchStatus for a match updated by applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    const update = { roundIndex: 1, order: 2, matchStatus: 'New status' }
    pl.applyMatchesUpdates([update])

    expect(
        wrapper.querySelector(
            `.round-wrapper[round-index="1"] .match-wrapper[match-order="2"] .match-status`
        ).textContent
    ).toBe('New status')
})



test(`adds "live" class to a match-wrapper which had { isLive: true } in applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, {})
    const selector = `.round-wrapper[round-index="0"] .match-wrapper[match-order="1"]`
    expect(wrapper.querySelector(selector).classList.contains('live')).toBe(false)

    pl.applyMatchesUpdates([{ roundIndex: 0, order: 1, isLive: true }])

    expect(wrapper.querySelector(selector).classList.contains('live')).toBe(true)
})



test(`draws a new scores for a match updated by applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    const update = {
        roundIndex: 1,
        order: 2,
        sides: [{ scores: [{ mainScore: '26' }] }]
    }

    pl.applyMatchesUpdates([update])

    const updated_match_score_el = wrapper.querySelector(
        '.round-wrapper[round-index="1"] .match-wrapper[match-order="2"] .main-score'
    )
    expect(updated_match_score_el.textContent.trim()).toBe('26')
})



test(`new match data from applyMatchesUpdates gets injected into previously empty match-wrapper`, () => {

    const { wrapper, playoffs: pl } = init({ rounds: [{}], matches: [] })

    const update = {
        roundIndex: 0,
        order: 0,
        sides: [{ scores: [{ mainScore: '6' }] }]
    }

    pl.applyMatchesUpdates([update])
    expect(wrapper.querySelector('.main-score').innerHTML).toBe('6');
})



test(`new match data from applyMatchesUpdates is returned from later calls to getAllData`, () => {

    const { wrapper, playoffs: pl } = init({ rounds: [{}], matches: [] })

    const update = {
        roundIndex: 0,
        order: 0,
        sides: [{ scores: [{ mainScore: '6' }] }]
    }

    pl.applyMatchesUpdates([update])
    expect(pl.getAllData().matches[0]).toEqual(update)
})



test(`does not mutate data passed to applyMatchesUpdate`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    const update = {
        roundIndex: 1,
        order: 2,
        sides: [{ contestantId: 'villarreal' }]
    }

    pl.applyMatchesUpdates([update])

    expect(update).toEqual({
        roundIndex: 1,
        order: 2,
        sides: [{ contestantId: 'villarreal' }]
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
    const risky_fn = () => { pl.applyMatchesUpdates([{ order: 0 }]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})


test(`does not throw and ignores match with non-string roundIndex passed to applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([{ roundIndex: true, order: 0 }]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})


test(`does not throw and ignores match with roundIndex === NaN passed to applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([{ roundIndex: NaN, order: 0 }]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})


test(`does not throw and ignores match with missing order passed to applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([{ roundIndex: 0 }]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})


test(`does not throw and ignores match with non-string order passed to applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([{ roundIndex: 0, order: {} }]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})


test(`does not throw and ignores match with order === NaN passed to applyMatchesUpdates`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)
    const risky_fn = () => { pl.applyMatchesUpdates([{ roundIndex: 0, order: NaN }]) }
    expect(risky_fn).not.toThrow()
    expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
})