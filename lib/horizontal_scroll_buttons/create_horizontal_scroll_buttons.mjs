import { insert_buttons_styles } from './insert_buttons_styles.mjs'
import { get_leftmost_fully_visible_round_index } from './get_leftmost_fully_visible_round_index.mjs'
import { create_single_button } from './create_single_button.mjs'
import { get_round_left_X } from '../utils/sizes.mjs'
import { animate_with_easing } from '../utils/animate-with-easing.mjs'
import { debounce } from '../utils/utils.mjs'

let leftmost_round_index = 0

export const create_horizontal_scroll_buttons = (
    root_brackets_el,
    options,
    state,
    update_state,
    root_id,
    basic_drawing_attrs
) => {
    const { all_content_width, round_width, first_round_width } = basic_drawing_attrs

    if (options.horizontal_scroll_triggered_by !== 'buttons') return

    insert_buttons_styles(root_id, options)

    const handle_new_round_index = new_index => {
        const width_deficit = all_content_width - root_brackets_el.clientWidth

        const initial_scroll_X = state.scroll_X
        let destination_scroll_X = 0
        if (new_index > 0) {
            destination_scroll_X = Math.min(
                width_deficit,
                get_round_left_X(options, new_index, round_width, first_round_width) - options.distance_between_rounds/2
            )
        }
        const distance = destination_scroll_X - initial_scroll_X

        animate_with_easing(
            easing_value => {
                update_state({ scroll_X: initial_scroll_X + distance * easing_value})
            },
            options.horizontal_scroll_speed
        )
    }

    const left_button = create_single_button(
        'left',
        () => handle_new_round_index(--leftmost_round_index),
        options)
    const right_button = create_single_button(
        'right',
        () => handle_new_round_index(++leftmost_round_index),
        options)
    
    root_brackets_el.append(left_button, right_button)
    
    const update_buttons = scroll_X => {
        if (scroll_X <= 0) {
            left_button.classList.add('hidden')
        } else {
            left_button.classList.remove('hidden')
        }
        
        if (scroll_X + root_brackets_el.clientWidth >= basic_drawing_attrs.all_content_width) {
            right_button.classList.add('hidden')
        } else {
            right_button.classList.remove('hidden')
        }
    }
    
    
    new ResizeObserver(
        debounce(() => {
            // timeout is to wait for the new scroll_X
            setTimeout(() => {
                leftmost_round_index = get_leftmost_fully_visible_round_index(
                    state.scroll_X,
                    (round_width + options.distance_between_rounds)
                )
            })
        })
    ).observe(root_brackets_el)

    return update_buttons
}