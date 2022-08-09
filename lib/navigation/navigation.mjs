import { within_range } from '../utils/utils.mjs'
import { get_elements } from '../stable_elements/create_stable_elements.mjs'
import { update_scrollbar } from '../stable_elements/scrollbar.mjs'

const update_buttons = (els, base_index_value) => {
    let left_is_active = base_index_value > 0
    let right_is_active = els.matches_positioner.lastChild.classList.contains('hidden')

    els.the_root_element.querySelectorAll('.navigation-button.left')
        .forEach(b => b.classList[left_is_active ? 'add' : 'remove']('active'))
    els.the_root_element.querySelectorAll('.navigation-button.right')
        .forEach(b => b.classList[right_is_active ? 'add' : 'remove']('active'))
}

const get_visible_rounds_count = (round_natural_width, els, get_option) => {
    return get_option('visibleRoundsCount')
        || Math.max(1, Math.floor(els.content_area.clientWidth / round_natural_width))
}

const handle_new_left = (round_natural_width, els, base_index_value, get_option) => {
    const rounds = [...els.matches_positioner.querySelectorAll('.round-wrapper')]
    const round_titles = [...els.round_titles_wrapper.children]

    const visible_rounds_count = get_visible_rounds_count(round_natural_width, els, get_option)

// remember scrollY ratio
    let scrollY_middle_ratio = 0
    const scrollY_middle_px = els.matches_vertical_scroller.scrollTop + els.matches_vertical_scroller.clientHeight / 2
    scrollY_middle_ratio = scrollY_middle_px / els.matches_vertical_scroller.scrollHeight

// hide side rounds
    rounds.forEach((r, i) => {
        const visible = i >= base_index_value && i <= base_index_value + visible_rounds_count - 1
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

    update_buttons(els, base_index_value)

    update_scrollbar(els)
}


const create_base_index = (els, get_option) => {
    let value = 0

    const set = (i, round_natural_width) => {
        const max_index = (
            els.matches_positioner.children.length
            - get_visible_rounds_count(round_natural_width, els, get_option)
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


export const create_navigation = (root_id, get_option) => {
    const els = get_elements(root_id)
    const base_index = create_base_index(els, get_option)
    let round_natural_width = els.matches_positioner.firstElementChild.clientWidth


    const repaint = () => handle_new_left(round_natural_width, els, base_index.get(), get_option)

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
        base_index.try_decrement(round_natural_width)
        repaint()
    }
    const move_right = () => {
        if (!els.matches_positioner.lastChild.classList.contains('hidden')) {
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

        apply_options,

        repaint,

        handle_click: (e) => {
            if (!e.target.classList.contains('active')) return
            if (e.target.classList.contains('left')) move_left()
            if (e.target.classList.contains('right')) move_right()
        },



        get_state: () => {
            const stable_elements = get_elements(root_id)
            return {
                reachedRightEdge: !stable_elements.matches_positioner.lastChild?.classList.contains('hidden'),
                allRoundsAreVisible: stable_elements.matches_positioner.querySelector('.round-wrapper.hidden') === null,
                baseRoundIndex: base_index.get()
            }
        }

    }

}