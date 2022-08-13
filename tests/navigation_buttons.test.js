/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { easyPlayoffs } = require('../index.js');
const finished_ucl = require('./ucl-finished.js').default

const init = () => {
    document.body.innerHTML = ''
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test('disables left navigation buttons on initialization', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_header_button).pointerEvents).toBe('none')

    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_non_header_button).pointerEvents).toBe('none')
})


test('enables right nav buttons on initialization if rounds count is greater than options.visibleRoundsCount', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_header_button).pointerEvents).toBe('auto')

    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_non_header_button).pointerEvents).toBe('auto')
})

test('hides nav buttons on initialization if rounds count is <= options.visibleRoundsCount', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 4 }
    )

    const first_visible_button = [...document.querySelectorAll('.navigation-button')]
        .find(button => getComputedStyle(button).display !== 'none')


    expect(first_visible_button instanceof Node).toBe(false)
})



test('hides nav buttons when applyNewOptions is called with a greater visibleRoundsCount which becomes >= actual rounds count', () => {
    const wrapper = init()

    const { applyNewOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    applyNewOptions({ visibleRoundsCount: 4 })

    const first_visible_button = [...document.querySelectorAll('.navigation-button')]
        .find(button => getComputedStyle(button).display !== 'none')
    expect(first_visible_button instanceof Node).toBe(false)
})

test('enables left nav button when base_round_index becomes more than 0', () => {
    const wrapper = init()

    const { setBaseRoundIndex } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    setBaseRoundIndex(1)

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.classList.contains('active')).toBe(true)

    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.classList.contains('active')).toBe(true)
})

test('disables right nav button when right edge is reached', () => {
    const wrapper = init()

    const { moveToNextRound } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    
    moveToNextRound()

    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(right_non_header_button.classList.contains('active')).toBe(true)

    moveToNextRound()
    expect(right_header_button.classList.contains('active')).toBe(false)
    expect(right_non_header_button.classList.contains('active')).toBe(false)
})

test('injects leftNavigationButtonHTML to left buttons on initialization', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { leftNavigationButtonHTML: '<p>PREVIOUS ROUND</p>' }
    )

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
})

test('injects rightNavigationButtonHTML to right buttons on initialization', () => {
    const wrapper = init()

    easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        { rightNavigationButtonHTML: '<p>NEXT ROUND</p>' }
    )

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
})

test('injects leftNavigationButtonHTML to left buttons on applyNewOptions', () => {
    const wrapper = init()

    const { applyNewOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    applyNewOptions({ leftNavigationButtonHTML: '<p>PREVIOUS ROUND</p>' })

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
})

test('injects rightNavigationButtonHTML to right buttons on applyNewOptions', () => {
    const wrapper = init()

    const { applyNewOptions } = easyPlayoffs.createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    applyNewOptions({ rightNavigationButtonHTML: '<p>NEXT ROUND</p>' })

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
})



// adjusts buttons positions and visibility according to options.navButtonsPosition
    // overMatches
    // gutters
    // beforeTitles
    // overTitles
    // hidden