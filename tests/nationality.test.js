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





test(`does not add 'with-nationalities' class to matches-positioner if no sides have "nationality_code" or "flag_url"
    (even if there is a contestant with flag_url)`, () => {
    const wrapper = create_wrapper()
    const data = { rounds: [{}, {}],
        matches: [ { id: 'm1', round_index: 0, order: 0, sides: [] } ],
        contestants: { c1: { players: [ { flag_url: 'some_url', nationality_code: 'US' } ] } }
    }

    createPlayoffs(data, wrapper)

    expect(wrapper.querySelector('.matches-positioner').classList.contains('with-nationalities')).toBe(false)
})


test(`does not add 'with-nationalities' class to matches-positioner in case of INVALID "nationality_code" AND "flag_url"`, () => {
    const wrapper = create_wrapper()
    const data = { rounds: [{}, {}],
        matches: [ { id: 'm1', round_index: 0, order: 0, sides: [ { contestant_id: 'c1' } ] } ],
        contestants: { c1: { players: [ { flag_url: 323, nationality_code: {} } ] } }
    }

    createPlayoffs(data, wrapper)

    expect(wrapper.querySelector('.matches-positioner').classList.contains('with-nationalities')).toBe(false)
})


test(`adds "with-nationalities" class to matches-positioner if at least 1 Side has a valid "flag_url"`, () => {
    const wrapper = create_wrapper()
    const data = { rounds: [{}, {}],
        matches: [ { id: 'm1', round_index: 0, order: 0, sides: [ { contestant_id: 'c1'} ] } ],
        contestants: { c1: { players: [ { flag_url: 'some_url' } ] } }
    }

    createPlayoffs(data, wrapper)

    expect(wrapper.querySelector('.matches-positioner').classList.contains('with-nationalities')).toBe(true)
})

test(`adds "with-nationalities" class to matches-positioner if at least 1 Side has a valid "nationality_code"`, () => {
    const wrapper = create_wrapper()
    const data = { rounds: [{}, {}],
        matches: [ { id: 'm1', round_index: 0, order: 0, sides: [ { contestant_id: 'c1'} ] } ],
        contestants: { c1: { players: [ { nationality_code: 'US' } ] } }
    }

    createPlayoffs(data, wrapper)

    expect(wrapper.querySelector('.matches-positioner').classList.contains('with-nationalities')).toBe(true)
})














test(`renders nationality code only for sides which have nationality_code`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Josh' }] },
            c2: { players: [{ title: 'Pete', nationality_code: 'US' }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_elements = wrapper.querySelectorAll('.player-wrapper .nationality')
    expect((nat_elements[0]).textContent).toBe('')
    expect((nat_elements[1]).textContent).toBe('US')
})

test(`renders flag <img> only for sides which have flag_url`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Josh' }] },
            c2: { players: [{ title: 'Pete', flag_url: 'some_url' }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_elements = wrapper.querySelectorAll('.player-wrapper .nationality')
    expect((nat_elements[0]).innerHTML).toBe('')
    expect((nat_elements[1]).querySelector('img')).not.toBe(null)
    expect((nat_elements[1]).querySelector('img').getAttribute('src')).toBe('some_url')
})


test(`hides '.nationality' elements if no sides have "nationality_code" or "flag_url" for their contestants
    (even if there is an EXTRA contestant with flag_url)`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'john' }] },
            c2: { players: [{ title: 'pete' }] },
            c3: { players: [{ title: 'steve', flag_url: 'unused_url' }] }
        }
    }

    createPlayoffs(data, wrapper)

    expect(
        getComputedStyle(wrapper.querySelectorAll('.player-wrapper .nationality')[0]).display
    ).toBe('none')
    expect(
        getComputedStyle(wrapper.querySelectorAll('.player-wrapper .nationality')[1]).display
    ).toBe('none')
})


test(`does not apply {display: none} to any .nationality elements if at least one side has nationality_code`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality_code: 'US' }] },
            c2: { players: [{ title: 'Josh' }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_elements = wrapper.querySelectorAll('.player-wrapper .nationality')
    expect(getComputedStyle(nat_elements[0]).display).not.toBe('none')
    expect(getComputedStyle(nat_elements[1]).display).not.toBe('none')
})


test(`does not apply {display: none} to any .nationality elements if at least one side has flag_url`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', flag_url: 'some_url' }] },
            c2: { players: [{ title: 'Josh' }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_elements = wrapper.querySelectorAll('.player-wrapper .nationality')
    expect(getComputedStyle(nat_elements[0]).display).not.toBe('none')
    expect(getComputedStyle(nat_elements[1]).display).not.toBe('none')
})


test(`renders flag <img> if contestant has both nationality_code and flag_url`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', flag_url: 'some_url', nationality_code: 'US' }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_element = wrapper.querySelector('.player-wrapper .nationality')
    expect((nat_element).textContent).toBe('')
    expect((nat_element).querySelector('img')).not.toBe(null)
    expect((nat_element).querySelector('img').getAttribute('src')).toBe('some_url')
})


test(`does not render crap if invalid nationality_code is provided`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality_code: {} }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_element = wrapper.querySelector('.player-wrapper .nationality')
    expect((nat_element).innerHTML).toBe('')
})

test(`does not render crap if invalid flag_url is provided`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', flag_url: {} }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_element = wrapper.querySelector('.player-wrapper .nationality')
    expect((nat_element).innerHTML).toBe('')
})


test(`renders html provided as "nationality_code"`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{
                title: 'Pete',
                nationality_code: '<span class="user-nationality" style="background: tomato">US</span>',
            }]}
        }
    }

    createPlayoffs(data, wrapper)
    
    expect(
        getComputedStyle(
            wrapper.querySelector('.player-wrapper .nationality .user-nationality')
        ).background
    ).toBe('tomato')
})
