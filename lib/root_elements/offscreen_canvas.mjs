import { draw_static_rounds } from '../draw/draw_static_rounds.mjs'

export const create_offscreen_canvas = () => {
    const el = document.createElement('canvas')

    const draw = (all_data, options) => {
        el.width = all_data.all_content_width
        el.height = options.matches_padding_top + options.matches_padding_bottom + options.min_height_per_match * all_data.rounds[0].matches.length
        draw_static_rounds(el, all_data, options)
    }

    return {
        el,
        draw
    }
}

