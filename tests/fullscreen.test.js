/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../dist/cjs/index.js')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test(`with options.fullscreen === true root_element is rendered fixed to full viewport`, () => {

    createPlayoffs(finished_ucl, document.body, { fullscreen: true })
    const pl_root_styles = getComputedStyle(document.body.querySelector(`:scope > .playoffs-root`))
    expect(pl_root_styles).toMatchObject({
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px'
    })
})


test(`when rendered to anything other than document.body, fullscreen playoffs are rendered as expected`, () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })
    const pl_root_styles = getComputedStyle(wrapper.querySelector(`:scope > .playoffs-root`))
    expect(pl_root_styles).toMatchObject({
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        bottom: '0px'
    })
})


test(`with non-boolean (but truthy) options.fullscreen root_element is rendered static`, () => {

    createPlayoffs(finished_ucl, document.body, { fullscreen: 'i am an idiot' })
    const pl_root_styles = getComputedStyle(document.body.querySelector(`:scope > .playoffs-root`))
    expect(pl_root_styles.position).not.toBe('fixed')
})


test(`exit-fullscreen-button is rendered invisible by default`, () => {

    const { wrapper } = init(finished_ucl)
    const button_styles = getComputedStyle(wrapper.querySelector(`.exit-fullscreen-button`))
    expect(button_styles.display).toBe('none')
})


test(`with options.fullscreen === true exit-fullscreen-button is rendered visible`, () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })
    const button_styles = getComputedStyle(wrapper.querySelector(`.exit-fullscreen-button`))
    expect(button_styles.display).toBe('flex')
})


test(`click anywhere outside fullscreen-wrapper uninstalls playoffs`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.playoffs-root`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 500)) // playoffs are removed after 300 ms animation

    expect(wrapper.querySelector(`.playoffs-root`)).toBe(null)
})


test(`click on exit-fullscreen-button uninstalls playoffs`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.exit-fullscreen-button`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 500)) // playoffs are removed after 300 ms animation

    expect(wrapper.querySelector(`.playoffs-root`)).toBe(null)
})


test(`clicks within playoffs-root don't uninstall fullscreen playoffs`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    wrapper.querySelector(`.round-wrapper`)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 500)) // playoffs are removed after 300 ms animation

    expect(wrapper.querySelector(`.playoffs-root`)).not.toBe(null)
})


test(`highlights team history on fullscreen`, async () => {

    const { wrapper } = init(finished_ucl, { fullscreen: true })

    const benfica_selector = `.side-wrapper[contestant-id='benfica']`

    wrapper.querySelector(benfica_selector)
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 500)) // make sure it did not uninstall on click

    expect(wrapper.querySelectorAll('.match-wrapper.highlighted').length).toBe(2)
    expect(wrapper.querySelectorAll(benfica_selector + '.highlighted').length).toBe(2)
})


test(`clicks on navigation buttons work in fullscreen mode`, async () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { fullscreen: true, visibleRoundsCount: 2 })

    wrapper.querySelector('.navigation-button.non-header-button.right')
        .dispatchEvent(new MouseEvent('click', { bubbles: true }))

    await new Promise(r => setTimeout(r, 500)) // make sure it did not uninstall on click

    expect(pl.getNavigationState().baseRoundIndex).toBe(1)

    const all_rounds = [...wrapper.querySelectorAll('.round-wrapper')]
    expect(getComputedStyle(all_rounds[0]).visibility).toBe('hidden')
    expect(getComputedStyle(all_rounds[2]).visibility).toBe('visible')
})