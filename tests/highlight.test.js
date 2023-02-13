/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const finished_ucl = require('./data/ucl-finished.js').default
const { deep_clone_object, create_wrapper, init } = require('./utils.js')


test(`highlights team history (add "highlighted" class to .match-wrapper and .side-wrapper)`, () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)

    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(2)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test(`highlights next contestant's history after next click`, () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    const real_selector = `.side-wrapper[contestant-id='real']`

    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    wrapper.querySelector(real_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(4)
    expect(wrapper.querySelectorAll(real_selector + '.highlighted').length).toBe(4)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)
})



test(`does not highlight when something other than '.side-wrapper[contestant-id]' is clicked`, () => {
    const { wrapper } = init(finished_ucl)

    wrapper.querySelector('.matches-positioner')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)

    wrapper.querySelector('.match-wrapper')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
    
    wrapper.querySelector('.navigation-button')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})

test(`does not highlight when side-wrapper without [contestant-id] is clicked`, () => {
    const data = {
        rounds: [{}],
        matches: [{ roundIndex: 0, order: 0, sides: [{ contestantId: 'c1' }, {}]}]
    }
    
    const { wrapper } = init(data)
    wrapper.querySelector('.side-wrapper:not([contestant-id])')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})


test(`unhighlights history after click within .matches-positioner but not .side-wrapper`, () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)

    wrapper.querySelector('.round-wrapper')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)
})


test(`does not unhighlight history after click outside .matches-positioner`, () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)

    wrapper.querySelector('.round-titles-wrapper')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test(`highlights a contestant history when highlightContestantHistory is called with a valid contestantId`, () => {
    const { wrapper, bracket } = init(finished_ucl)

    bracket.highlightContestantHistory('villarreal')

    expect(
        wrapper.querySelectorAll(`.side-wrapper[contestant-id='villarreal'].highlighted`).length
    ).toBe(3)
})


test(`highlights a contestant history when highlightContestantHistory is called with a valid contestantId`, () => {
    const { wrapper, bracket } = init(finished_ucl)

    bracket.highlightContestantHistory('villarreal')

    const highlighted_side_wrappers = wrapper.querySelectorAll(`.side-wrapper.highlighted`)
    expect(highlighted_side_wrappers.length).toBe(3)
    expect(highlighted_side_wrappers[0].getAttribute('contestant-id')).toBe('villarreal')
    expect(highlighted_side_wrappers[2].getAttribute('contestant-id')).toBe('villarreal')
})

test(`unhighlights when highlightContestantHistory is called with null`, () => {
    const { wrapper, bracket } = init(finished_ucl)

    bracket.highlightContestantHistory('villarreal')

    bracket.highlightContestantHistory(null)

    expect(wrapper.querySelectorAll(`.side-wrapper.highlighted`).length).toBe(0)
})


test(`unhighlights when highlightContestantHistory is called with irrelevant string`, () => {
    const { wrapper, bracket } = init(finished_ucl)
    bracket.highlightContestantHistory('villarreal')
    bracket.highlightContestantHistory('nonsense')
    expect(wrapper.querySelectorAll(`.side-wrapper.highlighted`).length).toBe(0)
})



test(`unhighlights when highlightContestantHistory is called with an empty string`, () => {
    const { wrapper, bracket } = init(finished_ucl)
    bracket.highlightContestantHistory('villarreal')
    bracket.highlightContestantHistory('')
    expect(wrapper.querySelectorAll(`.side-wrapper.highlighted`).length).toBe(0)
})



test(`highlighted contestant remains highlighted when highlightContestantHistory is called with invalid arg`, () => {
    const { wrapper, bracket: br } = init(finished_ucl)

    br.highlightContestantHistory('villarreal')

    br.highlightContestantHistory(true)
    br.highlightContestantHistory(NaN)
    br.highlightContestantHistory([])

    const highlighted_side_wrappers = wrapper.querySelectorAll(`.side-wrapper.highlighted`)
    expect(highlighted_side_wrappers.length).toBe(3)
    expect(highlighted_side_wrappers[0].getAttribute('contestant-id')).toBe('villarreal')
    expect(highlighted_side_wrappers[2].getAttribute('contestant-id')).toBe('villarreal')
})

test(`last highlighted match has a "last-highlighted" class (and there is only one such match)`, () => {
    const { wrapper, bracket: br } = init(finished_ucl)

    br.highlightContestantHistory('villarreal')

    const highlighted_match_wrappers = wrapper.querySelectorAll(`.match-wrapper.highlighted`)
    const last_highlighted = highlighted_match_wrappers[highlighted_match_wrappers.length - 1]
    expect(last_highlighted.classList.contains('last-highlighted')).toBe(true)

    expect(wrapper.querySelectorAll(`.match-wrapper.last-highlighted`).length).toBe(1)
})


test(`"last-highlighted" class is removed from match-wrapper after unhighlight`, () => {
    const { wrapper, bracket: br } = init(finished_ucl)

    br.highlightContestantHistory('villarreal')
    br.highlightContestantHistory(null)

    expect(wrapper.querySelectorAll(`.match-wrapper.last-highlighted`).length).toBe(0)
})


test(`does not highlight contestant's matches ON CLICK when options.onMatchClick is defined`, () => {
    const { wrapper } = init(finished_ucl, { onMatchClick: () => {} })

    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`).length).toBe(0)
})

test(`does not highlight contestant's matches ON CLICK when options.onMatchSideClick is defined`, () => {
    const { wrapper } = init(finished_ucl, { onMatchSideClick: () => {} })

    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`).length).toBe(0)
})

test(`can highlight contestant's matches on highlightContestantHistory() call
    when options.onMatchClick and options.onMatchSideClick is provided`, () => {
    const { wrapper, bracket: br } = init(finished_ucl, { onMatchClick: () => {}, onMatchSideClick: () => {} })

    br.highlightContestantHistory('benfica')

    const benfica_sides = wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica']`)
    const highligted_benfica_sides = wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`)

    expect(benfica_sides.length).toBe(2)
    expect(highligted_benfica_sides.length).toBe(2)
})











const spoilt_ucl = deep_clone_object(finished_ucl)
spoilt_ucl.matches.forEach(m => { // i need matches with some contestantIds missing
    m.sides.forEach(s => {
        if (s.contestantId === 'villarreal') {
            delete s.contestantId
        }
    })
})







test(`does not highlight anonymous (contestant-less) sides when a side without [contestant-id] is clicked`, () => {
    const { wrapper } = init(spoilt_ucl)
    const anonymous_side_wrapper = wrapper.querySelector('.side-wrapper:not([contestant-id])')
    anonymous_side_wrapper.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})

test(`does not highlight anonymous (contestant-less) sides when highlightContestantHistory is called with null`, () => {
    const { wrapper, bracket: br } = init(spoilt_ucl)
    br.highlightContestantHistory(null)
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})

test(`does not highlight anonymous (contestant-less) sides when highlightContestantHistory is called with empty string`, () => {
    const { wrapper, bracket: br } = init(spoilt_ucl)
    br.highlightContestantHistory('')
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})


test(`unhighlights when a side without [contestant-id] is clicked`, () => {
    const { wrapper, bracket: br } = init(spoilt_ucl)

    br.highlightContestantHistory('benfica')
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(2)

    const anonymous_side_wrappers = wrapper.querySelectorAll('.side-wrapper:not([contestant-id])')
    anonymous_side_wrappers[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})









test(`click outside bracket should not unhighlight`, () => {
    expect.assertions(1)

    const { wrapper, bracket: br } = init(finished_ucl)
    const some_external_div = create_wrapper()

    br.highlightContestantHistory('benfica')

    some_external_div.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(2)
})












test(`does not highlight on click if options.disableHighlight === true`, () => {
    const { wrapper } = init(finished_ucl, { disableHighlight: true })
    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})


test(`keeps highlighted match highlighted after it was updated via applyMatchesUpdates`, () => {
    const { wrapper, bracket: br } = init(finished_ucl)

    br.highlightContestantHistory('villarreal')

    br.applyMatchesUpdates([{
        "roundIndex": 0,
        "order": 2,
        "matchStatus": "Complete",
        "sides": [
            {
                "contestantId": "villarreal",
                "scores": [
                    {
                        "mainScore": "1",
                        "isWinner": false
                    },
                    {
                        "mainScore": "3",
                        "isWinner": true
                    },
                ],
                "isWinner": true
            },
            {
                "contestantId": "juventus",
                "scores": [
                    {
                        "mainScore": "11111",
                        "isWinner": false
                    },
                    {
                        "mainScore": "0",
                        "isWinner": false
                    },
                ],
                "isWinner": false
            }
        ]
    }])

    expect(wrapper.querySelector(
        `.round-wrapper[round-index="0"] .match-wrapper[match-order="2"].highlighted`
    )).not.toBe(null)

    expect(
        wrapper.querySelectorAll(`.side-wrapper[contestant-id='villarreal'].highlighted`).length
    ).toBe(3)
})