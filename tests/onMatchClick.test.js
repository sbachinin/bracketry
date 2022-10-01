/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test('calls onMatchClick when .match-body is clicked', () => {
    const onMatchClick = jest.fn()
    const { wrapper } = init(finished_ucl, { onMatchClick })

    wrapper.querySelector(
        '.round-wrapper[round-index="0"] .match-wrapper[match-order="1"] .match-body'
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(onMatchClick).toBeCalledWith(expect.objectContaining(finished_ucl.matches[1]))
})

test('does not call onMatchClick when clicked outside match-body', () => {
    const onMatchClick = jest.fn()
    const { wrapper } = init(finished_ucl, { onMatchClick })

    wrapper.querySelector('.round-wrapper')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(onMatchClick).not.toBeCalled()
})

test(`pointer-events of a .side_wrapper are disabled when onMatchClick is provided
    (clicks must be registered only on .match-body and not on its descendants)`, () => {
    const { wrapper } = init(finished_ucl, { onMatchClick: () => {} })
    expect(getComputedStyle(wrapper.querySelector(`.side-wrapper`)).pointerEvents).toBe('none')
    expect(getComputedStyle(wrapper.querySelector(`.match-body`)).pointerEvents).toBe('auto')
})


test(`contestant's match history isn't highlighted on click when onMatchClick is provided`, () => {
    const { wrapper } = init(finished_ucl, { onMatchClick: () => {} })

    wrapper.querySelector('.match-body')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)

    wrapper.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})
