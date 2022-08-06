/**
 * @jest-environment jsdom
 */

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
