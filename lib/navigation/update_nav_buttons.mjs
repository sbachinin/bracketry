import { is_last_round_fully_visible } from './calc.mjs'

export const update_nav_buttons = (shell, base_index_value, get_option) => {
    const last_round_is_fully_visible = is_last_round_fully_visible(shell, base_index_value, get_option)
    const all_rounds_are_visible = base_index_value === 0 && last_round_is_fully_visible
    
    shell.the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => {
            if (base_index_value > 0) {
                b.classList.add('active')
            } else {
                b.classList.remove('active')
            }
            if (all_rounds_are_visible) {
                b.classList.add('hidden')
            } else {
                b.classList.remove('hidden')
            }
        })
    shell.the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => {
            if (last_round_is_fully_visible) {
                b.classList.remove('active')
            } else {
                b.classList.add('active')
            }
            if (all_rounds_are_visible) {
                b.classList.add('hidden')
            } else {
                b.classList.remove('hidden')
            }
        })
}
