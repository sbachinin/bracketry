/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`renders entry status only for sides which have entry_status (when no options.getEntryStatusHTML)`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Josh' }] },
            c2: { entry_status: 'WC', players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data)
    const elements = wrapper.querySelectorAll('.side-info-item.entry-status')
    expect((elements[0]).textContent).toBe('')
    expect((elements[1]).textContent).toBe('WC')
})


test(`does not render non-string "entry_status" (when no options.getEntryStatusHTML)`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { entry_status: {}, players: [{ title: 'Pete' }] }
        }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('')
})


test(`renders html provided as entry_status`, () => {
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: {
                entry_status: '<span class="user-status" style="background: tomato">WC</span>',
                players: [{ title: 'Pete' }]
            }
        }
    }
    const { wrapper } = init(data)
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-info-item.entry-status .user-status')
        ).background
    ).toBe('tomato')
})

