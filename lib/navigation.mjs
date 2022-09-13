import { within_range, observe_resize_later } from './utils.mjs'
import { get_elements } from './html_shell/html_shell.mjs'
import { update_scrollbar } from './html_shell/scrollbar.mjs'

const get_width_deficit = shell => (
    shell.matches_positioner.getBoundingClientRect().width
    - shell.content_area.getBoundingClientRect().width
)

const is_last_round_fully_visible = shell => {
    return Math.ceil(-shell.content_horizontal_scroller.offsetLeft - get_width_deficit(shell)) >= 0
}

const update_buttons = (shell, base_index_value) => {
    const width_deficit = get_width_deficit(shell)
    const last_round_is_fully_visible = is_last_round_fully_visible(shell)
    const all_rounds_are_visible = width_deficit <= 0
    
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
    const natural_visible_rounds_count = area_width / first_round_width

    rounds.forEach((r, i) => {
// hide rounds that disappeared on the left
        const visible = i >= base_index.get()
        r.classList[visible ? 'remove' : 'add']('collapsed')

// make whole number of rounds if options.VRC is provided
        const vrc_option = get_option('visibleRoundsCount')
        if (vrc_option !== undefined && vrc_option >= 1) {
            const would_be_width = (area_width / Math.min(rounds.length, vrc_option)).toFixed(2) + 'px'
            if (would_be_width !== r.style.width) {
                r.style.width = would_be_width
            }
        } else if (get_option('displayWholeRounds')) {
            r.style.width = (area_width / Math.floor(natural_visible_rounds_count)).toFixed() + 'px'
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

    update_buttons(shell, base_index.get())

    update_scrollbar(shell)
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
        if (get_width_deficit(shell) > 0) {
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
                lastRoundIsFullyVisible = is_last_round_fully_visible(shell)
                allRoundsAreVisible = get_width_deficit(shell) <= 0
                baseRoundIndex = base_index.get()
            }

            return { lastRoundIsFullyVisible, allRoundsAreVisible, baseRoundIndex }
        }

    }

}