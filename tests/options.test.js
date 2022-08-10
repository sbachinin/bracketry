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


test('tells user options via getUserOptions', () => {
    const wrapper = init()

    const { getUserOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    expect(getUserOptions()).toMatchObject({ visibleRoundsCount: 2 })
})

test('applies new visibleRoundsCount via applyNewOptions', () => {
    const wrapper = init()

    const { applyNewOptions, getUserOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    applyNewOptions({ visibleRoundsCount: 4 })

    const all_rounds = [...document.querySelectorAll('.round-wrapper')]
    const visible_rounds = all_rounds.filter(w => !w.classList.contains('hidden'))
    expect(visible_rounds.length).toBe(4)
    expect(getUserOptions()).toMatchObject({ visibleRoundsCount: 4 })
})


test('merges old and new options', () => {
    const wrapper = init()

    const { applyNewOptions, getUserOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    applyNewOptions({ matchMinVerticalGap: 4 })

    expect(getUserOptions().visibleRoundsCount).toBe(2)
    expect(getUserOptions().matchMinVerticalGap).toBe(4)
})





test('applies matchMaxWidth to .match-body', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { matchMaxWidth: 250 }
    )

    expect(
        getComputedStyle(document.querySelector('.match-body')).maxWidth
    ).toBe('250px')
})
