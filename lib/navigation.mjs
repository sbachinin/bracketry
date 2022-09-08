import { within_range, observe_resize_later } from './utils.mjs'
import { get_elements } from './html_shell/html_shell.mjs'
import { update_scrollbar } from './html_shell/scrollbar.mjs'

const update_buttons = (shell, base_index_value) => {
    const all_rounds_are_visible = shell.matches_positioner.querySelector('.round-wrapper.hidden') === null

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
            if (shell.matches_positioner.lastChild.classList.contains('hidden')) {
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
}


const get_visible_rounds_count = (round_natural_width, shell, get_option) => {
    let max_count

    const vrc_option = get_option('visibleRoundsCount')
    if (vrc_option !== undefined && vrc_option >= 1) {
        max_count = Math.floor(vrc_option)
    } else {
        max_count = Math.floor(shell.content_area.clientWidth / round_natural_width)
    }

    return within_range(
        max_count,
        1,
        shell.matches_positioner.children.length
    )
}

const handle_new_left = (round_natural_width, shell, base_index, get_option) => {
    const rounds = [...shell.matches_positioner.querySelectorAll('.round-wrapper')]
    const round_titles = [...shell.round_titles_wrapper.children]

    const visible_rounds_count = get_visible_rounds_count(round_natural_width, shell, get_option)

// "refresh" base index; (it may be necessary to reduce it
//      if navigation was at far right && v_r_count increased for whatever reason)
    base_index.set(base_index.get(), round_natural_width)

// remember scrollY ratio
    let scrollY_middle_ratio = 0
    const scrollY_middle_px = shell.matches_vertical_scroller.scrollTop + shell.matches_vertical_scroller.clientHeight / 2
    scrollY_middle_ratio = scrollY_middle_px / shell.matches_vertical_scroller.scrollHeight

// hide side rounds
    rounds.forEach((r, i) => {
        const visible = i >= base_index.get() && i <= base_index.get() + visible_rounds_count - 1
        r.classList[visible ? 'remove' : 'add']('hidden')
        round_titles[i].classList[visible ? 'remove' : 'add']('hidden')
    })

// set 'mobile' layout if only 1 round visible
    shell.the_root_element.classList[visible_rounds_count === 1 ? 'add' : 'remove']('mobile')

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

    const set = (i, round_natural_width) => {
        const max_index = (
            shell.matches_positioner.children.length
            - get_visible_rounds_count(round_natural_width, shell, get_option)
        )
        value = within_range(i, 0, max_index)
    }

    return {
        set,
        try_decrement: (round_natural_width) => set(value - 1, round_natural_width),
        try_increment: (round_natural_width) => set(value + 1, round_natural_width),
        get: () => value
    }
}


const get_round_natural_width = (shell) => {
    const was_mobile = shell.the_root_element.classList.contains('mobile')
    shell.the_root_element.classList.remove('mobile')
    shell.the_root_element.classList.add('free-layout')

    const new_natural_width = shell.matches_positioner.firstElementChild.clientWidth

    shell.the_root_element.classList.remove('free-layout')
    if (was_mobile) shell.the_root_element.classList.add('mobile')

    return new_natural_width
}


export const create_navigation = (root_id, get_option) => {
    const shell = get_elements(root_id)
    const base_index = create_base_index(shell, get_option)
    let round_natural_width = get_round_natural_width(shell)


    const repaint = () => handle_new_left(round_natural_width, shell, base_index, get_option)
    repaint()

    // TODO idea: observe subtree mutations --> repaint (but: does the image loading triggers that?)
    observe_resize_later(shell.content_area, repaint)



    const move_left = () => {
        base_index.try_decrement(round_natural_width)
        repaint()
    }
    const move_right = () => {
        if (!shell.matches_positioner.lastChild.classList.contains('hidden')) {
            return
        }
        base_index.try_increment(round_natural_width)
        repaint()
    }





    return {
        move_left,

        move_right,

        set_base_round_index: (i) => {
            base_index.set(i, round_natural_width)
            repaint()
        },

        update_round_natural_width: () => {
            round_natural_width = get_round_natural_width(shell)
        },

        repaint,

        handle_click: (e) => {
            if (!e.target.classList.contains('active')) return
            if (e.target.classList.contains('left')) move_left()
            if (e.target.classList.contains('right')) move_right()
        },



        get_state: () => {
            let reachedRightEdge = false
            let allRoundsAreVisible = false
            let baseRoundIndex = 0

            const elements = get_elements(root_id)
            if (elements !== null) {
                reachedRightEdge = !elements.matches_positioner.lastChild?.classList.contains('hidden')
                allRoundsAreVisible = elements.matches_positioner.querySelector('.round-wrapper.hidden') === null
                baseRoundIndex = base_index.get()
            }

            return { reachedRightEdge, allRoundsAreVisible, baseRoundIndex }
        }

    }

}