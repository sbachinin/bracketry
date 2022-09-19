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

test('renders one empty round', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        { rounds: [{}] },
        wrapper
    )
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(1)
})



test('renders match data', () => {
    const wrapper = create_wrapper()

    createPlayoffs(
        {
            rounds: [{ name: 'Some round' }],
            matches: [
                {
                    roundIndex: 0,
                    order: 0,
                    sides: [
                        { contestantId: 'c1', scores: [{ mainScore: '4' }] },
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
    const wrapper = create_wrapper()
    createPlayoffs({ rounds: [{}, {}, {}, {}] }, wrapper)
    expect(wrapper.querySelectorAll('.match-wrapper').length).toBe(15)
})

test('renders contentful matches without options', () => {
    const wrapper = create_wrapper()
    createPlayoffs(finished_ucl, wrapper)
    expect(wrapper.querySelectorAll('.match-body').length).toBe(15)
})


test('renders 1 round with 1 match if data contains only "rounds" with 1 empty object', () => {
    const wrapper = create_wrapper()

    createPlayoffs({ rounds: [{}] }, wrapper)

    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(1)
    expect(wrapper.querySelectorAll('.match-wrapper').length).toBe(1)
});


test('does not insert match-body element if there is no data for a match', () => {
    const wrapper = create_wrapper()

    createPlayoffs({ rounds: [{}] }, wrapper)

    expect(wrapper.querySelectorAll('.match-wrapper').length).toBe(1)
    expect(wrapper.querySelectorAll('.match-body').length).toBe(0)
});
