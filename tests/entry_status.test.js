/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs

const create_wrapper = () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test(`does not add "with-entry-statuses" class to matches-positioner if no sides have "entry_status"`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}, {}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'pete' }] },
            c2: { players: [{ title: 'josh' }] }
        }
    }

    createPlayoffs(data, wrapper)

    expect(wrapper.querySelector('.matches-positioner').classList.contains('with-entry-statuses')).toBe(false)
})


test(`does not add 'with-entry-statuses' class to matches-positioner in case of INVALID "entry_status"`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}, {}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: { c1: { entry_status: {}, players: [{ title: 'pete' }] } }
    }
    
    createPlayoffs(data, wrapper)
    
    expect(wrapper.querySelector('.matches-positioner').classList.contains('with-entry-statuses')).toBe(false)
})


test(`adds "with-entry-statuses" class to matches-positioner if at least 1 Side has a valid "entry_status"`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}, {}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { entry_status: 'WC', players: [{ title: 'josh' }] }
        }
    }

    createPlayoffs(data, wrapper)

    expect(wrapper.querySelector('.matches-positioner').classList.contains('with-entry-statuses')).toBe(true)
})























test(`renders entry status only for sides which have entry_status`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Josh' }] },
            c2: { entry_status: 'WC', players: [{ title: 'Pete' }] }
        }
    }

    createPlayoffs(data, wrapper)
    const elements = wrapper.querySelectorAll('.side-info-item.entry-status')
    expect((elements[0]).textContent).toBe('')
    expect((elements[1]).textContent).toBe('WC')
})


test(`hides ".entry-status" elements if no sides have "entry_status"
    (even if there is an EXTRA contestant with "entry_status")`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'john' }] },
            c2: { players: [{ title: 'pete' }] },
            c3: { entry_status: 'WC', players: [{ title: 'steve' }] }
        }
    }

    createPlayoffs(data, wrapper)

    const elements = wrapper.querySelectorAll('.side-info-item.entry-status')
    expect(getComputedStyle(elements[0]).display).toBe('none')
    expect(getComputedStyle(elements[1]).display).toBe('none')
})


test(`does not apply {display: none} to any .entry-status elements if at least one side has "entry_status"`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete' }] },
            c2: { entry_status: 'WC', players: [{ title: 'Josh' }] }
        }
    }

    createPlayoffs(data, wrapper)

    const elements = wrapper.querySelectorAll('.side-info-item.entry-status')
    expect(getComputedStyle(elements[0]).display).not.toBe('none')
    expect(getComputedStyle(elements[1]).display).not.toBe('none')
})


test(`does not render crap if invalid "entry_status" is provided`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { entry_status: {}, players: [{ title: 'Pete' }] }
        }
    }

    createPlayoffs(data, wrapper)

    expect(wrapper.querySelector('.side-info-item.entry-status').innerHTML).toBe('')
})


test(`renders html provided as entry_status`, () => {
    const wrapper = create_wrapper()
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

    createPlayoffs(data, wrapper)
    
    expect(
        getComputedStyle(
            wrapper.querySelector('.side-info-item.entry-status .user-status')
        ).background
    ).toBe('tomato')
})
