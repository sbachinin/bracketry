import { debounce } from '../utils.mjs'
import { within_range, observe_resize_later } from '../utils.mjs'
import { get_visible_rounds_count, is_last_round_fully_visible, get_max_base_index } from './calc.mjs'
import { update_buttons } from './update_buttons.mjs'

const update = (base_index, get_option, shell, scrolla) => {
// "refresh" base index; (it may be necessary to reduce it
//      if navigation was at far right && v_r_count increased for whatever reason)
    base_index.set(base_index.get())

// remember scrollY ratio
    const scrollY_middle_ratio = scrolla.get_scrollY_ratio()


    
// hide rounds that disappeared on the left
    const rounds = [...shell.matches_positioner.querySelectorAll('.round-wrapper')]
    rounds.forEach((r, i) => {
        const visible = i >= Math.floor(base_index.get())
        r.classList[visible ? 'remove' : 'add']('collapsed')
    })



// set width and offset according to round index
    shell.matches_vertical_scroller.style.width = 'max-content' // let rounds attain natural width
    const vrc = get_visible_rounds_count(shell, get_option)
    const new_width = ((100 / vrc) * rounds.length) + '%'
    const new_marginleft = -(base_index.get() * (100 / vrc)) + '%'
    shell.matches_vertical_scroller.style.width = new_width
    shell.matches_vertical_scroller.style.marginLeft = new_marginleft
    shell.round_titles_wrapper.style.width = new_width
    shell.round_titles_wrapper.style.marginLeft = new_marginleft



// adjust scroll position to keep the same matches in the middle

    scrolla.adjust_offset(scrollY_middle_ratio)

    update_buttons(shell, base_index.get(), get_option)
}


const create_base_index = (shell, get_option) => {
    let value = 0

    const set = (i) => {
        value = within_range(
            i,
            0,
            get_max_base_index(shell, get_option)
        )
    }

    return {
        set,
        try_decrement: () => set(value - 1),
        try_increment: () => set(value + 1),
        get: () => value
    }
}


export const create_navigation = (root_id, shell, get_option, scrolla) => {
    const base_index = create_base_index(shell, get_option)

    const repaint = () => update(base_index, get_option, shell, scrolla)
    repaint()

    const content_resize_observer = observe_resize_later(shell.content_area, repaint)



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

    
    const repaint_on_image_load = debounce((e) => {
        // listen to any user images (without explicit style.width and height) loaded within content-area and repaint (not too often)
        if (
            e.path
            && e.path[0]?.closest(`#${root_id} .content-area`)
            && e.path[0] instanceof HTMLImageElement
            && (e.path[0]?.style.width === '' || e.path[0]?.style.height === '')
        ) {
            repaint()
        }
    }, 300)
    document.addEventListener('load', repaint_on_image_load, true)


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

            if (Object.keys(shell).length) {
                const base_index_value = base_index.get()
                lastRoundIsFullyVisible = is_last_round_fully_visible(shell, base_index_value, get_option)
                allRoundsAreVisible = base_index_value === 0 && lastRoundIsFullyVisible
                baseRoundIndex = base_index_value
            }

            return { lastRoundIsFullyVisible, allRoundsAreVisible, baseRoundIndex }
        },

        uninstall: () => {
            document.removeEventListener('load', repaint_on_image_load, true)
            content_resize_observer.disconnect()
        }

    }

}