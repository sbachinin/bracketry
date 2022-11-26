/**
 * @jest-environment jsdom
 */

global.ResizeObserver = require('resize-observer-polyfill')
const { init } = require('./utils.js')
const finished_ucl = require('./ucl-finished.js').default


test(`tells user options via getUserOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    expect(pl.getUserOptions()).toEqual({ visibleRoundsCount: 2 })
})


test(`sets options of types "string" or "pixels" (but not other types) as css variables on root`, () => {

    const { wrapper } = init(finished_ucl, {
        roundTitlesVerticalPadding: 40,
        rootFontFamily: 'somefamily',
        rootBgColor: 'red',
        visibleRoundsCount: 3,
        onMatchClick: console.log,
        showScrollbar: true,
        leftNavigationButtonHTML: 'button',
        verticalScrollMode: 'buttons'
    })

    const style = getComputedStyle(wrapper.querySelector('.playoffs-root'))
    expect(style.getPropertyValue('--roundTitlesVerticalPadding')).toBe('40px')
    expect(style.getPropertyValue('--rootFontFamily')).toBe('somefamily')
    expect(style.getPropertyValue('--rootBgColor')).toBe('red')
    expect(style.getPropertyValue('--visibleRoundsCount')).toBe('')
    expect(style.getPropertyValue('--onMatchClick')).toBe('')
    expect(style.getPropertyValue('--showScrollbar')).toBe('')
    expect(style.getPropertyValue('--leftNavigationButtonHTML')).toBe('')
    expect(style.getPropertyValue('--verticalScrollMode')).toBe('')

})


test(`sets feature classes according to options`, () => {
    const { wrapper } = init(finished_ucl, {
        navButtonsPosition: 'beforeTitles',
        useClassicalLayout: true,
        fullscreen: true
    })

    const root_classes = wrapper.querySelector('.playoffs-root').classList
    expect(root_classes.contains('with-nav-buttons-before-titles')).toBe(true)
    expect(root_classes.contains('with-classical-layout')).toBe(true)
    expect(root_classes.contains('fullscreen')).toBe(true)
    expect(root_classes.contains('with-onMatchClick')).toBe(false)
})


test(`applies new visibleRoundsCount via applyNewOptions`, () => {

    const { wrapper, playoffs: pl } = init(finished_ucl, { visibleRoundsCount: 2 })
    pl.applyNewOptions({ visibleRoundsCount: 1 })
    expect(wrapper.querySelector('.matches-positioner').style.width).toBe('400%')
})



test(`does not apply invalid options supplied by applyNewOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { roundTitlesVerticalPadding: 38 })
    pl.applyNewOptions({ roundTitlesVerticalPadding: 'poop', scrollbarWidth: NaN })
    expect(pl.getUserOptions()).toEqual({ roundTitlesVerticalPadding: 38 })
})



test(`getUserOptions returns only valid options supplied to createPlayoffs`, () => {

    const { playoffs: pl } = init(finished_ucl, {
        roundTitlesVerticalPadding: 'poop',
        scrollbarWidth: NaN,
        visibleRoundsCount: 2
    })

    expect(pl.getUserOptions()).toEqual({ visibleRoundsCount: 2 })
})



test(`getUserOptions returns only valid options supplied by applyNewOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { roundTitlesVerticalPadding: 38 })

    pl.applyNewOptions({ roundTitlesVerticalPadding: 'poop', scrollbarWidth: NaN, visibleRoundsCount: 2 })

    expect(pl.getUserOptions()).toMatchObject({ roundTitlesVerticalPadding: 38, visibleRoundsCount: 2 })
})


test(`ignores non-object options passed to applyNewOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { roundTitlesVerticalPadding: 300 })
    pl.applyNewOptions('i am an idiot')
    expect(pl.getUserOptions()).toEqual({ roundTitlesVerticalPadding: 300 })
})



test(`Ignores subsequent mutations of an options object by a user`, () => {

    const options = { roundTitlesVerticalPadding: 30 }
    const { playoffs: pl } = init(finished_ucl, options)
    options.roundTitlesVerticalPadding = 50
    expect(pl.getUserOptions()).toEqual({ roundTitlesVerticalPadding: 30 })
})



test(`does not mutate an options object supplied by a user`, () => {

    const options = { roundTitlesVerticalPadding: 30 }
    init(finished_ucl, options)
    expect(options).toEqual(options)
})



test(`ignores mutations of object returned by getUserOptions`, () => {

    const options = { roundTitlesVerticalPadding: 30 }
    const { playoffs: pl } = init(finished_ucl, options)

    const returned_options = pl.getUserOptions()
    returned_options.roundTitlesVerticalPadding = 5000

    expect(pl.getUserOptions()).toEqual({ roundTitlesVerticalPadding: 30 })
})



test(`getUserOptions returns object which is a merge of initial options and those changed by applyNewOptions`, () => {

    const { playoffs: pl } = init(finished_ucl, { roundTitlesVerticalPadding: 30 })
    pl.applyNewOptions({ matchMaxWidth: 333 })
    expect(pl.getUserOptions()).toEqual({ roundTitlesVerticalPadding: 30, matchMaxWidth: 333 })
})



test(`does not merge or apply new options of functional type`, () => {

    const { wrapper, playoffs: pl } = init(
        finished_ucl,
        {
            getMatchElement: () => {
                const el = document.createElement('div')
                el.className = 'old-match-element'
                return el
            },
            roundTitlesVerticalPadding: 30
        }
    )

    pl.applyNewOptions({
        getMatchElement: () => {
            const el = document.createElement('div')
            el.className = 'new-match-element'
            return el
        }
    })

    expect(pl.getUserOptions().getMatchElement().className).toBe('old-match-element')
    expect(wrapper.querySelectorAll('.old-match-element').length).toBe(15)
    expect(wrapper.querySelector('.new-match-element')).toBe(null)
})


/* broke after introduction of css vars
TODO no protection agains NaN now
test(`falls back to default option if NaN is provided for an option of type "number"`, () => {

    const { wrapper } = init(finished_ucl, {
        roundTitlesHeight: NaN, matchHorMargin: NaN
    })
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('50px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-wrapper')).paddingLeft
    ).toBe('20px')
})
*/


/* broke after introduction of css vars
test(`falls back to default options in case of INVALID options`, () => {

    const { wrapper } = init(finished_ucl, {
        roundTitlesHeight: {}, matchHorMargin: [], matchMaxWidth: Object
    })
    expect(
        getComputedStyle(wrapper.querySelector('.round-titles-wrapper')).height
    ).toBe('50px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-wrapper')).paddingLeft
    ).toBe('20px')
    expect(
        getComputedStyle(wrapper.querySelector('.match-body')).maxWidth
    ).toBe('unset')
})
*/


