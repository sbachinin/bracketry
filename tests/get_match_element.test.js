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


test('can draw asymmetrical scores where two sides have different number of elements in score array', () => {
    const wrapper = init()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1',
                round_index: 0,
                order: 0,
                sides: [
                    { contestant_id: 'c1', score: [{ main_score: 'Rt' }] },
                    { contestant_id: 'c2', score: [] }
                ]
            }],
            contestants: {
                c1: { players: [{ title: 'John' }] },
                c2: { players: [{ title: 'Pete' }] }
            }
        },
        wrapper
    )
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .main-score').textContent).toBe('Rt')
    // .score element is not rendered for a side with empty "score" array
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .score')).toBe(null)
})


test('can draw asymmetrical scores where ONLY ONE SIDE has a score array', () => {
    const wrapper = init()

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: 'm1',
                round_index: 0,
                order: 0,
                sides: [
                    { contestant_id: 'c1', score: [{ main_score: 'Rt' }] },
                    { contestant_id: 'c2' }
                ]
            }],
            contestants: {
                c1: { players: [{ title: 'John' }] },
                c2: { players: [{ title: 'Pete' }] }
            }
        },
        wrapper
    )
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c1"] .main-score').textContent).toBe('Rt')
    // .score element is not rendered for a side with empty "score" array
    expect(wrapper.querySelector('.side-wrapper[contestant-id="c2"] .score')).toBe(null)
})





// draws a winner mark for a side which has { is_winner: true }
// does not draw a winner mark when neither side has { is_winner: true }



// does not render nationalies if not provided
// does not render entry statuses if not provided