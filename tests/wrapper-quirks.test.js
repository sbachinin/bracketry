/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createBracket } = require('../dist/cjs/index.js')
const { init } = require('./utils.js')
const finished_ucl = require('./data/ucl-finished.js').default

afterEach(() => {
    document.body.innerHTML = ''
})


test('does not throw if non-element wrapper is provided', () => {
    expect.assertions(1)
    const try_create = () => createBracket(finished_ucl, 'i an an idiot')
    expect(try_create).not.toThrow()
})


test('does not throw if wrapper is not in the DOM', () => {
    expect.assertions(1)
    const try_create = () => createBracket({ rounds: [{}] }, document.createElement('div'))
    expect(try_create).not.toThrow()
})


test('does not throw if wrapper is of bad type', () => {
    expect.assertions(1)
    const wrapper = document.createElement('img')
    document.body.append(wrapper)
    const try_create = () => createBracket({ rounds: [{}] }, wrapper)
    expect(try_create).not.toThrow()
})


test('Returned methods are called without errors after user wrapper is removed', () => {
    const { wrapper, bracket: br } = init(finished_ucl)
    wrapper.remove()
    const run_all = () => Object.values(br).forEach(v => {
        typeof v === 'function' && v()
    })
    expect(run_all).not.toThrow()
})

test('Returned methods are called without errors after another bracket is installed into the same wrapper', () => {
    const { wrapper, bracket: br } = init(finished_ucl)
    createBracket({ rounds: [{}] }, wrapper)
    const run_all = () => Object.values(br).forEach(v => {
        typeof v === 'function' && v()
    })
    expect(run_all).not.toThrow()
})


test('Nothing changes after wrapper is reassigned', () => {
    let { wrapper, bracket: br } = init(finished_ucl)
    br.setBaseRoundIndex(2)
    wrapper = 'something else'
    expect(br.getNavigationState().baseRoundIndex).toBe(2)
    expect(document.querySelectorAll('.round-wrapper').length).toBe(4)
})

test('Keeps any old (non-bracket) content within wrapper', () => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="some-old-stuff">Unwanted crap</div>'
    document.body.append(wrapper)
    createBracket(finished_ucl, wrapper)
    expect(wrapper.querySelector('.some-old-stuff').textContent).toBe('Unwanted crap')
})
