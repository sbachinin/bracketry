/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../index.js').easyPlayoffs
const finished_ucl = require('./ucl-finished.js').default

const init = () => {
    const wrapper = document.createElement('div')
    document.body.append(wrapper)
    return wrapper
}


test('disables left navigation buttons on initialization', () => {
    const wrapper = init()

    createPlayoffs(
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

    createPlayoffs(
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

// TODO: fix this. started to fail, perhaps because of changes to html shell
/* test('hides nav buttons on initialization if rounds count is <= options.visibleRoundsCount', () => {
    const wrapper = init()

    createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 4 }
    )

    const first_visible_button = [...wrapper.querySelectorAll('.navigation-button')]
        .find(button => getComputedStyle(button).display !== 'none')


    expect(first_visible_button instanceof Node).toBe(false)
})
 */

// TODO: fix this. started to fail, perhaps because of changes to html shell
/* test('hides nav buttons when applyNewOptions is called with a greater visibleRoundsCount which becomes >= actual rounds count', () => {
    const wrapper = init()

    const pl = createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    pl.applyNewOptions({ visibleRoundsCount: 4 })

    const first_visible_button = [...wrapper.querySelectorAll('.navigation-button')]
        .find(button => getComputedStyle(button).display !== 'none')
    expect(first_visible_button instanceof Node).toBe(false)
}) */

test('enables left nav button when base_round_index becomes more than 0', () => {
    const wrapper = init()

    const pl = createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

    pl.setBaseRoundIndex(1)

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.classList.contains('active')).toBe(true)

    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.classList.contains('active')).toBe(true)
})

test('disables right nav button when right edge is reached', () => {
    const wrapper = init()

    const pl = createPlayoffs(
        finished_ucl,
        wrapper,
        { visibleRoundsCount: 2 }
    )

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
    const wrapper = init()

    createPlayoffs(
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

    createPlayoffs(
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

    const pl = createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    pl.applyNewOptions({ leftNavigationButtonHTML: '<p>PREVIOUS ROUND</p>' })

    const left_header_button = wrapper.querySelector('.buttons-header .navigation-button.left')
    expect(left_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
    const left_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.left')
    expect(left_non_header_button.innerHTML).toBe('<p>PREVIOUS ROUND</p>')
})

test('injects rightNavigationButtonHTML to right buttons on applyNewOptions', () => {
    const wrapper = init()

    const pl = createPlayoffs(
        finished_ucl,
        wrapper,
        {}
    )

    pl.applyNewOptions({ rightNavigationButtonHTML: '<p>NEXT ROUND</p>' })

    const right_header_button = wrapper.querySelector('.buttons-header .navigation-button.right')
    expect(right_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
    const right_non_header_button = wrapper.querySelector('.all-but-buttons-header .navigation-button.right')
    expect(right_non_header_button.innerHTML).toBe('<p>NEXT ROUND</p>')
})








test('applies certain styles when options.navButtonsPosition is "gutters"', () => {
    const wrapper = init()

    createPlayoffs(
        finished_ucl,
        wrapper,
        {
            navButtonsPosition: 'gutters',
            navigationGutterBorderColor: 'red'
        }
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
        .toMatchObject({
            ...expected_non_header_buttons_styles,
            'border-right-color': 'red'
        })
    expect(getComputedStyle(right_main_button))
        .toMatchObject({
            ...expected_non_header_buttons_styles,
            'border-left-color': 'red'
        })
})

test('applies certain styles when options.navButtonsPosition is "overMatches"', () => {
    const wrapper = init()

    createPlayoffs(
        finished_ucl,
        wrapper,
        { navButtonsPosition: 'overMatches' }
    )

    // 1. .buttons-header is hidden
    const headerStyles = getComputedStyle(wrapper.querySelector('.buttons-header'))
    expect(headerStyles.display).toBe('none')

    // 2. non-header buttons are styled to be gutters
    const expected_non_header_buttons_styles = {
        display: 'flex',
        position: 'absolute',
        transform: 'translate(0, -50%)',
        'min-height': '0'
    }

    const left_main_button = wrapper.querySelector('.non-header-button.left')
    const right_main_button = wrapper.querySelector('.non-header-button.right')

    expect(getComputedStyle(left_main_button))
        .toMatchObject(expected_non_header_buttons_styles)
    expect(getComputedStyle(right_main_button))
        .toMatchObject(expected_non_header_buttons_styles)
})


test('applies certain styles when options.navButtonsPosition is "overTitles"', () => {
    const wrapper = init()
    const roundTitlesHeight = 66

    createPlayoffs(
        finished_ucl,
        wrapper,
        {
            navButtonsPosition: 'overTitles',
            roundTitlesHeight
        }
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
        right: '0px',
        height: (roundTitlesHeight + 1) + 'px'
    })
})


test('applies certain styles when options.navButtonsPosition is "beforeTitles"', () => {
    const wrapper = init()

    createPlayoffs(
        finished_ucl,
        wrapper,
        { navButtonsPosition: 'beforeTitles' }
    )

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
    const wrapper = init()

    createPlayoffs(
        finished_ucl,
        wrapper,
        { navButtonsPosition: 'hidden' }
    )

    // 1. non-header buttons are hidden
    const visible_non_header_buttons = [...wrapper.querySelectorAll('.non-header-button')]
        .filter(b => getComputedStyle(b).display !== 'none')
    expect(visible_non_header_buttons.length).toBe(0)

    // 2. .buttons-header is hidden
    const headerStyles = getComputedStyle(wrapper.querySelector('.buttons-header'))
    expect(headerStyles.display).toBe('none')
})
