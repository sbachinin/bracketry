import { within_range } from '../utils/utils.mjs'
import { get_elements } from '../stable_elements/create_stable_elements.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

const update_buttons = (els, base_index) => {
    let left_is_active = base_index > 0
    let right_is_active = els.matches_positioner.lastChild.classList.contains('hidden')

    els.the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.classList[left_is_active ? 'add' : 'remove']('active'))
    els.the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.classList[right_is_active ? 'add' : 'remove']('active'))
}


export const handle_new_left = (round_natural_width, els, base_index, get_option) => {
    const rounds = [...els.matches_positioner.querySelectorAll('.round-wrapper')]
    const round_titles = [...els.round_titles_wrapper.children]

    const visible_rounds_count = get_option('visibleRoundsCount') || Math.max(
        1,
        Math.floor(els.content_area.clientWidth / round_natural_width)
    )

// remember scrollY ratio
    let scrollY_middle_ratio = 0
    const scrollY_middle_px = els.matches_vertical_scroller.scrollTop + els.matches_vertical_scroller.clientHeight / 2
    scrollY_middle_ratio = scrollY_middle_px / els.matches_vertical_scroller.scrollHeight

// hide side rounds
    rounds.forEach((r, i) => {
        const visible = i >= base_index && i <= base_index + visible_rounds_count - 1
        r.classList[visible ? 'remove' : 'add']('hidden')
        round_titles[i].classList[visible ? 'remove' : 'add']('hidden')
    })

// set 'mobile' layout if only 1 round visible
    els.the_root_element.classList[visible_rounds_count === 1 ? 'add' : 'remove']('mobile')

// adjust scroll position to keep the same matches in the middle
    const new_scroll_middle_px = els.matches_vertical_scroller.scrollHeight * scrollY_middle_ratio
    els.matches_vertical_scroller.scrollTop = within_range(
        new_scroll_middle_px - els.matches_vertical_scroller.clientHeight / 2,
        0,
        els.matches_vertical_scroller.scrollHeight - els.matches_vertical_scroller.clientHeight
    )

    update_buttons(els, base_index)

    update_scrollbar(els)
}




export const create_navigation = (root_id, get_option) => {
    const els = get_elements(root_id)
    let base_index = 0
    let round_natural_width = els.matches_positioner.firstElementChild.clientWidth


    const repaint = () => handle_new_left(round_natural_width, els, base_index, get_option)

    const apply_options = () => {
        const was_mobile = els.the_root_element.classList.contains('mobile')
        els.the_root_element.classList.remove('mobile')
        els.the_root_element.classList.add('free-layout')
        
        round_natural_width = els.matches_positioner.firstElementChild.clientWidth

        els.the_root_element.classList.remove('free-layout')
        if (was_mobile) els.the_root_element.classList.add('mobile')
        repaint()
    }

    apply_options()



    const move_left = () => {
        base_index = Math.max(0, base_index - 1)
        repaint()
    }
    const move_right = () => {
        if (!els.matches_positioner.lastChild.classList.contains('hidden')) {
            return
        }
        base_index += 1
        repaint()
    }





    return {
        move_left,

        move_right,

        set_base_round_index: (i) => {
            base_index = i
            repaint()
        },

        apply_options,

        repaint,

        handle_click: (e) => {
            if (!e.target.classList.contains('active')) return
            if (e.target.classList.contains('left')) move_left()
            if (e.target.classList.contains('right')) move_right()
        },



        get_state: () => {
            return {
                reachedRightEdge: !stable_elements.matches_positioner.lastChild?.classList.contains('hidden'),
                allRoundsAreVisible: stable_elements.matches_positioner.querySelector('.round-wrapper.hidden') === null,
                baseRoundIndex: base_index
            }
        }

    }

}