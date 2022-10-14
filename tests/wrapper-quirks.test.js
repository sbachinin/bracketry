/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { createPlayoffs } = require('../dist/cjs/index.js')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default

afterEach(() => {
    document.body.innerHTML = ''
})


test('does not throw if non-element wrapper is provided', () => {
    expect.assertions(1)
    const try_create = () => createPlayoffs(finished_ucl, 'i an an idiot')
    expect(try_create).not.toThrow()
})


test('does not throw if wrapper is not in the DOM', () => {
    expect.assertions(1)
    const try_create = () => createPlayoffs({ rounds: [{}] }, document.createElement('div'))
    expect(try_create).not.toThrow()
})


test('does not throw if wrapper is of bad type', () => {
    expect.assertions(1)
    const wrapper = document.createElement('img')
    document.body.append(wrapper)
    const try_create = () => createPlayoffs({ rounds: [{}] }, wrapper)
    expect(try_create).not.toThrow()
})


test('Returned methods are called without errors after user wrapper is removed', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    wrapper.remove()
    const run_all = () => Object.values(pl).forEach(v => v())
    expect(run_all).not.toThrow()
})

test('Returned methods are called without errors after another playoffs are installed into the same wrapper', () => {
    const { wrapper, playoffs: pl } = init(finished_ucl)
    createPlayoffs({ rounds: [{}] }, wrapper)
    const run_all = () => Object.values(pl).forEach(v => v())
    expect(run_all).not.toThrow()
})


test('Nothing changes after wrapper is reassigned', () => {
    let { wrapper, playoffs: pl } = init(finished_ucl)
    wrapper = 'something else'
    const run_all = () => Object.values(pl).forEach(v => v())
    expect(run_all).not.toThrow()
    expect(document.querySelectorAll('.round-wrapper').length).toBe(4)
})

test('Keeps any old (non-playoffs) content within wrapper', () => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="some-old-stuff">Unwanted crap</div>'
    document.body.append(wrapper)
    createPlayoffs(finished_ucl, wrapper)
    expect(wrapper.querySelector('.some-old-stuff').textContent).toBe('Unwanted crap')
})
