import { get_round_title_left_X, get_round_title_height } from '../utils/sizes.mjs'

export const maybe_draw_round_titles = (all_data, state, options, round_titles_canvas_el) => {
    if (options.hide_round_titles) return

    const ctx = round_titles_canvas_el.getContext('2d')
// hide matches under rounds titles
    ctx.fillStyle = options.background_color;
    ctx.fillRect(
        0,
        0,
        round_titles_canvas_el.width,
        get_round_title_height(options)
    );

// draw rounds titles
    ctx.font = `${options.round_title_font_size}px ${options.round_title_font_family}`
    ctx.textBaseline = 'top'
    ctx.fillStyle = options.round_title_color

    ctx.textAlign = options.round_title_text_align
    
    all_data.rounds.forEach((_, round_index) => {
        const round = all_data.rounds[round_index]
        const round_scroll_left_X = round.left_X - Math.floor(state.scroll_X)
        ctx.fillText(
            round.title,
            get_round_title_left_X(round_scroll_left_X, round.width, options),
            options.round_titles_padding_top
        )
    })
}