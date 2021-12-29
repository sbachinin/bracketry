import { insert_buttons_styles } from './insert_buttons_styles.mjs'
import { get_leftmost_fully_visible_round_index } from './get_leftmost_fully_visible_round_index.mjs'
import { create_single_button } from './create_single_button.mjs'
import { get_round_left_X } from '../utils/coordinates.mjs'
import { animate_with_easing } from '../utils/animate-with-easing.mjs'
import { debounce } from '../utils/utils.mjs'

let leftmost_round_index = 0

const create_buttons_elements = (
    handle_new_round_index,
    get_invisible_rounds_count,
    options
) => {
    return [
        create_single_button(
            'left',
            () => handle_new_round_index(--leftmost_round_index),
            get_invisible_rounds_count,
            options
        ),
        create_single_button(
            'right',
            () => handle_new_round_index(++leftmost_round_index),
            get_invisible_rounds_count,
            options
        )
    ]
}

export const create_horizontal_scroll_buttons = (
    root_bracket_container,
    options,
    rounds_count,
    state,
    handle_new_scrollX,
    root_id
) => {
    if (options.horizontal_scroll_triggered_by !== 'buttons') return

    insert_buttons_styles(root_id, options)

    const handle_new_round_index = new_index => {
        leftButton.update_visibility(new_index)
        rightButton.update_visibility(new_index)

        const width_deficit = rounds_count * (options.round_width + options.distance_between_rounds) - root_bracket_container.clientWidth
        const initial_scrollX = state.scrollX
        let destination_scrollX = 0
        
        if (new_index > 0) {
            destination_scrollX = -Math.min(
                width_deficit,
                get_round_left_X(options, new_index) - options.distance_between_rounds/2
            )
        }
        const distance = destination_scrollX - initial_scrollX

        animate_with_easing(
            easing_value => {
                handle_new_scrollX(initial_scrollX + distance * easing_value)
            }
        )
    }

    const get_invisible_rounds_count = () => {
        const fully_visible_rounds_count = Math.floor(
            root_bracket_container.clientWidth / (options.round_width + options.distance_between_rounds)
        )
        return rounds_count - fully_visible_rounds_count
    }

    const [ leftButton, rightButton ] = create_buttons_elements(
        handle_new_round_index,
        get_invisible_rounds_count,
        options
    )

    leftButton.update_visibility(0)
    rightButton.update_visibility(0)

    root_bracket_container.append(leftButton.element, rightButton.element)

    new ResizeObserver(
        debounce(() => {
            // timeout is to wait for the new scrollX
            setTimeout(() => {
                leftmost_round_index = get_leftmost_fully_visible_round_index(
                    state.scrollX,
                    (options.round_width + options.distance_between_rounds)
                )
                leftButton.update_visibility(leftmost_round_index)
                rightButton.update_visibility(leftmost_round_index)
            })
        })
    ).observe(root_bracket_container)
}