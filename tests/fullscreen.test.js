/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../dist/cjs/index.js')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test(`with options.fullscreen === true .playoffs-root is wrapped in .playoffs-fullscreen-wrapper`, () => {

    createPlayoffs(finished_ucl, document.body, { fullscreen: true })
    expect(
        document.body.querySelector(`:scope > .playoffs-fullscreen-wrapper > .playoffs-root`)
    ).not.toBe(null)
})


test(`when rendered to anything other than document.body, fullscreen playoffs are rendered as expected`, () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })
    expect(
        wrapper.querySelector(`:scope > .playoffs-fullscreen-wrapper > .playoffs-root`)
    ).not.toBe(null)
})


test(`with non-boolean (but truthy) options.fullscreen root_element is rendered static`, () => {

    createPlayoffs(finished_ucl, document.body, { fullscreen: 'i am an idiot' })
    const pl_root_styles = getComputedStyle(document.body.querySelector(`:scope > .playoffs-root`))
    expect(pl_root_styles.position).not.toBe('fixed')
})


test(`without {fullscreen: true} .exit-fullscreen-button isn't rendered`, () => {

    const { wrapper } = init(finished_ucl)
    expect(wrapper.querySelector(`.exit-fullscreen-button`)).toBe(null)
})


test(`click anywhere outside fullscreen-wrapper uninstalls playoffs`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.playoffs-fullscreen-wrapper`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // playoffs are removed after 150 ms animation

    expect(wrapper.querySelector(`.playoffs-root`)).toBe(null)
})


test(`click on exit-fullscreen-button uninstalls playoffs`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.exit-fullscreen-button`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // playoffs are removed after 150 ms animation

    expect(wrapper.querySelector(`.playoffs-root`)).toBe(null)
})


test(`clicks within playoffs-root don't uninstall fullscreen playoffs`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.round-wrapper`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // playoffs are removed after 150 ms animation

    expect(wrapper.querySelector(`.playoffs-root`)).not.toBe(null)
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

    const { wrapper, playoffs: pl } = init(finished_ucl, { fullscreen: true, visibleRoundsCount: 2 })

    wrapper.querySelector('.navigation-button.non-header-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 200)) // make sure it did not uninstall on click

    expect(pl.getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})


// TODO ?? {verticalScrollMode: "buttons"} is forced on fullscreen