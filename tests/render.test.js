/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


test('renders one empty round', () => {

    const { wrapper } = init({ rounds: [{}] })
    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(1)
})


test('renders match data', () => {

    const { wrapper } = init(
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
        }
    )
    expect(wrapper.querySelector('.player-title').innerHTML).toBe('John Doe')
    expect(wrapper.querySelector('.main-score').innerHTML).toBe('4')
})


test('renders 4 empty rounds with only "rounds" array of 4 empty objects and without options', () => {

    const { wrapper } = init({ rounds: [{}, {}, {}, {}] })
    expect(wrapper.querySelectorAll('.match-wrapper').length).toBe(15)
})

test('renders contentful matches without options', () => {

    const { wrapper } = init(finished_ucl)
    expect(wrapper.querySelectorAll('.side-wrapper[contestant-id="benfica"]').length).toBe(2)
})


test('renders 1 round with 1 match if data contains only "rounds" with 1 empty object', () => {

    const { wrapper } = init({ rounds: [{}] })

    expect(wrapper.querySelectorAll('.round-wrapper').length).toBe(1)
    expect(wrapper.querySelectorAll('.match-wrapper').length).toBe(1)
})


test('does not insert match-body element if there is no data for a match', () => {

    const { wrapper } = init({ rounds: [{}] })

    expect(wrapper.querySelectorAll('.match-wrapper').length).toBe(1)
    expect(wrapper.querySelectorAll('.match-body').length).toBe(0)
})

