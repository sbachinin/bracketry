/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');
 
const init = () => {
    document.body.innerHTML = ''
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}

test('renders one empty round with a given name', () => {
    const wrapper = init()

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

test('renders match data', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        {
            rounds: [
                {id: 'round1', name: 'Some round'},
            ],
            matches: [
                {
                    match_id: '32323',
                    round_id: 'round1',
                    order: 0,
                    sides: [
                        { contestant_id: 'c1', score: [{ main_score: '4'}] },
                    ]
                }
            ],
            contestants: {
                c1: {
                    players: [
                        {
                            title: 'John Doe'
                        }
                    ]
                },
            }
        },
        wrapper,
        {}
    )
    expect(document.querySelector('.player-title').innerHTML).toBe('John Doe');
    expect(document.querySelector('.main-score').innerHTML).toBe('4');

});