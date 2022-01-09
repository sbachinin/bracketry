import { insert_buttons_styles } from './insert_buttons_styles.mjs'
import { create_single_button } from './create_single_button.mjs'
import { get_round_left_X } from '../utils/sizes.mjs'
import { animate_with_easing } from '../utils/animate-with-easing.mjs'
import { debounce, within_range } from '../utils/utils.mjs'

let leftmost_round_index = 0

const set_new_leftmost_index = (
    change,
    basic_drawing_attrs,
    width_deficit,
    options,
) => {
    let max_leftmost_round_index = basic_drawing_attrs.rounds.findIndex(
        r => (r.left_X - options.distance_between_rounds/2) > width_deficit)
    if (max_leftmost_round_index === -1) max_leftmost_round_index = basic_drawing_attrs.rounds.length

    leftmost_round_index = within_range(
        leftmost_round_index + change,
        0,
        max_leftmost_round_index
    )
}

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

    const update_round_index = change => {
        const width_deficit = all_content_width - root_brackets_el.clientWidth
        set_new_leftmost_index(change, basic_drawing_attrs, width_deficit, options)

        const initial_scroll_X = state.scroll_X
        let destination_scroll_X = 0
        if (leftmost_round_index > 0) {
            destination_scroll_X = Math.min(
                width_deficit,
                get_round_left_X(options, leftmost_round_index, round_width, first_round_width) - options.distance_between_rounds/2
            )
        }
        const distance = destination_scroll_X - initial_scroll_X
        if (distance === 0) return

        animate_with_easing(
            easing_value => {
                update_state({ scroll_X: initial_scroll_X + distance * easing_value})
            },
            options.horizontal_scroll_speed
        )
    }

    const left_button = create_single_button(
        'left',
        () => update_round_index(-1),
        options)
    const right_button = create_single_button(
        'right',
        () => update_round_index(+1),
        options)
    
    root_brackets_el.append(left_button, right_button)
    
    const update_buttons = debounce(scroll_X => {
        if (scroll_X <= 0) {
            left_button.classList.add('hidden')
        } else {
            left_button.classList.remove('hidden')
        }
        
        if (scroll_X + root_brackets_el.clientWidth >= (basic_drawing_attrs.all_content_width)) {
            right_button.classList.add('hidden')
        } else {
            right_button.classList.remove('hidden')
        }
    }, 50)

    return update_buttons
}