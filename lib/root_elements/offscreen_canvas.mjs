import { draw_static_matches } from '../draw/static/all_matches.mjs'
import { get_match_body_height } from '../utils/sizes.mjs'

const get_all_matches_count = all_data => {
    return all_data.rounds.map(r => r.matches.length).reduce((a, b) => a + b, 0)
}

export const create_offscreen_canvas = () => {
    const el = document.createElement('canvas')
    const ctx = el.getContext('2d')
    let match_ids_to_center_Ys = null

    const draw_matches = (all_data, options, highlighted_team_id = '') => {
        el.width = all_data.match_width
        el.height = get_match_body_height(options) * get_all_matches_count(all_data)
        match_ids_to_center_Ys = draw_static_matches(el, all_data, options, highlighted_team_id)
    }

    return {
        el,
        draw_matches,
        get_static_match_center_Y: (match_id) => match_ids_to_center_Ys[match_id]
    }
}

