/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


test('disables left navigation buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 2 })

    const left_button = wrapper.querySelector('.navigation-button.left')
    expect(left_button.classList.contains('active')).toBe(false)
})


test('enables right nav buttons on initialization if rounds count is greater than options.visibleRoundsCount', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 2 })

    const right_button = wrapper.querySelector('.navigation-button.right')
    expect(right_button.classList.contains('active')).toBe(true)
})


test('hides nav buttons on initialization if rounds count is <= options.visibleRoundsCount', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 4 })
    expect(wrapper.querySelectorAll('.navigation-button.hidden').length).toBe(2)
})


test('hides nav buttons when applyNewOptions is called with visibleRoundsCount which is >= rounds.length', () => {

    const { wrapper, bracket: br } = init(finished_ucl, { visibleRoundsCount: 2 })

    br.applyNewOptions({ visibleRoundsCount: 4 })

    expect(wrapper.querySelectorAll('.navigation-button.hidden').length).toBe(2)
})


test('enables left nav button when base_round_index becomes more than 0', () => {

    const { wrapper, bracket: br } = init(finished_ucl, { visibleRoundsCount: 2 })

    br.setBaseRoundIndex(1)

    expect(
        wrapper.querySelector('.navigation-button.left').classList.contains('active')
    ).toBe(true)
})


test('disables right nav button when right edge is reached', () => {

    const { wrapper, bracket: br } = init(finished_ucl, { visibleRoundsCount: 2 })

    br.moveToNextRound()

    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(true)

    br.moveToLastRound()
    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(false)
})


test('injects leftNavButtonHTML to left buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { leftNavButtonHTML: '<p>PREVIOUS ROUND</p>' })
    expect(
        wrapper.querySelector('.navigation-button.left').innerHTML
    ).toBe('<p>PREVIOUS ROUND</p>')
})


test('injects rightNavButtonHTML to right buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { rightNavButtonHTML: '<p>NEXT ROUND</p>' })
    expect(
        wrapper.querySelector('.navigation-button.right').innerHTML
    ).toBe('<p>NEXT ROUND</p>')
})


test('injects leftNavButtonHTML to left buttons on applyNewOptions', () => {

    const { wrapper, bracket: br } = init(finished_ucl)

    br.applyNewOptions({ leftNavButtonHTML: '<p>PREVIOUS ROUND</p>' })

    expect(
        wrapper.querySelector('.navigation-button.left'
    ).innerHTML).toBe('<p>PREVIOUS ROUND</p>')
})


test('injects rightNavButtonHTML to right button on applyNewOptions', () => {

    const { wrapper, bracket: br } = init(finished_ucl)

    br.applyNewOptions({ rightNavButtonHTML: '<p>NEXT ROUND</p>' })

    expect(
        wrapper.querySelector('.navigation-button.right').innerHTML
    ).toBe('<p>NEXT ROUND</p>')
})
