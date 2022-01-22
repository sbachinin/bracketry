import { insert_buttons_styles } from './insert_buttons_styles.mjs'
import { create_single_button } from './create_single_button.mjs'
import { get_round_left_X } from '../utils/sizes.mjs'
import { animate_with_easing } from '../utils/animate_with_easing.mjs'
import { debounce, within_range } from '../utils/utils.mjs'

let leftmost_round_index = 0

const set_new_leftmost_index = (
    change,
    rounds,
    width_deficit,
    options,
) => {
    let max_leftmost_round_index = rounds.findIndex(
        r => (r.left_X - options.distance_between_rounds/2) > width_deficit)
    if (max_leftmost_round_index === -1) max_leftmost_round_index = rounds.length

    leftmost_round_index = within_range(
        leftmost_round_index + change,
        0,
        max_leftmost_round_index
    )
}


export const create_horizontal_scroll_buttons = (
    all_data,
    root_brackets_el,
    options,
    { state, update_state },
    root_id,
) => {
    insert_buttons_styles(root_id, options)

    const update_round_index = change => {
        const width_deficit = all_data.all_content_width - root_brackets_el.clientWidth
        set_new_leftmost_index(change, all_data.rounds, width_deficit, options)

        const initial_scroll_X = state.scroll_X
        let destination_scroll_X = 0
        if (leftmost_round_index > 0) {
            destination_scroll_X = Math.min(
                width_deficit,
                get_round_left_X(
                    options,
                    leftmost_round_index,
                    all_data.rounds[1].width,
                    all_data.rounds[0].width,
                ) - options.distance_between_rounds/2
            )
        }
        const distance = destination_scroll_X - initial_scroll_X
        if (distance === 0) return

        animate_with_easing({
            type: 'scroll_X',
            handle_new_value: easing_value => {
                update_state({ scroll_X: initial_scroll_X + distance * easing_value})
            },
            duration: options.horizontal_scroll_duration
        })
    }

    const left_button = create_single_button('left', () => update_round_index(-1))
    const right_button = create_single_button('right', () => update_round_index(+1))
    
    root_brackets_el.append(left_button, right_button)




    const update_single_button = (button, side) => {
        button.innerHTML = side === 'left'
                ? options.horizontal_scroll_buttons_icon_left
                : options.horizontal_scroll_buttons_icon_right
        button.querySelector('svg')?.setAttribute('height', options.horizontal_scroll_buttons_size)
        button.querySelector('svg')?.setAttribute('width', options.horizontal_scroll_buttons_size)
    }

    const apply_options = debounce(() => {
        update_single_button(left_button, 'left')
        update_single_button(right_button, 'right')
    }, 50)

    const update_visibility = () => {
        const left_is_visible = options.horizontal_scroll_triggered_by === 'buttons' && state.scroll_X > 0
        left_button.classList[left_is_visible ? 'remove' : 'add']('hidden')
        const right_is_visible = options.horizontal_scroll_triggered_by === 'buttons'
            && state.scroll_X + root_brackets_el.clientWidth < (all_data.all_content_width)
        right_button.classList[right_is_visible ? 'remove' : 'add']('hidden')
    }

    return {
        apply_options,
        update_visibility
    }
}