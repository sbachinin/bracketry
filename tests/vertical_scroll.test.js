/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default

// testing native scroll in action here appears impossible because there is no real wheel/mousewheel

// testing synthetic (buttons or mixed) scroll in action here appears impossible
// because measurements tell that all heights are 0 and thus maximum "scrollTop" is 0

test(`Scroll is "native" by default`, () => {

    const { wrapper } = init(finished_ucl)
    expect(wrapper.querySelector('.playoffs-root.with-native-scroll')).not.toBe(null)
    expect(getComputedStyle(wrapper.querySelector('.matches-scroller')).overflowY).toBe('scroll')
})


test('if verticalScrollMode is set to nonsense, it falls back to native', () => {
    
    const { wrapper } = init(finished_ucl, { verticalScrollMode: 123 })
    expect(wrapper.querySelector('.playoffs-root.with-native-scroll')).not.toBe(null)
    expect(getComputedStyle(wrapper.querySelector('.matches-scroller')).overflowY).toBe('scroll')
})


test(`Scroll buttons are hidden with "native" verticalScrollMode`, () => {

    const { wrapper } = init(finished_ucl, { verticalScrollMode: 'native' })
    expect(getComputedStyle(wrapper.querySelector('.button-up')).display).toBe('none')
    expect(getComputedStyle(wrapper.querySelector('.button-down')).display).toBe('none')
})


test(`Matches-scroller has overflowY: hidden when verticalScrollMode is "buttons`, () => {

    const { wrapper } = init(finished_ucl, { verticalScrollMode: 'buttons' })
    expect(getComputedStyle(wrapper.querySelector('.matches-scroller')).overflowY).toBe('hidden')
})


test(`Matches-scroller has overflowY: hidden when verticalScrollMode is "mixed"`, () => {

    const { wrapper } = init(finished_ucl, { verticalScrollMode: 'mixed' })
    expect(getComputedStyle(wrapper.querySelector('.matches-scroller')).overflowY).toBe('hidden')
})


test(`Scroll buttons are visible when verticalScrollMode is "buttons"`, () => {

    const { wrapper } = init(finished_ucl, { verticalScrollMode: 'buttons' })
    expect(getComputedStyle(wrapper.querySelector('.button-up')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.button-down')).display).toBe('flex')
})


test(`Scroll buttons are visible when verticalScrollMode is "mixed"`, () => {

    const { wrapper } = init(finished_ucl, { verticalScrollMode: 'mixed' })
    expect(getComputedStyle(wrapper.querySelector('.button-up')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.button-down')).display).toBe('flex')
})


test(`verticalScrollMode is not updatable by applyNewOptions`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { verticalScrollMode: 'mixed' })

    pl.applyNewOptions({ verticalScrollMode: 'native' })
    expect(getComputedStyle(wrapper.querySelector('.button-up')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.button-down')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.matches-scroller')).overflowY).toBe('hidden')
})


test(`verticalScrollMode is forced to "mixed" when fullscreen`, () => {
    const { wrapper } = init(finished_ucl, { fullscreen: true })

    expect(getComputedStyle(wrapper.querySelector('.button-up')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.button-down')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.matches-scroller')).overflowY).toBe('hidden')
})


test(`verticalScrollMode is forced to "mixed" when fullscreen`, () => {
    const { wrapper } = init(finished_ucl, { fullscreen: true })

    expect(getComputedStyle(wrapper.querySelector('.button-up')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.button-down')).display).toBe('flex')
    expect(getComputedStyle(wrapper.querySelector('.matches-scroller')).overflowY).toBe('hidden')
})


test(`resets (synthetic) scroll on navigation when resetScrollOnNavigation is true`, () => {
    
    const { wrapper, playoffs: pl } = init(finished_ucl, { verticalScrollMode: 'buttons', resetScrollOnNavigation: true })
    
    const poser = wrapper.querySelector('.matches-positioner')
    poser.style.transform = 'translateY(-500px)'
    pl.moveToNextRound()
    expect(getComputedStyle(poser).transform).toBe('translateY(-0px)')
})

test(`resets (synthetic) scroll on replaceData()`, () => {
    
    const { wrapper, playoffs: pl } = init(finished_ucl, { verticalScrollMode: 'buttons', resetScrollOnNavigation: true })
    
    const poser = wrapper.querySelector('.matches-positioner')
    poser.style.transform = 'translateY(-500px)'
    pl.replaceData({ rounds: [{}] })
    expect(getComputedStyle(poser).transform).toBe('translateY(-0px)')
})
