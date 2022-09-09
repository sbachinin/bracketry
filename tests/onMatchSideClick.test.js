/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test('calls onMatchSideClick when .side-wrapper is clicked', () => {
    const onMatchSideClick = jest.fn()
    const { wrapper } = init(finished_ucl, { onMatchSideClick })
    wrapper.querySelector('.side-wrapper[contestant-id="inter"]')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchSideClick).toBeCalledWith(
        expect.objectContaining(finished_ucl.matches[1]),
        expect.objectContaining(finished_ucl.contestants.inter),
        'inter'
    )
})

test('does not call onMatchSideClick when clicked somewhere else', () => {
    const onMatchSideClick = jest.fn()
    const { wrapper } = init(finished_ucl, { onMatchSideClick })
    wrapper.querySelector('.match-wrapper')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchSideClick).not.toBeCalled();
})



test(`pointer-events of everything inside .side_wrapper are disabled (even if onMatchSideClick is not provided)`, () => {
    const { wrapper } = init(finished_ucl)
    expect(getComputedStyle(wrapper.querySelector(`.player-title`)).pointerEvents).toBe('none')
    expect(getComputedStyle(wrapper.querySelector(`.side-info-item`)).pointerEvents).toBe('none')
})


test(`contestant's match history isn't highlighted on click when onMatchClick is provided`, () => {
    const { wrapper } = init(finished_ucl, { onMatchSideClick: () => { } })
    wrapper.querySelector('.side-wrapper')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})

