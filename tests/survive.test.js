/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');


test('survives if no rounds array is provided', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            matches: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives if rounds array contains 0 elements', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when non-object stuff is provided in rounds array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [3],
            matches: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when empty round object is provided', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{}],
            matches: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when non-string id is provided for a round', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{id: true}],
            matches: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when non-string name is provided for a round', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{id: 'round1', name: false }],
            matches: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});



test('survives when data.matches is undefined', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when data.matches are not an array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: true,
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when string is given for a match', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: ['fdsdfsd'],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when match is an empty object', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{}],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when match.match_id is not a string', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: true }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when match.round_id is not a string', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: true }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when match.order is not a number', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: [] }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});




// SIDES

test('survives when match.sides is not an array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: true }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when match.sides contains 0 elements', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: [] }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when match.sides contains non-object elements', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: ['fsdfsdf'] }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when match.sides[0] is an empty object', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: [{}] }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when match.sides[0].contestant_id is not a string', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: [{ contestant_id: [] }] }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when there is no contestant for match.sides[0].contestant_id', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: [{ contestant_id: 'contestant1' }] }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when contestant is not an object', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: [{ contestant_id: 'contestant1' }] }],
            contestants: {
                contestant1: 333
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when contestant is an empty object', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0, sides: [{ contestant_id: 'contestant1' }] }],
            contestants: {
                contestant1: {}
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when side.score is not an array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0,
                sides: [{ contestant_id: 'contestant1', score: false }] }
            ],
            contestants: {
                contestant1: {}
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when side.score is an empty array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: {}
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when contestant.players is not an array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: 3232}
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when contestant.players is an empty array', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [],
            matches: [{ match_id: '32323', round_id: '11111', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [] }
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});



