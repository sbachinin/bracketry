import { draw_static_matches } from '../draw/static/all_matches.mjs'
import { get_match_body_height } from '../utils/sizes.mjs'

const get_all_matches_count = all_data => {
    return all_data.rounds.map(r => r.matches.length).reduce((a, b) => a + b, 0)
}

export const create_offscreen_canvas = () => {
    const el = document.createElement('canvas')

    const draw_matches = (all_data, options, highlighted_team_id = '') => {
        el.width = all_data.round_width
        el.height = get_match_body_height(options) * get_all_matches_count(all_data)
        
        draw_static_matches(el, all_data, options, highlighted_team_id)
    }

    document.body.append(el)

    return {
        el,
        draw_matches
    }
}

