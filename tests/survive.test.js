/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');

test('survives no data', () => {
    expect.assertions(1)
    easyPlayoffs.createPlayoffs()
    expect(true).toBe(true);
});


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

test('survives no contestants', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            matches: [],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: [] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: true }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: [] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: ['fsdfsdf'] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: [{}] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: [{ contestant_id: [] }] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: [{ contestant_id: 'contestant1' }] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: [{ contestant_id: 'contestant1' }] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0, sides: [{ contestant_id: 'contestant1' }] }],
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: 312312 }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'john' } ] }
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'john' } ] }
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
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
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
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



test('survives when contestant.players contains non-objects', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ '3232' ] }
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when player has no title', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ {} ] }
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when player has non-string title', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: false } ] }
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});


test('survives when player has non-string nationality_code', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: false } ] }
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});

test('survives when player has non-string flag_url', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
});















test('survives if non-element wrapper is provided', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
            }
        },
        null,
        {}
    )
    expect(true).toBe(true);
})


test('survives if wrapper is not in the DOM', () => {
    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
            }
        },
        document.createElement('div'),
        {}
    )
    expect(true).toBe(true);
})


test('survives if wrapper is of bad type', () => {
    const wrapper = document.createElement('img')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
            }
        },
        wrapper,
        {}
    )
    expect(true).toBe(true);
})


test('survives non-object options', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
            }
        },
        wrapper,
        null
    )
    expect(true).toBe(true);
})

test('survives non-existent options', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    easyPlayoffs.createPlayoffs(
        {
            rounds: [{ id: 'r1' }],
            matches: [{ match_id: '32323', round_id: 'r1', order: 0,
                sides: [{ contestant_id: 'contestant1', score: [] }] }
            ],
            contestants: {
                contestant1: { players: [ { title: 'fdf', nationality_code: 'fdsf', flag_url: false } ] }
            }
        },
        wrapper,
        { fsdfsd: false}
    )
    expect(true).toBe(true);
})
