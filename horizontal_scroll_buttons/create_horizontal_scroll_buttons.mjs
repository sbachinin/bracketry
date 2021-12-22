import { insert_buttons_styles } from './insert_buttons_styles.mjs'
import { get_leftmost_fully_visible_round_index } from './get_leftmost_fully_visible_round_index.mjs'
import { create_single_button } from './create_single_button.mjs'
import { debounce } from '../utils/utils.mjs'
import * as constants from '../utils/constants.mjs'

let leftmost_round_index = 0

const create_buttons_elements = (
    handle_new_round_index,
    get_invisible_rounds_count
) => {
    return [
        create_single_button(
            'left',
            () => handle_new_round_index(--leftmost_round_index),
            get_invisible_rounds_count
        ),
        create_single_button(
            'right',
            () => handle_new_round_index(++leftmost_round_index),
            get_invisible_rounds_count
        )
    ]
}

export const create_horizontal_scroll_buttons = (
    root_bracket_container,
    options,
    rounds_count,
    state,
    change_round_index,
    root_id
) => {
    if (options.horizontal_scroll_triggered_by !== 'buttons') return

    insert_buttons_styles(root_id, options.backgroundColor)

    const handle_new_round_index = new_index => {
        leftButton.update_visibility(new_index)
        rightButton.update_visibility(new_index)
        change_round_index(new_index)
    }

    const get_invisible_rounds_count = () => {
        const fully_visible_rounds_count = Math.floor(
            root_bracket_container.clientWidth / constants.ROUND_WIDTH
        )
        return rounds_count - fully_visible_rounds_count
    }

    const [ leftButton, rightButton ] = create_buttons_elements(
        handle_new_round_index,
        get_invisible_rounds_count
    )

    leftButton.update_visibility(0)
    rightButton.update_visibility(0)

    root_bracket_container.append(leftButton.element, rightButton.element)

    new ResizeObserver(
        debounce(() => {
            leftmost_round_index = get_leftmost_fully_visible_round_index(state.scrollX)
            leftButton.update_visibility(leftmost_round_index)
            rightButton.update_visibility(leftmost_round_index)
        })
    ).observe(root_bracket_container)
}