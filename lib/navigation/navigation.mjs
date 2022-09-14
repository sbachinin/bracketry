import { within_range, observe_resize_later } from '../utils.mjs'
import { get_elements } from '../html_shell/html_shell.mjs'
import { scrollbar_functions } from '../html_shell/scrollbar_functions.mjs'
import { is_last_round_fully_visible } from './is_last_round_fully_visible.mjs'
import { update_buttons } from './update_buttons.mjs'

const get_visible_rounds_count = (shell, get_option) => {
    let max_count

    const vrc_option = get_option('visibleRoundsCount')
    if (vrc_option !== undefined && vrc_option >= 1) {
        max_count = Math.floor(vrc_option)
    } else {
        max_count = Math.floor(
            shell.content_area.getBoundingClientRect().width
            / Math.floor(shell.matches_positioner.querySelector('.round-wrapper').getBoundingClientRect().width)
        )
    }

    return within_range(
        max_count,
        1,
        shell.matches_positioner.querySelectorAll('.round-wrapper').length
    )
}

const handle_new_left = (shell, base_index, get_option) => {
// "refresh" base index; (it may be necessary to reduce it
//      if navigation was at far right && v_r_count increased for whatever reason)
    base_index.set(base_index.get())

// remember scrollY ratio
    let scrollY_middle_ratio = 0
    const scrollY_middle_px = shell.matches_vertical_scroller.scrollTop + shell.matches_vertical_scroller.clientHeight / 2
    scrollY_middle_ratio = scrollY_middle_px / shell.matches_vertical_scroller.scrollHeight















    const area_width = shell.content_area.getBoundingClientRect().width
    const rounds = [...shell.matches_positioner.querySelectorAll('.round-wrapper')]
    console.log('recalculate rounds widths!')
// reset rounds widths to measure 1st round's natural width
    rounds.forEach((r) => { r.style.width = ''}) // it's perhaps heavy but necessary only if displayWholeRounds true which is unlikely a default'
    const first_round_width = rounds[0].getBoundingClientRect().width
    

    rounds.forEach((r, i) => {
// hide rounds that disappeared on the left
        const visible = i >= base_index.get()
        r.classList[visible ? 'remove' : 'add']('collapsed')

// make whole number of rounds if options.VRC is provided
        const vrc_option = get_option('visibleRoundsCount')
        if (vrc_option !== undefined && vrc_option >= 1) {
            const would_be_width = (area_width / Math.min(rounds.length, vrc_option)) + 'px'
            if (would_be_width !== r.style.width) {
                r.style.width = would_be_width
            }
        } else if (get_option('displayWholeRounds')) {
            const natural_visible_rounds_count = area_width / first_round_width
            r.style.width = (area_width / Math.floor(natural_visible_rounds_count)) + 'px'
        }
    })












// push matches_positioner horizontally
    shell.content_horizontal_scroller.style.marginLeft = -(
        base_index.get() * shell.matches_positioner.firstChild.getBoundingClientRect().width
        // + get_option('connectionLinesWidth')
        // + 1
    ) + 'px'

// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = shell.matches_vertical_scroller.scrollHeight * scrollY_middle_ratio
    shell.matches_vertical_scroller.scrollTop = within_range(
        new_scroll_middle_px - shell.matches_vertical_scroller.clientHeight / 2,
        0,
        shell.matches_vertical_scroller.scrollHeight - shell.matches_vertical_scroller.clientHeight
    )

    update_buttons(shell, base_index.get(), get_option)

    scrollbar_functions.full_update(shell, get_option)
}


const create_base_index = (shell, get_option) => {
    let value = 0

    const set = (i) => {
        const max_index = (
            shell.matches_positioner.querySelectorAll('.round-wrapper').length
            - get_visible_rounds_count(shell, get_option)
        )
        value = within_range(i, 0, max_index)
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

    const repaint = () => handle_new_left(shell, base_index, get_option)
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