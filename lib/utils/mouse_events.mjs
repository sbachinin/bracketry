import { throttle, debounce, within_range } from './utils.mjs'
import { try_scroll_X } from './try_scroll_x.mjs'
import { stopAnimation } from './animate.mjs'
import { get_all_content_width, get_height_deficit_for_round } from './sizes.mjs'
import { animate_with_easing } from './animate-with-easing.mjs'

const MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL = 500
let window_scrolled_recently = false

const prevent_bracket_scroll_on_window_scroll = options => {
    const try_forget_window_scroll = debounce(
        () => { window_scrolled_recently = false },
        MOUSE_ACTIONS_DELAY_AFTER_WINDOW_SCROLL
    )

    window.addEventListener(
        'scroll',
        () => {
            if (options.horizontal_scroll_triggered_by === 'mousemove') {
                window_scrolled_recently = true
                try_forget_window_scroll()
            }
        }
    )
}

// here root_brackets_el is passed instead of canvas_el
// because wheel event has to be handled on both canvas_el and hor scroll buttons
export const install_mouse_events = (
    all_data,
    options,
    state,
    update_state,
    root_brackets_el
) => {
    if (options.horizontal_scroll_triggered_by === 'mousemove') {
        root_brackets_el.addEventListener(
            'mousemove',
            throttle(
                e => {
                    !window_scrolled_recently
                    && try_scroll_X(
                        get_all_content_width(options, all_data.rounds.length),
                        state,
                        scroll_X => update_state({ scroll_X }),
                        root_brackets_el.clientWidth,
                        e
                    )
                },
                50
            )
        )

            
        // * possible optimization here
        // currently requestAnimationF is stopped only here.
        // RAF is still running when mouse moves to the middle of the canvas
        // and is still running when animation reaches the end
        root_brackets_el.addEventListener('mouseleave', stopAnimation)
    }

    prevent_bracket_scroll_on_window_scroll(options)

    const longest_round_height_deficit = get_height_deficit_for_round(
        all_data.rounds[0].matches.length,
        options,
        root_brackets_el.clientHeight
    )

    
    
    let destination_scroll_Y = null
    // - state.scroll_Y is expressed not in pixels (because every round has its own pixel scroll_Y)
    // but in % of "overall scroll height" (or "height_deficit").
    // - When matches are drawn later,
    // they transform this % into pixel scroll_Y according to their particular width deficits.
    // - Single wheel move changes the scroll_Y of the leftmost (longest) round by 1 match height.
    // And, accordingly, it changes the 2nd round scroll_Y by 1/2 match height etc etc
    root_brackets_el.addEventListener('wheel', e => {
        e.preventDefault();
        const initial_scroll_Y = state.scroll_Y

        const delta = e.deltaY
            * options.min_height_per_match
            / longest_round_height_deficit

        destination_scroll_Y = within_range(
            (destination_scroll_Y || initial_scroll_Y) + delta,
            0,
            100
        )

        const distance = destination_scroll_Y - initial_scroll_Y

        animate_with_easing(
            easing_value => {
                update_state({ scroll_Y: initial_scroll_Y + distance * easing_value })
            },
            options.vertical_scroll_speed
        )
    })
}
