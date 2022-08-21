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

test('for a missing match renders a stub .match-wrapper without match-id attr', () => {
    const wrapper = init()
    const data_without_one_match = { ...finished_ucl, matches: finished_ucl.matches.slice(1) }

    easyPlayoffs.createPlayoffs(
        data_without_one_match,
        wrapper,
        {}
    )

    const matches_without_ids = document.querySelectorAll('.match-wrapper:not([match-id])')
    expect(matches_without_ids).toHaveLength(1)
    expect(matches_without_ids[0].textContent.trim().length).toBe(0)
})

// TODO WTF?
/* 
test('applies { pointer-events: none } to stub .match-wrapper', () => {
    const wrapper = init()
    const data_without_one_match = { ...finished_ucl, matches: finished_ucl.matches.slice(1) }

    easyPlayoffs.createPlayoffs(
        data_without_one_match,
        wrapper,
        {}
    )

    expect(
        getComputedStyle(
            document.querySelector('.match-wrapper:not([match-id])')
        ).pointerEvents
    ).toBe('none')
})
 */
test('fills upcoming (match-less) 4-round tournament with stub matches', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        { rounds: [ {}, {}, {}, {} ], matches: [], contestants: {} },
        wrapper,
        {}
    )
    expect(document.querySelectorAll('.match-wrapper')).toHaveLength(15)
})
