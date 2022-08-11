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


test('calls onMatchSideClick when .side-wrapper is clicked', () => {
    const wrapper = init()

    const onMatchSideClick = jest.fn()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchSideClick }
    )

    document.querySelector('.match-wrapper[match-id="1"] .side-wrapper[contestant-id="inter"]')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchSideClick).toBeCalledWith(
        expect.objectContaining(finished_ucl.contestants.inter),
        'inter',
        expect.objectContaining(finished_ucl.matches.find(m => m.match_id === '1'))
    )
})

test('does not call onMatchSideClick when clicked somewhere else', () => {
    const wrapper = init()

    const onMatchSideClick = jest.fn()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchSideClick }
    )

    document.querySelector('.match-wrapper')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(onMatchSideClick).not.toBeCalled();
})

test(`pointer-events of everything inside .side_wrapper are disabled (even if onMatchSideClick is not provided)`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    expect(getComputedStyle(
        document.querySelector(`.player-title`)
    ).pointerEvents).toBe('none')

    expect(getComputedStyle(
        document.querySelector(`.side-info-item`)
    ).pointerEvents).toBe('none')
})


test(`contestant's match history isn't highlighted on click when onMatchClick is provided`, () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { onMatchClick: () => {} }
    )

    document.querySelector('.side-wrapper')
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(document.querySelectorAll('.match-wrapper.highlighted').length).toBe(0)
})
