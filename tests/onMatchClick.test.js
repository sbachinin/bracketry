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

    document.querySelector('.match-wrapper[match-id="1"] .match-body')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchClick).toBeCalledWith(
        expect.objectContaining({
            roundIndex: 0,
            id: '1',
            order: 1,
        }),
    )
})

test('does not call onMatchClick when clicked somewhere else', () => {
    const wrapper = init()

    const onMatchClick = jest.fn()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchClick }
    )

    document.querySelector('.match-wrapper[match-id="1"]')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchClick).not.toBeCalled();
})

test(`pointer-events of a .side_wrapper are disabled when onMatchClick is provided
    (clicks must be registered only on .match-body and not on its descendants`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchClick: () => {} }
    )

    expect(getComputedStyle(
        document.querySelector(`.side-wrapper[contestant-id='benfica']`)
    ).pointerEvents).toBe('none')

    expect(getComputedStyle(
        document.querySelector('.match-wrapper[match-id="1"] .match-body')
    ).pointerEvents).toBe('auto')
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

// TODO think:
// what if there wasn't any data for a match in this position?
// won't pointer events be disabled in this case?
