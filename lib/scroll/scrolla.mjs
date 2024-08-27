import { scrollbar_functions } from './scrollbar_functions.mjs'
import { debounce, within_range } from '../utils.mjs'
import { disable_matches_scroll_on_window_scroll } from './disable_matches_scroll_on_window_scroll.mjs'
import { restrict_native_scroll } from './restrict_native_scroll.mjs'
import { handle_vertical_button_click } from './handle_vertical_button_click.mjs'
import { adjust_offset } from './adjust_offset.mjs'
import {
    apply_translateY, swap_translateY_to_margin,
    swap_translateY_to_transform
} from './apply_translateY.mjs'

const get_scrollY_ratio = (html_shell, synthetic_scrollTop) => {
    const { matches_scroller: scroller, matches_positioner } = html_shell
    const current_offset = scroller.scrollTop || synthetic_scrollTop
    const scrollY_middle_px = current_offset + scroller.clientHeight / 2
    return scrollY_middle_px / matches_positioner.clientHeight
}

const update_scroll_buttons = (synthetic_scrollTop, html_shell) => {
    const max_scrollTop = html_shell.matches_positioner.clientHeight - html_shell.matches_scroller.clientHeight
    const has_reached_end = Math.ceil(synthetic_scrollTop) >= Math.floor(max_scrollTop)
    const button_down = html_shell.the_root_element.querySelector('.button-down')
    const button_up = html_shell.the_root_element.querySelector('.button-up')

    if (has_reached_end) {
        button_down.classList.remove('active')
    } else {
        button_down.classList.add('active')
    }

    if (Math.floor(synthetic_scrollTop) <= 0) {
        button_up.classList.remove('active')
    } else {
        button_up.classList.add('active')
    }
}

const SCROLL_TRANSITION_DURATION = 300

const debounced_end_scrolling = debounce((matches_positioner) => {
    matches_positioner.classList.remove('is-scrolling')
}, SCROLL_TRANSITION_DURATION + 50)

export const create_scrolla = (html_shell, get_option) => {
    let synthetic_scrollTop = 0

    const { matches_scroller: scroller, matches_positioner } = html_shell

    html_shell.the_root_element.style.setProperty('--scroll-transition-duration', `${SCROLL_TRANSITION_DURATION / 1000}s`)

    const handle_native_scroll = () => {
        matches_positioner.classList.add('is-scrolling')
        scrollbar_functions.update_position(html_shell, get_option, scroller.scrollTop)
        debounced_end_scrolling(matches_positioner)
    }

    const forget_window_onscroll = disable_matches_scroll_on_window_scroll(scroller, get_option)

    const make_scroll_jump = (deltaY) => {
        matches_positioner.classList.add('is-scrolling')
        const translateY_max = matches_positioner.clientHeight - matches_positioner.parentElement.clientHeight
        synthetic_scrollTop = within_range(synthetic_scrollTop + deltaY, 0, translateY_max)
        apply_translateY(matches_positioner, synthetic_scrollTop)
        scrollbar_functions.update_position_with_transition(html_shell, get_option, synthetic_scrollTop)
        update_scroll_buttons(synthetic_scrollTop, html_shell)
        debounced_end_scrolling(matches_positioner)
    }


    let release_native_scroll_on_window = () => void 0
    let release_native_scroll_on_matches = () => void 0

    if (get_option('verticalScrollMode') === 'mixed') {
        release_native_scroll_on_matches = restrict_native_scroll(scroller, make_scroll_jump)
    } else if (get_option('verticalScrollMode') === 'native') {
        scroller.classList.add('scroll-y-enabled')
        scroller.addEventListener('scroll', handle_native_scroll)
    }


    const unhandle_vertical_button_click = handle_vertical_button_click(
        html_shell,
        get_option,
        make_scroll_jump
    )


    // Prevent lagginess on scroll in desktop Chromium:
    // With >1 bracket with "buttons" or "mixed" verticalScrollMode on the page, it lagged, consumed crazy cpu, made my comp noisy
    // This was mostly solved by setting z-index on matches_positioner and removing "will-change" from it
    // The following stuff seemed to improve things a little further:
    // It ensures that there is maximum 1 matches_positioner with "transform" css property.
    // This can become unnecessary in the future (in later versions of Chromium)
    html_shell.the_root_element.addEventListener('mouseenter', () => {
        // deactivate all other matches_positioners
        document.querySelectorAll('.with-vertical-scroll-buttons .matches-positioner').forEach(mp => {
            if (mp === matches_positioner) return

            // the following is to prevent undesirable animation. During scrolling, positioner is transitionable, otherwise not.
            // Therefore, if you move cursor to bracket B shortrly after scrolling bracket A, bracket A will stay active
            // This will cause in more CPU consumption but it's a rather small penalty with little probability
            if (mp.classList.contains('is-scrolling')) return

            swap_translateY_to_margin(mp)
        })

        swap_translateY_to_transform(matches_positioner)
    })


    return {
        get_scrollY_ratio: () => get_scrollY_ratio(html_shell, synthetic_scrollTop),

        adjust_offset: (scrollY_middle_ratio) => {
            const new_offset = adjust_offset(scrollY_middle_ratio, html_shell, get_option, synthetic_scrollTop)
            if (get_option('verticalScrollMode') !== 'native') {
                synthetic_scrollTop = new_offset
            }
            update_scroll_buttons(synthetic_scrollTop, html_shell)
        },

        uninstall: () => {
            scroller?.removeEventListener('scroll', handle_native_scroll)
            forget_window_onscroll()
            unhandle_vertical_button_click()
            release_native_scroll_on_window()
            release_native_scroll_on_matches()
        }
    }
}