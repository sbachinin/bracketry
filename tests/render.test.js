/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default
 
const init = () => {
    document.body.innerHTML = ''
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}

test('renders one empty round with a given name', () => {
    const wrapper = init()

    createPlayoffs(
        {
            rounds: [{ name: 'Some round' }],
            matches: [],
            contestants: {}
        },
        wrapper
    )
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(1);
    expect(wrapper.querySelector('.round-name').innerHTML).toBe('Some round')
});


test('renders a default round name if none is given by user', () => {
    const wrapper = init()

    createPlayoffs(
        {
            rounds: [ {} ],
            matches: [],
            contestants: {}
        },
        wrapper
    )
    expect(wrapper.querySelector('.round-name').innerHTML).toBe('Final')
});


test('renders match data', () => {
    const wrapper = init()

    createPlayoffs(
        {
            rounds: [ { name: 'Some round'} ],
            matches: [
                {
                    id: '32323',
                    round_index: 0,
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
        wrapper
    )
    expect(wrapper.querySelector('.player-title').innerHTML).toBe('John Doe');
    expect(wrapper.querySelector('.main-score').innerHTML).toBe('4');

});


test('renders 4 empty rounds with only "rounds" array of 4 empty objects and without options', () => {
    const wrapper = init()
    
    createPlayoffs(
        { rounds: [{}, {}, {}, {} ] },
        wrapper
    )
    
    expect(wrapper.querySelectorAll('.match-wrapper').length).toBe(15)
})

test('renders contentful matches without options', () => {
    const wrapper = init()
    
    createPlayoffs(
        finished_ucl,
        wrapper
    )
    
    expect(wrapper.querySelectorAll('.match-wrapper[match-id]').length).toBe(15)
    expect(wrapper.querySelector('.match-wrapper[match-id="0"]').textContent).toMatch('Benfica')
})
