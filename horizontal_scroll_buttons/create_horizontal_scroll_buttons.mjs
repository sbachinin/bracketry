import { insert_buttons_styles } from './insert_buttons_styles.mjs'
import { get_leftmost_fully_visible_round_index } from './get_leftmost_fully_visible_round_index.mjs'
import { create_single_button } from './create_single_button.mjs'

let leftmost_round_index = 0

const create_buttons_elements = (
    handle_new_round_index,
    root_bracket_container,
    rounds_count
) => {
    return [
        create_single_button(
            'left',
            () => handle_new_round_index(--leftmost_round_index),
            root_bracket_container,
            rounds_count
        ),
        create_single_button(
            'right',
            () => handle_new_round_index(++leftmost_round_index),
            root_bracket_container,
            rounds_count
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
    if (options.horizontalScrollTriggeredBy !== 'buttons') return

    insert_buttons_styles(root_id, options.backgroundColor)

    const handle_new_round_index = new_index => {
        leftButton.update_visibility(new_index)
        rightButton.update_visibility(new_index)
        change_round_index(new_index)
    }

    const [ leftButton, rightButton ] = create_buttons_elements(
        handle_new_round_index,
        root_bracket_container,
        rounds_count)

    leftButton.update_visibility(0)
    rightButton.update_visibility(0)

    root_bracket_container.append(leftButton.element, rightButton.element)

    return {
        update_buttons_on_resize: () => {
            leftmost_round_index = get_leftmost_fully_visible_round_index(state.scrollX)
            leftButton.update_visibility(leftmost_round_index)
            rightButton.update_visibility(leftmost_round_index)
        }
    }
}