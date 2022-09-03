/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const finished_ucl = require('./ucl-finished.js').default
const { deep_clone_object, create_wrapper, init } = require('./utils.js')


test('highlights team history (add "highlighted" class to .match-wrapper and .side-wrapper)', () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)

    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(2)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test(`highlights next contestant's history after next click`, () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    const real_selector = `.side-wrapper[contestant-id='real']`

    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    wrapper.querySelector(real_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(4)
    expect(wrapper.querySelectorAll(real_selector + '.highlighted').length).toBe(4)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)
})



test(`does not highlight when something other than '.side-wrapper' is clicked`, () => {
    const { wrapper } = init(finished_ucl)

    wrapper.querySelector('.matches-positioner')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)

    wrapper.querySelector('.match-wrapper')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
    
    wrapper.querySelector('.navigation-button.active')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})


test('unhighlights history after click within .matches-positioner but not .side-wrapper', () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)

    wrapper.querySelector('.round-wrapper')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)
})


test('does not unhighlight history after click outside .matches-positioner', () => {
    const { wrapper } = init(finished_ucl)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)

    wrapper.querySelector('.all-but-buttons-header')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test('highlights a contestant history when highlightContestantHistory is called with a valid contestantId', () => {
    const { wrapper, playoffs } = init(finished_ucl)

    playoffs.highlightContestantHistory('villarreal')

    expect(
        wrapper.querySelectorAll(`.side-wrapper[contestant-id='villarreal'].highlighted`).length
    ).toBe(3)
})


test('highlights a contestant history when highlightContestantHistory is called with a valid contestantId', () => {
    const { wrapper, playoffs } = init(finished_ucl)

    playoffs.highlightContestantHistory('villarreal')

    const highlighted_side_wrappers = wrapper.querySelectorAll(`.side-wrapper.highlighted`)
    expect(highlighted_side_wrappers.length).toBe(3)
    expect(highlighted_side_wrappers[0].getAttribute('contestant-id')).toBe('villarreal')
    expect(highlighted_side_wrappers[2].getAttribute('contestant-id')).toBe('villarreal')
})

test('unhighlights when highlightContestantHistory is called with null', () => {
    const { wrapper, playoffs } = init(finished_ucl)

    playoffs.highlightContestantHistory('villarreal')

    playoffs.highlightContestantHistory(null)

    expect(wrapper.querySelectorAll(`.side-wrapper.highlighted`).length).toBe(0)
})


test('unhighlights when highlightContestantHistory is called with irrelevant string', () => {
    const { wrapper, playoffs } = init(finished_ucl)
    playoffs.highlightContestantHistory('villarreal')
    playoffs.highlightContestantHistory('nonsense')
    expect(wrapper.querySelectorAll(`.side-wrapper.highlighted`).length).toBe(0)
})



test(`unhighlights when highlightContestantHistory is called with an empty string`, () => {
    const { wrapper, playoffs } = init(finished_ucl)
    playoffs.highlightContestantHistory('villarreal')
    playoffs.highlightContestantHistory('')
    expect(wrapper.querySelectorAll(`.side-wrapper.highlighted`).length).toBe(0)
})



test(`highlighted contestant remains highlighted when highlightContestantHistory is called with invalid arg`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)

    pl.highlightContestantHistory('villarreal')

    pl.highlightContestantHistory(true)
    pl.highlightContestantHistory(NaN)
    pl.highlightContestantHistory([])

    const highlighted_side_wrappers = wrapper.querySelectorAll(`.side-wrapper.highlighted`)
    expect(highlighted_side_wrappers.length).toBe(3)
    expect(highlighted_side_wrappers[0].getAttribute('contestant-id')).toBe('villarreal')
    expect(highlighted_side_wrappers[2].getAttribute('contestant-id')).toBe('villarreal')
})

test('last highlighted match has a "last-highlighted" class (and there is only one such match)', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)

    pl.highlightContestantHistory('villarreal')

    const highlighted_match_wrappers = wrapper.querySelectorAll(`.match-wrapper.highlighted`)
    const last_highlighted = highlighted_match_wrappers[highlighted_match_wrappers.length - 1]
    expect(last_highlighted.classList.contains('last-highlighted')).toBe(true)

    expect(wrapper.querySelectorAll(`.match-wrapper.last-highlighted`).length).toBe(1)
})


test('"last-highlighted" class is removed from match-wrapper after unhighlight', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)

    pl.highlightContestantHistory('villarreal')
    pl.highlightContestantHistory(null)

    expect(wrapper.querySelectorAll(`.match-wrapper.last-highlighted`).length).toBe(0)
})



test(`".line-wrapper" elements of a .highlighted (but not .last-highlighted) match
    have style.color === options.highlightedConnectionLinesColor`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl, { highlightedConnectionLinesColor: 'navy' })

    pl.highlightContestantHistory('villarreal')

    const highlighted_match_wrappers = wrapper.querySelectorAll(`.match-wrapper.highlighted`)

    expect(
        getComputedStyle(
            highlighted_match_wrappers[0].querySelector('.line-wrapper:first-child')
        ).color
    ).toBe('navy')

    expect(
        getComputedStyle(
            highlighted_match_wrappers[1].querySelector('.line-wrapper:last-child')
        ).color
    ).toBe('navy')
})


test(`".line-wrapper" elements of last highlighted match have style.color === options.connectionLinesColor
(it unhighlights a right pseudo border which is actually a box-shadow)`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl, { connectionLinesColor: 'red' })

    pl.highlightContestantHistory('villarreal')

    const last_highlighted_line_wrappers = wrapper.querySelectorAll(`.match-wrapper.last-highlighted .line-wrapper`)
    expect(getComputedStyle(last_highlighted_line_wrappers[0]).color).toBe('red')
    expect(getComputedStyle(last_highlighted_line_wrappers[1]).color).toBe('red')
})


test(`does not highlight contestant's matches ON CLICK when options.onMatchClick is defined`, () => {
    const { wrapper } = init(finished_ucl, { onMatchClick: () => {} })

    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`).length).toBe(0)
})

test(`does not highlight contestant's matches ON CLICK when options.onMatchSideClick is defined`, () => {
    const { wrapper } = init(finished_ucl, { onMatchSideClick: () => {} })

    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`).length).toBe(0)
})

test(`can highlight contestant's matches on highlightContestantHistory() call
    when options.onMatchClick and options.onMatchSideClick is provided`, () => {
    const { wrapper, playoffs: pl } = init(finished_ucl, { onMatchClick: () => {}, onMatchSideClick: () => {} })

    pl.highlightContestantHistory('benfica')

    const benfica_sides = wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica']`)
    const highligted_benfica_sides = wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`)

    expect(highligted_benfica_sides.length).toBe(benfica_sides.length)
})











const spoilt_ucl = deep_clone_object(finished_ucl)
spoilt_ucl.matches.forEach(m => { // i need matches with some contestant_ids missing
    m.sides.forEach(s => {
        if (s.contestantId === 'villarreal') {
            delete s.contestantId
        }
    })
})







test(`does not highlight anonymous (contestant-less) sides when a side without [contestant-id] is clicked`, () => {
    const { wrapper } = init(spoilt_ucl)
    const anonymous_side_wrapper = wrapper.querySelector('.side-wrapper:not([contestant-id])')
    anonymous_side_wrapper.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})

test(`does not highlight anonymous (contestant-less) sides when highlightContestantHistory is called with null`, () => {
    const { wrapper, playoffs: pl } = init(spoilt_ucl)
    pl.highlightContestantHistory(null)
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})

test(`does not highlight anonymous (contestant-less) sides when highlightContestantHistory is called with empty string`, () => {
    const { wrapper, playoffs: pl } = init(spoilt_ucl)
    pl.highlightContestantHistory('')
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})


test(`unhighlights when a side without [contestant-id] is clicked`, () => {
    const { wrapper, playoffs: pl } = init(spoilt_ucl)

    pl.highlightContestantHistory('benfica')
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(2)

    const anonymous_side_wrappers = wrapper.querySelectorAll('.side-wrapper:not([contestant-id])')
    anonymous_side_wrappers[0].dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})



test(`click outside playoffs should not unhighlight`, () => {
    expect.assertions(1)

    const { wrapper, playoffs: pl } = init(spoilt_ucl)
    const some_external_div = create_wrapper()

    pl.highlightContestantHistory('benfica')

    some_external_div.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(2)
})
