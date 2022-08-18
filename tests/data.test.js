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
 
test(`does not mutate data which wass passed to createPlayoffs`, () => {
    const wrapper = init()

    const dumb_test_data = { rounds: [{ name: 'round 1' }] }

    easyPlayoffs.createPlayoffs(
        dumb_test_data,
        wrapper,
        {}
    )

    expect(dumb_test_data).toEqual({ rounds: [{ name: 'round 1' }] })
})

test(`ignores subsequent mutations of user data passed to createPlayoffs`, () => {
    const wrapper = init()

    const dumb_test_data = {
        rounds: [{ name: 'round 1' }],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1', score: [{ main_score: 1 }]}] }],
        contestants: { c1: { players: [] } }
    }

    const pl = easyPlayoffs.createPlayoffs(
        dumb_test_data,
        wrapper,
        {}
    )

    dumb_test_data.contestants = NaN
    dumb_test_data.rounds[0].name = 'bad round name'
    dumb_test_data.matches[0].sides[0].score[0].main_score = 100000000

    expect(pl.getAllData()).toEqual({
        rounds: [{ name: 'round 1' }],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1', score: [{ main_score: 1 }]}] }],
        contestants: { c1: { players: [] } }
    })

    expect(wrapper.querySelector('.round-name').textContent).toBe('round 1')
    expect(wrapper.querySelector('.main-score').textContent).toBe('1')
})
