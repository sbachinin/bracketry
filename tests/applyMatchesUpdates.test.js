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

test('modifies score in existing match', () => {
    const wrapper = init()

    const { applyMatchesUpdates } = easyPlayoffs.createPlayoffs(
        {
            rounds: [ { name: 'Some round' } ],
            matches: [
                {
                    id: '32323',
                    round_index: 0,
                    order: 0,
                    sides: [
                        { contestant_id: 'c1', score: [{ main_score: '4' }] },
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


    applyMatchesUpdates([
        {
            id: '32323',
            round_index: 0,
            order: 0,
            sides: [
                { contestant_id: 'c1', score: [{ main_score: '6' }] },
            ]
        }
    ])

    expect(document.querySelector('.main-score').innerHTML).toBe('6');

});









test('does not spoil a score in existing match if update is invalid', () => {
    const wrapper = init()

    const { applyMatchesUpdates } = easyPlayoffs.createPlayoffs(
        {
            rounds: [ { name: 'Some round' } ],
            matches: [
                {
                    id: '32323',
                    round_index: 0,
                    order: 0,
                    sides: [
                        { contestant_id: 'c1', score: [{ main_score: '4' }] },
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


    applyMatchesUpdates([
        {
            id: '32323',
            round_index: 0,
            order: 0,
            sides: [
                { contestant_id: 'c1', score: [{ main_score: false }] },
            ]
        }
    ])

    expect(document.querySelector('.main-score').innerHTML).toBe('4');

});















test('creates new match', () => {
    const wrapper = init()

    const { applyMatchesUpdates } = easyPlayoffs.createPlayoffs(
        {
            rounds: [ { name: 'Some round' } ],
            matches: [],
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

    expect(document.querySelector('.main-score')).toBe(null);

    applyMatchesUpdates([
        {
            id: '32323',
            round_index: 0,
            order: 0,
            sides: [
                { contestant_id: 'c1', score: [{ main_score: '6' }] },
            ]
        }
    ])

    expect(document.querySelector('.main-score').innerHTML).toBe('6');

});
