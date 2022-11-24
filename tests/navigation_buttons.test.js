/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test('disables left navigation buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 2 })

    const left_button = wrapper.querySelector('.navigation-button.left')
    expect(left_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_button).pointerEvents).toBe('none')
})


test('enables right nav buttons on initialization if rounds count is greater than options.visibleRoundsCount', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 2 })

    const right_button = wrapper.querySelector('.navigation-button.right')
    expect(right_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_button).pointerEvents).toBe('auto')
})


test('hides nav buttons on initialization if rounds count is <= options.visibleRoundsCount', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 4 })
    expect(wrapper.querySelectorAll('.navigation-button.hidden').length).toBe(4)
})


test('hides nav buttons when applyNewOptions is called with visibleRoundsCount which is >= rounds.length', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.applyNewOptions({ visibleRoundsCount: 4 })

    expect(wrapper.querySelectorAll('.navigation-button.hidden').length).toBe(4)
})


test('enables left nav button when base_round_index becomes more than 0', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.setBaseRoundIndex(1)

    expect(
        wrapper.querySelector('.navigation-button.left').classList.contains('active')
    ).toBe(true)
})


test('disables right nav button when right edge is reached', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    pl.moveToNextRound()

    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(true)

    pl.moveToLastRound()
    expect(
        wrapper.querySelector('.navigation-button.right').classList.contains('active')
    ).toBe(false)
})


test('injects leftNavigationButtonHTML to left buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { leftNavigationButtonHTML: '<p>PREVIOUS ROUND</p>' })
    expect(
        wrapper.querySelector('.navigation-button.left .button-icon-wrapper').innerHTML
    ).toBe('<p>PREVIOUS ROUND</p>')
})


test('injects rightNavigationButtonHTML to right buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { rightNavigationButtonHTML: '<p>NEXT ROUND</p>' })
    expect(
        wrapper.querySelector('.navigation-button.right').innerHTML
    ).toBe('<p>NEXT ROUND</p>')
})


test('injects leftNavigationButtonHTML to left buttons on applyNewOptions', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    pl.applyNewOptions({ leftNavigationButtonHTML: '<p>PREVIOUS ROUND</p>' })

    expect(
        wrapper.querySelector('.navigation-button.left .button-icon-wrapper'
        ).innerHTML).toBe('<p>PREVIOUS ROUND</p>')
})


test('injects rightNavigationButtonHTML to right button on applyNewOptions', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    pl.applyNewOptions({ rightNavigationButtonHTML: '<p>NEXT ROUND</p>' })

    expect(
        wrapper.querySelector('.navigation-button.right').innerHTML
    ).toBe('<p>NEXT ROUND</p>')
})


test('applies certain styles when options.navButtonsPosition is "gutters"', () => {

    const { wrapper } = init(
        finished_ucl,
        { navButtonsPosition: 'gutters' }
    )

    const expected_non_header_buttons_styles = {
        display: 'flex',
        position: 'static',
        transform: 'none',
        'min-height': '100%'
    }

    const left_button = wrapper.querySelector('.navigation-button.left')
    const right_button = wrapper.querySelector('.navigation-button.right')

    expect(getComputedStyle(left_button))
        .toMatchObject(expected_non_header_buttons_styles)
    expect(getComputedStyle(right_button))
        .toMatchObject(expected_non_header_buttons_styles)
})
