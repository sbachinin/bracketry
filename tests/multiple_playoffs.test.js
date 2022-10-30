/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const { createPlayoffs } = require('../dist/cjs/index.js')
const finished_ucl = require('./ucl-finished.js').default


test(`uninstalls old playoffs when new playoffs are installed into the same wrapper`, () => {

    const { wrapper, playoffs: first_playoffs } = init(finished_ucl)
    const uninstSpy = jest.spyOn(first_playoffs, 'uninstall')

    createPlayoffs({ rounds: [{}, {}] }, wrapper)

    expect(uninstSpy).toBeCalled();

    expect(wrapper.querySelectorAll('.playoffs-root').length).toBe(1)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(2)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id]').length).toBe(0)
})



test(`two coexisting playoffs don't intervene in each other's navigation state`, () => {

    const { playoffs: pl1 } = init(
        { rounds: [{}, {}, {}, {}, {}] },
        { visibleRoundsCount: 1 }
    )
    const { playoffs: pl2 } = init(
        { rounds: [{}, {}, {}, {}] },
        { visibleRoundsCount: 2 }
    )

    pl1.moveToLastRound()
    expect(pl1.getNavigationState().baseRoundIndex).toBe(4)
    expect(pl2.getNavigationState().baseRoundIndex).toBe(0)
})


test(`two coexisting playoffs don't intervene in each other's data`, () => {

    const { playoffs: pl1 } = init({ rounds: [{}, {}, {}, {}, {}] })
    const { playoffs: pl2 } = init({ rounds: [{}, {}, {}, {}] })

    pl1.replaceData({ rounds: [{}] })
    expect(pl1.getAllData().rounds.length).toBe(1)
    expect(pl2.getAllData().rounds.length).toBe(4)
})


test(`two coexisting playoffs don't intervene in each other's "highlighted" state`, () => {

    const { wrapper: w1 } = init(finished_ucl)
    const { wrapper: w2 } = init(finished_ucl)

    const benfica_side_selector = `.side-wrapper[contestant-id='benfica']`

    w1.querySelector(benfica_side_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(w1.querySelectorAll(benfica_side_selector + '.highlighted').length).toBe(2)
    expect(w2.querySelectorAll(benfica_side_selector + '.highlighted').length).toBe(0)
})

