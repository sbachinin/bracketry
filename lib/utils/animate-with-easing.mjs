import * as constants from './constants.mjs'
import { create_unique_id } from './utils.mjs'

// functions from https://gist.github.com/gre/1650294:
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

let ongoing_animation_id = null

// this fn calls handle_new_value every frame for a given duration with numbers from 0 to (almost?) 1
// this fn stops ongoing animation before starting a new one!
export const animate_with_easing = (handle_new_value, duration) => {
    let initial_timestamp = null
    
    const this_animation_id = create_unique_id()
    ongoing_animation_id = this_animation_id

    const start = raf_timestamp => {
        initial_timestamp = raf_timestamp
        move(raf_timestamp)
    }

    const move = raf_timestamp => {
        if (ongoing_animation_id !== this_animation_id) return

        const elapsed_fraction_of_duration = (raf_timestamp - initial_timestamp) / duration
        
        if (elapsed_fraction_of_duration > 1) {
            handle_new_value(1)
            return
        }
        handle_new_value(
            easingFunctions.easeOutCubic(
                elapsed_fraction_of_duration,
            )
        )

        requestAnimationFrame(move)
    }
    
    requestAnimationFrame(start)
}
