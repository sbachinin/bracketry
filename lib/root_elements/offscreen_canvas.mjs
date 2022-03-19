import { draw_static_matches } from '../draw/draw_static_matches.mjs'
import { get_min_height_per_match } from '../utils/sizes.mjs'
export const create_offscreen_canvas = () => {
    const el = document.createElement('canvas')

    const draw_matches = (all_data, options, highlighted_team_id = '') => {
        el.width = all_data.all_content_width
        el.height = options.matches_padding_top
            + options.matches_padding_bottom
            + get_min_height_per_match(options) * all_data.rounds[0].matches.length
        
        draw_static_matches(el, all_data, options, highlighted_team_id)
    }

    return {
        el,
        draw_matches
    }
}

