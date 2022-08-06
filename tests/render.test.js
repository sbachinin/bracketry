/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');
 
test('renders one empty round with a given name', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{id: 'round1', name: 'Some round' }],
            matches: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(document.querySelectorAll('.round-wrapper').length).toBe(1);
    expect(document.querySelector('.round-title').innerHTML).toBe('Some round')
});