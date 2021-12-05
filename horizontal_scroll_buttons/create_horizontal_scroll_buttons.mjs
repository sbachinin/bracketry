import * as sizes from '../utils/sizes.mjs'
import { get_buttons_style } from './get_buttons_style.mjs'
import { get_leftmost_index } from './get_leftmost_index.mjs'
import { create_single_button } from './create_single_button.mjs'
import { update_buttons_visibility } from './update_buttons_visibility.mjs'

const get_invisible_rounds_count = (root_bracket_container, rounds_count) => {
    const fully_visible_rounds_count = Math.floor(root_bracket_container.clientWidth / sizes.ROUND_WIDTH)
    return rounds_count - fully_visible_rounds_count
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

    document.head.insertAdjacentHTML(
        'beforeend',
        `<style>${get_buttons_style(root_id, options.backgroundColor)}</style>`
    )

    const handle_new_round_index = new_index => {
        update_buttons_visibility(
            new_index,
            get_invisible_rounds_count(root_bracket_container, rounds_count),
            leftButton, rightButton
        )
        change_round_index(new_index)
    }

    const leftButton = create_single_button(state, 'left', handle_new_round_index)
    const rightButton = create_single_button(state, 'right', handle_new_round_index)
    update_buttons_visibility(
        get_leftmost_index(state.scrollX),
        get_invisible_rounds_count(root_bracket_container, rounds_count),
        leftButton, rightButton
    )
    root_bracket_container.append(leftButton, rightButton)

    return {
        update_buttons_on_resize: () => {
            update_buttons_visibility(
                get_leftmost_index(state.scrollX),
                get_invisible_rounds_count(root_bracket_container, rounds_count),
                leftButton, rightButton
            )
        }
    }
}