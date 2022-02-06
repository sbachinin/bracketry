import { animate_with_easing } from '../utils/animate_with_easing.mjs'

export const animate_expanded_match = update_state => {
    animate_with_easing({
        type: 'fade_expanded_match',
        handle_new_value: easing_value => {
            const update = { expanded_match_opacity: easing_value }
            if (easing_value === 1) update.previous_expanded_match = null
            update_state(update)
        },
        duration: 200
    })
}