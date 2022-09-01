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



test(`renders nationality code only for sides which have nationality (when no options.getNationalityHTML)`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Josh' }] },
            c2: { players: [{ title: 'Pete', nationality: 'US' }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_elements = wrapper.querySelectorAll('.player-wrapper .nationality')
    expect((nat_elements[0]).textContent).toBe('')
    expect((nat_elements[1]).textContent).toBe('US')
})


test(`does not render nationality if it's not a string (when no options.getNationalityHTML)`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: {} }] }
        }
    }

    createPlayoffs(data, wrapper)
    const nat_element = wrapper.querySelector('.player-wrapper .nationality')
    expect((nat_element).innerHTML).toBe('')
})


test(`renders html provided as "nationality"`, () => {
    const wrapper = create_wrapper()
    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }] }],
        contestants: {
            c1: { players: [{
                title: 'Pete',
                nationality: '<span class="user-nationality" style="background: tomato">US</span>',
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






test(`calls getNationalityHTML for each player which has nationality`, () => {
    const wrapper = create_wrapper()

    getNationalityHTML = jest.fn()

    const data = {
        rounds: [{}],
        matches: [{ id: 'm1', round_index: 0, order: 0, sides: [{ contestant_id: 'c1' }, { contestant_id: 'c2' }] }],
        contestants: {
            c1: { players: [{ title: 'Pete', nationality: 'US' }] },
            c2: { players: [
                { title: 'Pavel' },
                { title: 'Mario', nationality: 'IT' }
            ]}
        }
    }

    createPlayoffs(data, wrapper, { getNationalityHTML })

    expect(getNationalityHTML).toBeCalledTimes(2)
    expect(getNationalityHTML.mock.calls[0][0]).toMatch(`US`)
    expect(getNationalityHTML.mock.calls[1][0]).toMatch(`IT`)

})

