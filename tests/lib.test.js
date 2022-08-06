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