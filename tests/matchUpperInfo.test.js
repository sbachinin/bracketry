/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')


test(`match-upper-info is rendered for every match which has matchUpperInfo`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [{
            roundIndex: 0,
            order: 0,
            matchUpperInfo: 'Finished'
        },
        {
            roundIndex: 0,
            order: 1,
        },
        {
            roundIndex: 1,
            order: 0,
            matchUpperInfo: 'Scheduled'
        }],
    }
    const { wrapper } = init(data)
    const  upper_infos = wrapper.querySelectorAll('.match-upper-info')
    expect(upper_infos.length).toBe(2)
    expect(upper_infos[0].textContent).toBe('Finished')
    expect(upper_infos[1].textContent).toBe('Scheduled')
})


test(`invalid matchUpperInfo is not rendered`, () => {
    const data = {
        rounds: [{}, {}],
        matches: [{
            roundIndex: 0,
            order: 0,
            matchUpperInfo: 22
        },
        {
            roundIndex: 0,
            order: 1,
            matchUpperInfo: null
        },
        {
            roundIndex: 1,
            order: 0,
            matchUpperInfo: true
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-upper-info')).toBe(null)
})


test(`HTML provided as matchUpperInfo must be properly inserted`, () => {
    const data = {
        rounds: [{}],
        matches: [{
            roundIndex: 0,
            order: 0,
            matchUpperInfo: `<a class="some-link">Link</a>`
        }],
    }
    const { wrapper } = init(data)
    expect(wrapper.querySelector('.match-upper-info .some-link')).not.toBe(null)
})
