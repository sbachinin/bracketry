/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const { createBracket } = require('../dist/cjs/index.js')
const finished_ucl = require('./data/ucl-finished.js').default


test(`uninstalls old bracket when new bracket is installed into the same wrapper`, () => {

    const { wrapper, bracket: br1 } = init(finished_ucl)
    const uninstSpy = jest.spyOn(br1, 'uninstall')

    createBracket({ rounds: [{}, {}] }, wrapper)

    expect(uninstSpy).toBeCalled()

    expect(wrapper.querySelectorAll('.bracket-root').length).toBe(1)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(2)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id]').length).toBe(0)
})



test(`two coexisting brackets don't intervene in each other's navigation state`, () => {

    const { bracket: br1 } = init(
        { rounds: [{}, {}, {}, {}, {}] },
        { visibleRoundsCount: 1 }
    )
    const { bracket: br2 } = init(
        { rounds: [{}, {}, {}, {}] },
        { visibleRoundsCount: 2 }
    )

    br1.moveToLastRound()
    expect(br1.getNavigationState().baseRoundIndex).toBe(4)
    expect(br2.getNavigationState().baseRoundIndex).toBe(0)
})


test(`two coexisting brackets don't intervene in each other's data`, () => {

    const { bracket: br1 } = init({ rounds: [{}, {}, {}, {}, {}] })
    const { bracket: br2 } = init({ rounds: [{}, {}, {}, {}] })

    br1.replaceData({ rounds: [{}] })
    expect(br1.getAllData().rounds.length).toBe(1)
    expect(br2.getAllData().rounds.length).toBe(4)
})


test(`two coexisting brackets don't intervene in each other's "highlighted" state`, () => {

    const { wrapper: w1 } = init(finished_ucl)
    const { wrapper: w2 } = init(finished_ucl)

    const benfica_side_selector = `.side-wrapper[contestant-id='benfica']`

    w1.querySelector(benfica_side_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(w1.querySelectorAll(benfica_side_selector + '.highlighted').length).toBe(2)
    expect(w2.querySelectorAll(benfica_side_selector + '.highlighted').length).toBe(0)
})

