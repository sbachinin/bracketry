/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default


test('js survives if non-element wrapper is provided', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    createPlayoffs(
        {
            rounds: [{}],
            matches: [{
                id: '32323', round_index: 0, order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }]
            }
            ],
            contestants: {
                contestant1: { players: [{ title: 'Josh' }] }
            }
        },
        null,
        {}
    )
    expect(true).toBe(true);
})


test('js survives if wrapper is not in the DOM', () => {
    expect.assertions(1)

    createPlayoffs(
        { rounds: [{}] },
        document.createElement('div'),
        {}
    )
    expect(true).toBe(true);
})


test('js survives if wrapper is of bad type', () => {
    const wrapper = document.createElement('img')
    document.body.append(wrapper)

    expect.assertions(1)

    createPlayoffs({ rounds: [{}] }, wrapper, {})
    expect(true).toBe(true);
})


// TODO wrapper is mutated

// TODO wrapper already contains something - let's try to preserve it

// TODO wrapper is deleted - what's with returned functionS?

// TODO wrapper's styles are changed - concern?