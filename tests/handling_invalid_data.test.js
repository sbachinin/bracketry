/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')

test('renders what possible when non-string name is provided for a round', () => {
    expect.assertions(1)
    const { wrapper } = init({ rounds: [{ name: false }], matches: [] }
    )
    expect(wrapper.querySelector('.round-wrapper')).not.toBe(null)
})



test('renders what possible when data.matches is undefined', () => {
    expect.assertions(2)
    const { wrapper } = init({ rounds: [{}] })
    expect(wrapper.querySelector('.round-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
})



test('renders match-wrapper without body when match is an empty object', () => {
    expect.assertions(2)
    const { wrapper } = init({ rounds: [{}], matches: [{}] })
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})


// TODO is it a critical error? should empty shell be rendered?
/* 
test('survives when match.id is not a string', () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)

    expect.assertions(1)

    createPlayoffs(
        {
            rounds: [],
            matches: [{ id: true }],
            contestants: {}
        },
        wrapper,
        {}
    )
    expect(true).toBe(true)
})
 */



test('renders match-wrapper without body when match.roundIndex is missing', () => {
    expect.assertions(2)
    const data = { rounds: [{}], matches: [{ id: 'm1', order: 0 }] }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})


test('renders match-wrapper without body when match.roundIndex is not a number', () => {
    expect.assertions(2)
    const data = { rounds: [{}], matches: [{ id: 'm1', roundIndex: true, order: 0 }] }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})

test('renders match-wrapper without body when match.roundIndex is NaN', () => {
    expect.assertions(2)
    const data = { rounds: [{}], matches: [{ id: 'm1', roundIndex: NaN, order: 0 }] }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})

test('renders match-wrapper without body when match.order is missing', () => {
    expect.assertions(2)
    const data = { rounds: [{}], matches: [{ id: 'm1', roundIndex: 0 }] }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})

test('renders match-wrapper without body when match.order is not a number', () => {
    expect.assertions(2)
    const data = { rounds: [{}], matches: [{ id: 'm1', roundIndex: 0, order: true }] }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})

test('renders match-wrapper without body when match.order is NaN', () => {
    expect.assertions(2)
    const data = { rounds: [{}], matches: [{ id: 'm1', roundIndex: 0, order: NaN }] }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-wrapper')).not.toBe(null)
    expect(wrapper.querySelector('.match-body')).toBe(null)
})



test('renders score and no title when player has no title', () => {
    expect.assertions(2)
    const data = {
        rounds: [{}],
        matches: [{
            id: '32323', roundIndex: 0, order: 0,
            sides: [{ contestantId: 'contestant1', score: [ { mainScore: '6' } ] }]
        }],
        contestants: { contestant1: { players: [{}] } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.main-score').textContent).toBe('6')
    expect(wrapper.querySelector('.player-title').textContent).toBe('')
})


test('renders score and no title when player has non-string title', () => {
    expect.assertions(2)
    const data = {
        rounds: [{}],
        matches: [{
            id: '32323', roundIndex: 0, order: 0,
            sides: [{ contestantId: 'contestant1', score: [ { mainScore: '6' } ] }]
        }],
        contestants: { contestant1: { players: [{ title: {} }] } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.main-score').textContent).toBe('6')
    expect(wrapper.querySelector('.player-title').textContent).toBe('')
})

test('renders player title when player has non-string nationality', () => {
    expect.assertions(2)
    const data = {
        rounds: [{}],
        matches: [{
            id: '32323', roundIndex: 0, order: 0,
            sides: [{ contestantId: 'contestant1', score: [ { mainScore: '6' } ] }]
        }],
        contestants: { contestant1: { players: [{ title: 'John', nationality: true }] } }
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.player-title').textContent).toBe('John')
    expect(wrapper.querySelector('.nationality').textContent).toBe('')
})
