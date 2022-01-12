import { draw_scores } from './draw_scores.mjs'

export const try_expand_match_if_hovered = (match, round, state, canvas_el, options) => {
    if (
        !options.show_scores_only_on_hover
        || state.hovered_match_id !== match.id
    ) return

    const ctx = canvas_el.getContext('2d')
    // ctx.globalAlpha = state.hovered_match_opacity
// draw expanded bg
    const collapsed_round_right_X = round.left_X + round.width
    const score_actual_width = (options.score_font_size + options.score_hor_margin * 2)
        * Math.max(...match.sides.map(s => s.score.length))
    const expanded_width = round.width + options.scores_left_margin + score_actual_width
    ctx.fillStyle = options.background_color
    ctx.fillRect(collapsed_round_right_X,
        match.center_Y - options.vert_gap_between_opponents / 2 - options.team_title_font_size * 1.4,
        options.scores_left_margin + score_actual_width,
        options.vert_gap_between_opponents + options.team_title_font_size * 2.8);

// draw expanded border
    ctx.strokeStyle = options.hovered_match_border_color || options.connection_lines_color
    ctx.strokeRect(round.left_X,
        match.center_Y - options.vert_gap_between_opponents / 2 - options.team_title_font_size * 1.4,
        expanded_width,
        options.vert_gap_between_opponents + options.team_title_font_size * 2.8)
    draw_scores(
        ctx,
        match,
        collapsed_round_right_X - options.match_padding_right + options.scores_left_margin,
        options,
        state.hovered_match_opacity
    )

// draw expanded part of the axis line
    ctx.beginPath()
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color
    ctx.moveTo(collapsed_round_right_X, match.center_Y)
    ctx.lineTo(round.left_X + expanded_width, match.center_Y)
    ctx.stroke()

    // ctx.globalAlpha = 1

}

// export const draw_hovered_match = (all_data, state, canvas_el, options) => {
//     if (!options.show_scores_only_on_hover) return
//     all_data.rounds.forEach((r) => {
//         r.matches.forEach(m => {
//             if (m.id === state.hovered_match_id) {
//                 expand_this_match(m, r, state, canvas_el, options)
//             }
//         })
//     })
// }