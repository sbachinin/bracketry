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


test('renders a given round name (even if no matches)', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        { rounds: [{ name: 'Some round' }], matches: [] },
        wrapper
    )

    expect(wrapper.querySelector('.round-name').innerHTML).toBe('Some round')
})


test('renders a default round name if none is given by user', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [],
            contestants: {}
        },
        wrapper
    )
    expect(wrapper.querySelector('.round-name').innerHTML).toBe('Final')
})

// TODO renders as much round titles as data.rounds.length

// TODO rerenders round titles on replaceData

// TODO round titles obey navigation (get shown or hidden according to baseRoundIndex)
