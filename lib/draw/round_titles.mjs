import { get_round_title_height } from '../utils/sizes.mjs'

export const maybe_draw_round_titles = (all_data, options, root_elements) => {
    if (options.hide_round_titles) return

    const ctx = root_elements.round_titles_canvas_el.getContext('2d')
// hide matches under rounds titles
    ctx.fillStyle = options.background_color;
    ctx.fillRect(
        0,
        0,
        root_elements.round_titles_canvas_el.width,
        get_round_title_height(options)
    );

// draw rounds titles
    ctx.font = `${options.round_title_font_size}px ${options.round_title_font_family}`
    ctx.textBaseline = 'top'
    ctx.fillStyle = options.round_title_color

    ctx.textAlign = options.round_title_text_align
    
    all_data.rounds.forEach((_, round_index) => {
        const round = all_data.rounds[round_index]
        const width_per_round = root_elements.rounds_elements_wrapper.firstChild.clientWidth
        const round_left_X = width_per_round * round_index
        let round_title_left_X = 0

        switch (options.round_title_text_align) {
            case 'left':
                round_title_left_X = round_left_X + options.round_title_hor_margin + options.match_hor_margin
                break
            case 'center':
                round_title_left_X = round_left_X + width_per_round / 2
                break
            case 'right':
            default:
                round_title_left_X = round_left_X + width_per_round - options.round_title_hor_margin - options.match_hor_margin
        }

        ctx.fillText(
            round.title,
            round_title_left_X,
            options.round_titles_padding_top
        )
    })
}