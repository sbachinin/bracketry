/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test('disables left navigation buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 2 })

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_header_button).pointerEvents).toBe('none')

    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.classList.contains('active')).toBe(false)
    expect(getComputedStyle(left_non_header_button).pointerEvents).toBe('none')
})


test('enables right nav buttons on initialization if rounds count is greater than options.visibleRoundsCount', () => {

    const { wrapper } = init(finished_ucl, { visibleRoundsCount: 2 })

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_header_button).pointerEvents).toBe('auto')

    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.classList.contains('active')).toBe(true)
    expect(getComputedStyle(right_non_header_button).pointerEvents).toBe('auto')
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

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.classList.contains('active')).toBe(true)

    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.classList.contains('active')).toBe(true)
})


test('disables right nav button when right edge is reached', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')

    pl.moveToNextRound()

    expect(right_header_button.classList.contains('active')).toBe(true)
    expect(right_non_header_button.classList.contains('active')).toBe(true)

    pl.moveToLastRound()
    expect(right_header_button.classList.contains('active')).toBe(false)
    expect(right_non_header_button.classList.contains('active')).toBe(false)
})


test('injects leftNavigationButtonHTML to left buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { leftNavigationButtonHTML: '<p>PREVIOUS ROUND</p>' })

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
})


test('injects rightNavigationButtonHTML to right buttons on initialization', () => {

    const { wrapper } = init(finished_ucl, { rightNavigationButtonHTML: '<p>NEXT ROUND</p>' })

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
})


test('injects leftNavigationButtonHTML to left buttons on applyNewOptions', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    pl.applyNewOptions({ leftNavigationButtonHTML: '<p>PREVIOUS ROUND</p>' })

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
})


test('injects rightNavigationButtonHTML to right buttons on applyNewOptions', () => {

    const { wrapper, playoffs: pl } = init(finished_ucl)

    pl.applyNewOptions({ rightNavigationButtonHTML: '<p>NEXT ROUND</p>' })

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
})


test('applies certain styles when options.navButtonsPosition is "gutters"', () => {

    const { wrapper } = init(
        finished_ucl,
        { navButtonsPosition: 'gutters' }
    )

    // 1. .buttons-header is hidden
    const headerStyles = getComputedStyle(wrapper.querySelector('.buttons-header'))
    expect(headerStyles.display).toBe('none')

    // 2. non-header buttons are styled to be gutters
    const expected_non_header_buttons_styles = {
        display: 'flex',
        position: 'static',
        transform: 'none',
        'min-height': '100%'
    }

    const left_main_button = wrapper.querySelector('.non-header-button.left')
    const right_main_button = wrapper.querySelector('.non-header-button.right')

    expect(getComputedStyle(left_main_button))
        .toMatchObject(expected_non_header_buttons_styles)
    expect(getComputedStyle(right_main_button))
        .toMatchObject(expected_non_header_buttons_styles)
})


test('applies certain styles when options.navButtonsPosition is "overMatches"', () => {

    const { wrapper } = init(finished_ucl, { navButtonsPosition: 'overMatches' })

    // 1. .buttons-header is hidden
    const headerStyles = getComputedStyle(wrapper.querySelector('.buttons-header'))
    expect(headerStyles.display).toBe('none')

    // 2. non-header buttons are styled to be gutters
    const expected_non_header_buttons_styles = {
        display: 'flex',
        position: 'absolute',
        transform: 'translate(0, -50%)'
    }

    const left_main_button = wrapper.querySelector('.non-header-button.left')
    const right_main_button = wrapper.querySelector('.non-header-button.right')

    expect(getComputedStyle(left_main_button))
        .toMatchObject(expected_non_header_buttons_styles)
    expect(getComputedStyle(right_main_button))
        .toMatchObject(expected_non_header_buttons_styles)
})


test('applies certain styles when options.navButtonsPosition is "overTitles"', () => {

    const roundTitlesHeight = 66

    const { wrapper } = init(
        finished_ucl,
        { navButtonsPosition: 'overTitles', roundTitlesHeight }
    )

    // 1. non-header buttons are hidden
    const visible_non_header_buttons = [...wrapper.querySelectorAll('.non-header-button')]
        .filter(b => getComputedStyle(b).display !== 'none')
    expect(visible_non_header_buttons.length).toBe(0)

    // 2. .buttons-header is styled accordingly
    const headerStyles = getComputedStyle(wrapper.querySelector('.buttons-header'))
    expect(headerStyles).toMatchObject({
        display: 'flex',
        position: 'absolute',
        'z-index': '1',
        left: '0px',
        right: '0px'
    })
})


// these tests proved to meaningless & were moved to cypress
// Because buttons were hidden not because of navButtonsPosition option but
// perhaps because of some bad calculations of rounds' visibility
// TODO check other tests here for false "hidden" buttons
/*
test('applies certain styles when options.navButtonsPosition is "beforeTitles"', () => {

    const { wrapper } = init(finished_ucl, { navButtonsPosition: 'beforeTitles' })

    // 1. non-header buttons are hidden
    const visible_non_header_buttons = [...wrapper.querySelectorAll('.non-header-button')]
        .filter(b => getComputedStyle(b).display !== 'none')
    expect(visible_non_header_buttons.length).toBe(0)

    // 2. .buttons-header is styled accordingly
    const headerStyles = getComputedStyle(wrapper.querySelector('.buttons-header'))
    expect(headerStyles).toMatchObject({
        display: 'flex',
        position: 'static',
        height: 'auto'
    })
})


test('hides navigation buttons when options.navButtonsPosition is "hidden"', () => {
    const { wrapper } = init(finished_ucl, { navButtonsPosition: 'hidden' })

    // 1. non-header buttons are hidden
    const visible_non_header_buttons = [...wrapper.querySelectorAll('.non-header-button')]
        .filter(b => getComputedStyle(b).display !== 'none')
    expect(visible_non_header_buttons.length).toBe(0)

    // 2. .buttons-header is hidden
    const headerStyles = getComputedStyle(wrapper.querySelector('.buttons-header'))
    expect(headerStyles.display).toBe('none')
})
 */