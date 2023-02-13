/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


const consoleWarn = jest.spyOn(console, 'warn')
afterEach(jest.clearAllMocks)


describe('applyMatchesUpdates', () => {

    test(`getAllData returns a match object with new properties from applyMatchesUpdates`, () => {

        const data = {
            rounds: [{}],
            matches: [
                { roundIndex: 0, order: 0, matchStatus: 'Old status', isLive: true }
            ]
        }
        const { bracket: br } = init(data)

        const match_update = { roundIndex: 0, order: 0, matchStatus: 'New status', isLive: false }

        br.applyMatchesUpdates([match_update])

        expect(br.getAllData().matches[0].matchStatus).toBe('New status')
        expect(br.getAllData().matches[0].isLive).toBe(false)
    })



    test(`applyMatchesUpdates replaces old match data, removing old properties which weren't provided in update`, () => {

        const old_match = { roundIndex: 0, order: 0, matchStatus: 'Old status', isLive: true, sides: [{ contestantId: '123' }] }
        const new_match = { roundIndex: 0, order: 0, matchStatus: 'New status' }

        const data = { rounds: [{}], matches: [old_match] }
        const { bracket: br } = init(data)

        br.applyMatchesUpdates([new_match])

        expect(br.getAllData().matches[0].isLive).toBe(undefined)
        expect(br.getAllData().matches[0].sides).toBe(undefined)
    })


    test(`keeps old matches elements untouched
        when applyMatchesUpdates did not contain updates for such matches`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)

        const old_match_html = wrapper.querySelector(
            `.round-wrapper[round-index="1"] .match-wrapper[match-order="0"]`
        ).innerHTML

        br.applyMatchesUpdates([{ roundIndex: 0, order: 0, matchStatus: 'New status' }])

        const new_match_html = wrapper.querySelector(
            `.round-wrapper[round-index="1"] .match-wrapper[match-order="0"]`
        ).innerHTML

        expect(new_match_html).toBe(old_match_html)
    })


    test(`removes .sides element when no sides were provided by applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)

        br.applyMatchesUpdates([{ roundIndex: 0, order: 0, matchStatus: 'New status' }])

        const selector = `.round-wrapper[round-index="0"] .match-wrapper[match-order="0"] .sides`
        expect(wrapper.querySelector(selector)).toBe(null)
    })


    test(`adds sides to a match which had no sides`, () => {

        const { wrapper, bracket: br } = init({
            rounds: [{}],
            matches: [{ roundIndex: 0, order: 0, matchStatus: 'Scheduled' }]
        })

        br.applyMatchesUpdates([{
            roundIndex: 0,
            order: 0,
            sides: [
                { "contestantId": "chelsea", "scores": [{ "mainScore": "2" }] }
            ]
        }])

        const selector = `.side-wrapper[contestant-id="chelsea"] .main-score`
        expect(wrapper.querySelector(selector).textContent).toBe('2')
    })


    test(`draws a new matchStatus for a match updated by applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)

        const update = { roundIndex: 1, order: 2, matchStatus: 'New status' }
        br.applyMatchesUpdates([update])

        expect(
            wrapper.querySelector(
                `.round-wrapper[round-index="1"] .match-wrapper[match-order="2"] .match-status`
            ).textContent
        ).toBe('New status')
    })


    test(`adds "live" class to a match-wrapper which was previously non-live`, () => {

        const { wrapper, bracket: br } = init(finished_ucl, {})
        const selector = `.round-wrapper[round-index="0"] .match-wrapper[match-order="1"] .match-body`
        expect(wrapper.querySelector(selector).classList.contains('live')).toBe(false)

        br.applyMatchesUpdates([{ roundIndex: 0, order: 1, sides: [{ contestantId: '123' }], isLive: true }])

        expect(wrapper.querySelector(selector).classList.contains('live')).toBe(true)
    })


    test(`adds contentful match which was previously empty`, () => {

        const { wrapper, bracket: br } = init(finished_ucl, {})
        const selector = `.round-wrapper[round-index="0"] .match-wrapper[match-order="6"] .match-body`
        expect(wrapper.querySelector(selector)).toBe(null)

        const update = {
            roundIndex: 0,
            order: 6,
            sides: [
                { "contestantId": "chelsea", "scores": [{ "mainScore": "2" }] }
            ]
        }

        br.applyMatchesUpdates([update])

        expect(
            wrapper.querySelector(selector + ' .side-wrapper[contestant-id="chelsea"] .main-score').textContent
        ).toBe('2')
    })


    test(`adds "live" class to a match-wrapper which was previously empty`, () => {

        const { wrapper, bracket: br } = init(finished_ucl, {})
        const selector = `.round-wrapper[round-index="0"] .match-wrapper[match-order="6"] .match-body`
        expect(wrapper.querySelector(selector)).toBe(null)

        const update = {
            roundIndex: 0,
            order: 6,
            sides: [{ "contestantId": "chelsea" }],
            isLive: true
        }

        br.applyMatchesUpdates([update])

        expect(wrapper.querySelector(selector).classList.contains('live')).toBe(true)
    })


    test(`draws new scores for a match updated by applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)

        const update = {
            roundIndex: 1,
            order: 2,
            sides: [{ scores: [{ mainScore: '26' }] }]
        }

        br.applyMatchesUpdates([update])

        const updated_match_score_el = wrapper.querySelector(
            '.round-wrapper[round-index="1"] .match-wrapper[match-order="2"] .main-score'
        )
        expect(updated_match_score_el.textContent.trim()).toBe('26')
    })



    test(`new match data from applyMatchesUpdates gets injected into previously empty match-wrapper`, () => {

        const { wrapper, bracket: br } = init({ rounds: [{}], matches: [] })

        const update = {
            roundIndex: 0,
            order: 0,
            sides: [{ scores: [{ mainScore: '6' }] }]
        }

        br.applyMatchesUpdates([update])
        expect(wrapper.querySelector('.main-score').innerHTML).toBe('6');
    })



    test(`new match data from applyMatchesUpdates is returned from later calls to getAllData`, () => {

        const { bracket: br } = init({ rounds: [{}], matches: [] })

        const update = {
            roundIndex: 0,
            order: 0,
            sides: [{ scores: [{ mainScore: '6' }] }]
        }

        br.applyMatchesUpdates([update])
        expect(br.getAllData().matches[0]).toEqual(update)
    })



    test(`does not mutate data passed to applyMatchesUpdate`, () => {

        const { bracket: br } = init(finished_ucl)

        const update = {
            roundIndex: 1,
            order: 2,
            sides: [{ contestantId: 'villarreal' }]
        }

        br.applyMatchesUpdates([update])

        expect(update).toEqual({
            roundIndex: 1,
            order: 2,
            sides: [{ contestantId: 'villarreal' }]
        })
    })



    test(`does not throw and does not spoil the dom if nothing is passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates() }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
        expect(consoleWarn.mock.calls[0][0]).toMatch('applyMatchesUpdates must be called with an array of matches')
    })


    test(`does not throw and does not spoil the dom if non-array stuff is passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates('i am an idiot') }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
        expect(consoleWarn.mock.calls[0][0]).toMatch('applyMatchesUpdates must be called with an array of matches')
    })


    test(`does not throw and ignores match with missing roundIndex passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates([{ order: 0 }]) }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    })


    test(`does not throw and ignores match with non-string roundIndex passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates([{ roundIndex: true, order: 0 }]) }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    })


    test(`does not throw and ignores match with roundIndex === NaN passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates([{ roundIndex: NaN, order: 0 }]) }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    })


    test(`does not throw and ignores match with missing order passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates([{ roundIndex: 0 }]) }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    })


    test(`does not throw and ignores match with non-string order passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates([{ roundIndex: 0, order: {} }]) }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    })


    test(`does not throw and ignores match with order === NaN passed to applyMatchesUpdates`, () => {

        const { wrapper, bracket: br } = init(finished_ucl)
        const risky_fn = () => { br.applyMatchesUpdates([{ roundIndex: 0, order: NaN }]) }
        expect(risky_fn).not.toThrow()
        expect(wrapper.querySelectorAll('.player-title')[0].textContent).toBe('Benfica')
    })
})
