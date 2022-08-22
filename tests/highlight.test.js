/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default


const create_wrapper = () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test('highlights team history (add "highlighted" class to .match-wrapper and .side-wrapper)', () => {
    const wrapper = create_wrapper()

    createPlayoffs(finished_ucl, wrapper)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)

    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(2)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test(`highlights next contestant's history after next click`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(finished_ucl, wrapper)

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
    const wrapper = create_wrapper()

    createPlayoffs(finished_ucl, wrapper)

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


test('unhighlights history after click on anything other than .side-wrapper', () => {
    const wrapper = create_wrapper()

    createPlayoffs(finished_ucl, wrapper)

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`
    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)

    wrapper.querySelector('.matches-positioner')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(0)
})



test('highlights a contestant history when highlightContestantHistory is called with a valid contestant_id', () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.highlightContestantHistory('villarreal')

    expect(
        wrapper.querySelectorAll(`.side-wrapper[contestant-id='villarreal'].highlighted`).length
    ).toBe(3)
})


test('highlights a contestant history when highlightContestantHistory is called with a valid contestant_id', () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.highlightContestantHistory('villarreal')

    const highlighted_side_wrappers = wrapper.querySelectorAll(`.side-wrapper.highlighted`)
    expect(highlighted_side_wrappers.length).toBe(3)
    expect(highlighted_side_wrappers[0].getAttribute('contestant-id')).toBe('villarreal')
    expect(highlighted_side_wrappers[2].getAttribute('contestant-id')).toBe('villarreal')
})

test('unhighlights when highlightContestantHistory is called with null', () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.highlightContestantHistory('villarreal')

    pl.highlightContestantHistory(null)

    expect(wrapper.querySelectorAll(`.side-wrapper.highlighted`).length).toBe(0)
})


test(`highlighted contestant remains highlighted when highlightContestantHistory is called with invalid arg`, () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.highlightContestantHistory('villarreal')

    pl.highlightContestantHistory('nonsense')
    pl.highlightContestantHistory(true)
    pl.highlightContestantHistory(NaN)
    pl.highlightContestantHistory([])

    const highlighted_side_wrappers = wrapper.querySelectorAll(`.side-wrapper.highlighted`)
    expect(highlighted_side_wrappers.length).toBe(3)
    expect(highlighted_side_wrappers[0].getAttribute('contestant-id')).toBe('villarreal')
    expect(highlighted_side_wrappers[2].getAttribute('contestant-id')).toBe('villarreal')
})

test('last highlighted match has a "last-highlighted" class (and there is only one such match)', () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.highlightContestantHistory('villarreal')

    const highlighted_match_wrappers = wrapper.querySelectorAll(`.match-wrapper.highlighted`)
    const last_highlighted = highlighted_match_wrappers[highlighted_match_wrappers.length - 1]
    expect(last_highlighted.classList.contains('last-highlighted')).toBe(true)

    expect(wrapper.querySelectorAll(`.match-wrapper.last-highlighted`).length).toBe(1)
})


test('"last-highlighted" class is removed from match-wrapper after unhighlight', () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper)

    pl.highlightContestantHistory('villarreal')
    pl.highlightContestantHistory(null)

    expect(wrapper.querySelectorAll(`.match-wrapper.last-highlighted`).length).toBe(0)
})



test(`".line-wrapper" elements of a .highlighted (but not .last-highlighted) match
    have style.color === options.highlightedConnectionLinesColor`, () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper, { highlightedConnectionLinesColor: 'navy' })

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
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper, { connectionLinesColor: 'red' })

    pl.highlightContestantHistory('villarreal')

    const last_highlighted_line_wrappers = wrapper.querySelectorAll(`.match-wrapper.last-highlighted .line-wrapper`)
    expect(getComputedStyle(last_highlighted_line_wrappers[0]).color).toBe('red')
    expect(getComputedStyle(last_highlighted_line_wrappers[1]).color).toBe('red')
})


test(`does not highlight contestant's matches ON CLICK when options.onMatchClick is defined`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(finished_ucl, wrapper, { onMatchClick: () => {} })

    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`).length).toBe(0)
})

test(`does not highlight contestant's matches ON CLICK when options.onMatchSideClick is defined`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(finished_ucl, wrapper, { onMatchSideClick: () => {} })

    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`).length).toBe(0)
})

test(`can highlight contestant's matches on highlightContestantHistory() call
    when options.onMatchClick and options.onMatchSideClick is provided`, () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(finished_ucl, wrapper, { onMatchClick: () => {}, onMatchSideClick: () => {} })

    pl.highlightContestantHistory('benfica')

    const benfica_sides = wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica']`)
    const highligted_benfica_sides = wrapper.querySelectorAll(`.side-wrapper[contestant-id='benfica'].highlighted`)

    expect(highligted_benfica_sides.length).toBe(benfica_sides.length)
})











const deep_clone_object = obj => {
    if (obj === null || typeof obj !== 'object') return obj
    let temp = new obj.constructor()
    for (let key in obj) { if (obj.hasOwnProperty(key)) { temp[key] = deep_clone_object(obj[key]) }}
    return temp
}
const spoilt_ucl = deep_clone_object(finished_ucl)
spoilt_ucl.matches.forEach(m => { // i need matches with some contestant_ids missing
    m.sides.forEach(s => {
        if (s.contestant_id === 'villarreal') {
            delete s.contestant_id
        }
    })
})







test(`does not highlight anything when a side without [contestant-id] is clicked`, () => {
    const wrapper = create_wrapper()

    createPlayoffs(spoilt_ucl, wrapper)

    const anonymous_side_wrappers = wrapper.querySelectorAll('.side-wrapper:not([contestant-id])')
    anonymous_side_wrappers[0].dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})

test(`unhighlights when a side without [contestant-id] is clicked`, () => {
    const wrapper = create_wrapper()

    const pl = createPlayoffs(spoilt_ucl, wrapper)

    pl.highlightContestantHistory('benfica')
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(2)

    const anonymous_side_wrappers = wrapper.querySelectorAll('.side-wrapper:not([contestant-id])')
    anonymous_side_wrappers[0].dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(0)
})



test(`click outside playoffs should not unhighlight`, () => {
    const wrapper = create_wrapper()
    const some_external_div = create_wrapper()

    expect.assertions(1)

    const pl = createPlayoffs(spoilt_ucl, wrapper)

    pl.highlightContestantHistory('benfica')

    some_external_div.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    expect(wrapper.querySelectorAll('.side-wrapper.highlighted').length).toBe(2)
})
