import { debounce, create_unique_id } from './utils/utils.mjs'
import { createCanvas } from './utils/createCanvas.mjs'
import { drawAll } from './utils/draw_all.mjs'
import { create_horizontal_scroll_buttons } from './horizontal_scroll_buttons/create_horizontal_scroll_buttons.mjs'
import { installMouseEvents } from './utils/install_mouse_events.mjs'
import * as sizes from './utils/sizes.mjs'
import { animate_with_ease } from './animate-with-easing.mjs'

// if element gets WIDER on resize, right gap may appear
// This free space may be used to scroll back to show more rounds on the left
const try_adjust_scrollX_on_resize = (scrollX, roundsCount, root_container_width) => {
    const maximum_visible_width = (roundsCount * sizes.ROUND_WIDTH) + scrollX
    const right_gap_width = root_container_width - maximum_visible_width
    if (right_gap_width <= 0) return scrollX
    return Math.min(0, scrollX + right_gap_width)
}

const easingFunctions = {
    // no easing, no acceleration
    linear: t => t,
    // accelerating from zero velocity
    easeInQuad: t => t*t,
    // decelerating to zero velocity
    easeOutQuad: t => t*(2-t),
    // acceleration until halfway, then deceleration
    easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
    // accelerating from zero velocity 
    easeInCubic: t => t*t*t,
    // decelerating to zero velocity 
    easeOutCubic: t => (--t)*t*t+1,
    // acceleration until halfway, then deceleration 
    easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
    // accelerating from zero velocity 
    easeInQuart: t => t*t*t*t,
    // decelerating to zero velocity 
    easeOutQuart: t => 1-(--t)*t*t*t,
    // acceleration until halfway, then deceleration
    easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
    // accelerating from zero velocity
    easeInQuint: t => t*t*t*t*t,
    // decelerating to zero velocity
    easeOutQuint: t => 1+(--t)*t*t*t*t,
    // acceleration until halfway, then deceleration 
    easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
  }

const animate_with_easing = (redraw, total_duration = 300) => {
    let value = 0.00001
    const make_animation_step = () => {
        value = easingFunctions.easeOutCubic(value)
        if (value > 0.99) value = 1 // because it may freeze at smth like 9.9999999... (in case of very small initial value)
        redraw(value)
        value < 1 && requestAnimationFrame(make_animation_step)
    }
    requestAnimationFrame(make_animation_step)
}

export const createBrackets = (allData, rootContainer, options) => {
    const root_id = create_unique_id()
    const root_bracket_container = document.createElement('div')
    root_bracket_container.className = root_id + ' root_bracket_container'
    root_bracket_container.style.overflow = 'hidden'
    root_bracket_container.style.width = '100%'
    root_bracket_container.style.height = '100%'
    root_bracket_container.style.position = 'relative'

    rootContainer.append(root_bracket_container)

    const state = {
        scrollY: 0,
        scrollX: 0
    }

    const canvasEl = createCanvas(root_bracket_container, options)

    const change_round_index = new_leftmost_round_index => {
        const width_deficit = allData.rounds.length * sizes.ROUND_WIDTH - canvasEl.width
        const initial_scrollX = state.scrollX
        const destination_scrollX = -Math.min(width_deficit, new_leftmost_round_index * sizes.ROUND_WIDTH)
        const distance = destination_scrollX - initial_scrollX

        // animate_with_easing(easing_value => {
        //     state.scrollX = initial_scrollX + (distance * easing_value)
        //     console.log(state.scrollX)
        //     drawAll(allData, state, canvasEl)
        // })

        animate_with_ease(
            initial_scrollX,
            destination_scrollX,
            easing_value => {
                state.scrollX = initial_scrollX + easing_value
                console.log(easing_value)
                drawAll(allData, state, canvasEl)
            }
        )
    }

    const { update_buttons_on_resize } = create_horizontal_scroll_buttons(
        root_bracket_container,
        options,
        allData.rounds.length,
        state,
        change_round_index,
        root_id
    )

    new ResizeObserver(
        debounce(resizeEntry => {
            const root_container_width = resizeEntry[0].contentRect.width
            const root_container_height = resizeEntry[0].contentRect.height

            canvasEl.width = root_container_width
            canvasEl.height = root_container_height
            
            state.scrollX = try_adjust_scrollX_on_resize(
                state.scrollX,
                allData.rounds.length,
                root_container_width)
            
            drawAll(allData, state, canvasEl)
            
            update_buttons_on_resize()
        })
    ).observe(rootContainer)

    drawAll(allData, state, canvasEl)

    installMouseEvents(allData, options, state, drawAll, canvasEl)
}
