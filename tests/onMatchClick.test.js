/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');
const finished_ucl = require('./ucl-finished.js').default

const init = () => {
    document.body.innerHTML = ''
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test('calls onMatchClick when .match-body is clicked', () => {
    const wrapper = init()

    const onMatchClick = jest.fn()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchClick }
    )

    document.querySelector(
        '.round-wrapper[round-index="0"] .match-wrapper[match-order="1"] .match-body'
    ).dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchClick).toBeCalledWith(expect.objectContaining(finished_ucl.matches[1]))
})

test('does not call onMatchClick when clicked outside match-body', () => {
    const wrapper = init()

    const onMatchClick = jest.fn()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchClick }
    )

    document.querySelector('.round-wrapper')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchClick).not.toBeCalled();
})

test(`pointer-events of a .side_wrapper are disabled when onMatchClick is provided
    (clicks must be registered only on .match-body and not on its descendants)`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchClick: () => {} }
    )

    expect(getComputedStyle(document.querySelector(`.side-wrapper`)).pointerEvents).toBe('none')
    expect(getComputedStyle(document.querySelector(`.match-body`)).pointerEvents).toBe('auto')
})


test(`contestant's match history isn't highlighted on click when onMatchClick is provided`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchClick: () => {} }
    )

    document.querySelector('.match-body')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(document.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)

    document.querySelector(`.side-wrapper[contestant-id='benfica']`)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(document.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})
