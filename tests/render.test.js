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
    expect(wrapper.querySelectorAll('.match-wrapper[match-id]').length).toBe(15)
    expect(wrapper.querySelector('.match-wrapper[match-id="0"]').textContent).toMatch('Benfica')
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


test('adds "mobile" class to root element if data.rounds has only 1 item (even if options.visibleRoundsCount is > 1)', () => {
    const wrapper = create_wrapper()
    createPlayoffs({ rounds: [{}] }, wrapper, { visibleRoundsCount: 4 })
    expect(wrapper.querySelector('.root-brackets-element.mobile')).not.toBe(null)
    expect(
        getComputedStyle(
            wrapper.querySelector('.round-fake-padding')
        ).display
    ).toBe('none')
})

test('adds "mobile" class to root element if visibleRoundsCount is 1 (even if data.rounds is longer then 1)', () => {
    const wrapper = create_wrapper()
    createPlayoffs({ rounds: [{}, {}] }, wrapper, { visibleRoundsCount: 1 })
    expect(wrapper.querySelector('.root-brackets-element.mobile')).not.toBe(null)
    expect(
        getComputedStyle(
            wrapper.querySelector('.round-fake-padding')
        ).display
    ).toBe('none')
})
