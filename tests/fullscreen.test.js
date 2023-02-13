/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createBracket } = require('../dist/cjs/index.js')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default


test(`with options.fullscreen === true .bracket-root is wrapped in .bracket-fullscreen-wrapper`, () => {

    createBracket(finished_ucl, document.body, { fullscreen: true })
    expect(
        document.body.querySelector(`:scope > .bracket-fullscreen-wrapper > .bracket-root`)
    ).not.toBe(null)
})


test(`when rendered to anything other than document.body, fullscreen bracket is rendered as expected`, () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })
    expect(
        wrapper.querySelector(`:scope > .bracket-fullscreen-wrapper > .bracket-root`)
    ).not.toBe(null)
})


test(`with non-boolean (but truthy) options.fullscreen root_element is rendered static`, () => {

    createBracket(finished_ucl, document.body, { fullscreen: 'i am an idiot' })
    const pl_root_styles = getComputedStyle(document.body.querySelector(`:scope > .bracket-root`))
    expect(pl_root_styles.position).not.toBe('fixed')
})


test(`without {fullscreen: true} .exit-fullscreen-button isn't rendered`, () => {

    const { wrapper } = init(finished_ucl)
    expect(wrapper.querySelector(`.exit-fullscreen-button`)).toBe(null)
})


test(`click anywhere outside fullscreen-wrapper uninstalls bracket`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.bracket-fullscreen-wrapper`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // bracket is removed after 150 ms animation

    expect(wrapper.querySelector(`.bracket-root`)).toBe(null)
})


test(`click on exit-fullscreen-button uninstalls bracket`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.exit-fullscreen-button`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // bracket is removed after 150 ms animation

    expect(wrapper.querySelector(`.bracket-root`)).toBe(null)
})


test(`clicks within bracket-root don't uninstall fullscreen bracket`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.round-wrapper`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // bracket is removed after 150 ms animation

    expect(wrapper.querySelector(`.bracket-root`)).not.toBe(null)
})


test(`highlights team history on fullscreen`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`

    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // make sure it did not uninstall on click

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(2)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test(`clicks on navigation buttons work in fullscreen mode`, async () => {

    const { wrapper, bracket: br } = init(finished_ucl, { fullscreen: true, visibleRoundsCount: 2 })

    wrapper.querySelector('.navigation-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // make sure it did not uninstall on click

    expect(br.getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})
