import { draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'
import { draw_scores } from './draw_scores.mjs'

const get_expanded_match_props = (match, state, canvas_el, options) => {
    const ctx = canvas_el.getContext('2d')
    
    const should_draw_seed = !!match.sides.find(s => s.seed_text !== undefined)
    const seed_actual_width = (should_draw_seed ? options.seed_width : 0)
    const title_actual_width = Math.max(...match.sides.map(s => ctx.measureText(s.title_to_display).width))
    const scores_actual_width = (options.score_font_size + options.score_hor_margin * 2)
    * Math.max(...match.sides.map(s => s.score.length))
    const expanded_width = options.match_padding_left
        + seed_actual_width
        + title_actual_width
        + options.scores_left_margin
        + scores_actual_width
        + options.match_padding_right

    let expanded_left_X = match.collapsed_left_X - seed_actual_width - state.scroll_X
    if (expanded_left_X + expanded_width > canvas_el.width) {
        expanded_left_X = canvas_el.width - expanded_width - 10
    }

    const seed_left_X = expanded_left_X + options.match_padding_left
    const team_title_left_X = seed_left_X + seed_actual_width

    const scores_left_X = team_title_left_X + title_actual_width + options.scores_left_margin
    const top_Y = match.center_Y - options.vert_gap_between_opponents / 2 - options.team_title_font_size * 1.4
    const match_height = options.vert_gap_between_opponents + options.team_title_font_size * 2.8

    return {
        seed_left_X,
        team_title_left_X,
        scores_left_X,
        expanded_width,
        expanded_left_X,
        top_Y,
        match_height,
    }
}

export const maybe_draw_expanded_match = (match, state, canvas_el, options) => {
    if (!match) return

    const {
        seed_left_X,
        team_title_left_X,
        scores_left_X,
        expanded_width,
        expanded_left_X,
        top_Y,
        match_height
    } = get_expanded_match_props(match, state, canvas_el, options)

    const ctx = canvas_el.getContext('2d')
    // ctx.globalAlpha = state.hovered_match_opacity

// draw expanded bg
    ctx.fillStyle = options.background_color
    ctx.fillRect(expanded_left_X, top_Y, expanded_width, match_height);

// draw expanded border
    ctx.strokeStyle = options.hovered_match_border_color || options.connection_lines_color
    ctx.strokeRect(expanded_left_X, top_Y, expanded_width, match_height)

//
    if (match.sides.find(s => s.seed_text !== undefined)) {
        draw_seed(match.sides, seed_left_X, match.center_Y, options, ctx) }

//
    draw_teams_titles(match.sides, team_title_left_X, match.center_Y, options, ctx)

//
    draw_scores(ctx, match, scores_left_X, options)

// draw expanded part of the axis line
    ctx.beginPath()
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeStyle = options.connection_lines_color
    ctx.moveTo(expanded_left_X, match.center_Y)
    ctx.lineTo(expanded_left_X + expanded_width, match.center_Y)
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