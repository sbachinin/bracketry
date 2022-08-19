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


test('replaces old playoffs with new playoffs when createPlayoffs is called again with the same wrapper', () => {
    const wrapper = create_wrapper()

    const first_data = {
        rounds: [{}],
        matches: [{
            id: 'm1',
            round_index: 0,
            order: 0,
            sides: [
                { contestant_id: 'c1' },
                { contestant_id: 'c2' }
            ]
        }],
        contestants: {
            c1: { players: [{ title: 'John' }] },
            c2: { players: [{ title: 'Pete' }] }
        }
    }

    const second_data = { rounds: [{}, {}, {}, {}] }

    createPlayoffs(first_data, wrapper)
    createPlayoffs(second_data, wrapper)

    expect(wrapper.querySelectorAll('.root-brackets-element').length).toBe(1)
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(4)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id]').length).toBe(0)
})



test(`two coexisting playoffs don't intervene into each other's navigation state`, () => {
    const wrapper1 = create_wrapper()
    const wrapper2 = create_wrapper()

    const pl1 = createPlayoffs({ rounds: [{}, {}, {}, {}, {}] }, wrapper1, { visibleRoundsCount: 1 })
    const pl2 = createPlayoffs({ rounds: [{}, {}, {}, {}] }, wrapper2, { visibleRoundsCount: 2 })

    pl1.moveToLastRound()
    expect(pl1.getNavigationState().baseRoundIndex).toBe(4)
    expect(pl2.getNavigationState().baseRoundIndex).toBe(0)
})


test(`two coexisting playoffs don't intervene into each other's data`, () => {
    const wrapper1 = create_wrapper()
    const wrapper2 = create_wrapper()

    const pl1 = createPlayoffs({ rounds: [{}, {}, {}, {}, {}] }, wrapper1)
    const pl2 = createPlayoffs({ rounds: [{}, {}, {}, {}] }, wrapper2)

    pl1.replaceData({ rounds: [{}] })
    expect(pl1.getAllData().rounds.length).toBe(1)
    expect(pl2.getAllData().rounds.length).toBe(4)
})


test(`two coexisting playoffs don't intervene into each other's "highlighted" state`, () => {
    const wrapper1 = create_wrapper()
    const wrapper2 = create_wrapper()

    createPlayoffs(finished_ucl, wrapper1)
    createPlayoffs(finished_ucl, wrapper2)

    const benfica_side_selector = `.side-wrapper[contestant-id='benfica']`

    wrapper1.querySelector(benfica_side_selector)
        .dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

    expect(wrapper1.querySelectorAll(benfica_side_selector + '.highlighted').length).toBe(2)
    expect(wrapper2.querySelectorAll(benfica_side_selector + '.highlighted').length).toBe(0)
})




test('calls "dead" playoffs api functions after it being removed from the DOM', () => {
    const wrapper = create_wrapper()

    const old_pl = createPlayoffs({ rounds: [] }, wrapper)
    const new_pl = createPlayoffs({ rounds: [] }, wrapper)

    // new_pl.getNavigationState()
})


// what happens with the "dead" playoffs' api whose elements were removed?

