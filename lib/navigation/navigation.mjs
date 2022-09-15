import { debounce } from '../utils.mjs'
import { within_range, observe_resize_later } from '../utils.mjs'
import { get_elements } from '../html_shell/html_shell.mjs'
import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'
import { get_visible_rounds_count, is_last_round_fully_visible, get_max_base_index } from './calc.mjs'
import { update_buttons } from './update_buttons.mjs'

const update = (shell, base_index, get_option) => {
// "refresh" base index; (it may be necessary to reduce it
//      if navigation was at far right && v_r_count increased for whatever reason)
    base_index.set(base_index.get())

// remember scrollY ratio
    let scrollY_middle_ratio = 0
    if (!get_option('useClassicalLayout') && !get_option('resetScrollOnNavigation')) {
        const scrollY_middle_px = shell.matches_vertical_scroller.scrollTop + shell.matches_vertical_scroller.clientHeight / 2
        scrollY_middle_ratio = scrollY_middle_px / shell.matches_vertical_scroller.scrollHeight
    }


    
// hide rounds that disappeared on the left
    const rounds = [...shell.matches_positioner.querySelectorAll('.round-wrapper')]
    rounds.forEach((r, i) => {
        const visible = i >= base_index.get()
        r.classList[visible ? 'remove' : 'add']('collapsed')
    })



// set width and offset according to round index
    shell.content_horizontal_scroller.style.width = '' // let rounds attain natural width
    const vrc = get_visible_rounds_count(shell, get_option)
    shell.content_horizontal_scroller.style.width = ((100 / vrc) * rounds.length) + '%'
    shell.content_horizontal_scroller.style.marginLeft = -(base_index.get() * (100 / vrc)) + '%'



// adjust scroll position to keep the same matches in the middle
    if (get_option('resetScrollOnNavigation')) {
        shell.matches_vertical_scroller.scrollTop = 0
    } else if (!get_option('useClassicalLayout')) {
        const new_scroll_middle_px = shell.matches_vertical_scroller.scrollHeight * scrollY_middle_ratio
        shell.matches_vertical_scroller.scrollTop = within_range(
            new_scroll_middle_px - shell.matches_vertical_scroller.clientHeight / 2,
            0,
            shell.matches_vertical_scroller.scrollHeight - shell.matches_vertical_scroller.clientHeight
        )
    }

    update_buttons(shell, base_index.get(), get_option)

    scrollbar_functions.full_update(shell, get_option)
}


const create_base_index = (shell, get_option) => {
    let value = 0

    const set = (i) => {
        value = within_range(
            i,
            0,
            get_max_base_index(shell, value, get_option)
        )
    }

    return {
        set,
        try_decrement: () => set(value - 1),
        try_increment: () => set(value + 1),
        get: () => value
    }
}


export const create_navigation = (root_id, get_option) => {
    const shell = get_elements(root_id)
    const base_index = create_base_index(shell, get_option)

    const repaint = () => update(shell, base_index, get_option)
    repaint()

    // TODO idea: observe subtree mutations --> repaint (but: does the image loading triggers that?)
    observe_resize_later(shell.content_area, repaint)



    const move_left = () => {
        base_index.try_decrement()
        repaint()
    }
    const move_right = () => {
        if (!is_last_round_fully_visible(shell, base_index.get(), get_option)) {
            base_index.try_increment()
            repaint()
        }
    }

// listen to any user images (without explicit style.width and height) loaded within content-area and repaint (not too often)
    document.addEventListener(
        'load',
        debounce((e) => {
            if (
                e.path[0]?.closest(`#${root_id} .content-area`)
                && e.path[0] instanceof HTMLImageElement
                && (e.path[0]?.style.width === '' || e.path[0]?.style.height === '')
            ) {
                repaint()
            }
        }, 300),
        true
    )


    return {
        move_left,

        move_right,

        set_base_round_index: (i) => {
            base_index.set(i)
            repaint()
        },

        repaint,

        handle_click: (e) => {
            if (!e.target.classList.contains('active')) return
            if (e.target.classList.contains('left')) move_left()
            if (e.target.classList.contains('right')) move_right()
        },



        get_state: () => {
            let lastRoundIsFullyVisible = false
            let allRoundsAreVisible = false
            let baseRoundIndex = 0

            const elements = get_elements(root_id)
            if (elements !== null) {
                const base_index_value = base_index.get()
                lastRoundIsFullyVisible = is_last_round_fully_visible(shell, base_index_value, get_option)
                allRoundsAreVisible = base_index_value === 0 && lastRoundIsFullyVisible
                baseRoundIndex = base_index_value
            }

            return { lastRoundIsFullyVisible, allRoundsAreVisible, baseRoundIndex }
        }

    }

}