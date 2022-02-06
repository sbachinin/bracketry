import { draw_seed } from './draw_seed.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'
import { draw_scores } from './draw_scores.mjs'
import { get_match_center_scroll_Y, is_match_visible_Y } from '../utils/sizes.mjs'

export const get_expanded_match_props = (round, match, state, options) => {
    const center_scroll_Y = get_match_center_scroll_Y(round, state.scroll_Y, match.index, options)
    const should_draw_seed = !!match.sides.find(s => s.seed_text !== undefined)
    const seed_actual_width = (should_draw_seed ? options.seed_width : 0)
    const title_actual_width = Math.max(
        ...match.sides.map(s => s.short_title_width))
    const scores_actual_width = (options.score_font_size + options.score_hor_margin * 2)
        * Math.max(...match.sides.map(s => s.score.length))
    const expanded_width = options.match_padding_left
        + seed_actual_width
        + title_actual_width
        + options.scores_left_margin
        + scores_actual_width
        + options.match_padding_right

    const expanded_left_X = round.left_X - seed_actual_width - Math.floor(state.scroll_X)

    const seed_left_X = expanded_left_X + options.match_padding_left
    const team_title_left_X = seed_left_X + seed_actual_width

    const scores_left_X = team_title_left_X + title_actual_width + options.scores_left_margin
    const top_Y = center_scroll_Y - options.vert_gap_between_opponents / 2 - options.team_title_font_size * 1.4
    const match_height = options.vert_gap_between_opponents + options.team_title_font_size * 2.8

    return {
        center_scroll_Y,
        seed_left_X,
        team_title_left_X,
        scores_left_X,
        expanded_width,
        expanded_left_X,
        top_Y,
        match_height,
    }
}

export const draw_expanded_match = ({ match, round, state, ctx, options }) => {
    // if (round.left_X > state.scroll_X + ctx.canvas.width) return

    const {
        center_scroll_Y,
        seed_left_X,
        team_title_left_X,
        scores_left_X,
        expanded_width,
        expanded_left_X,
        top_Y,
        match_height
    } = get_expanded_match_props(round, match, state, options)

    if (!is_match_visible_Y(center_scroll_Y, ctx.canvas.height, options)) return

    const match_with_Y = { ...match, center_scroll_Y }

    ctx.textBaseline = 'middle'
    
    if (match.id === state.expanded_match?.id) {
        ctx.globalAlpha = state.expanded_match_opacity
    }
    if (match.id === state.previous_expanded_match?.id) {
        ctx.globalAlpha = 1 - state.expanded_match_opacity
    }
    
// draw expanded bg
    ctx.fillStyle = options.expanded_match_background_color || options.background_color
    ctx.fillRect(expanded_left_X, top_Y, expanded_width, match_height);
    

// draw expanded border
    ctx.strokeStyle = options.expanded_match_border_color || options.connection_lines_color
    
    if (match.sides.find(s => s.id === state.highlighted_team_id)) {
        ctx.strokeStyle = options.highlighted_connection_lines_color
        ctx.lineWidth = options.highlighted_connection_lines_width
    }

    ctx.strokeRect(expanded_left_X, top_Y, expanded_width, match_height)

//
    if (match.sides.find(s => s.seed_text !== undefined)) {
        draw_seed({
            match: match_with_Y,
            x: seed_left_X,
            options, ctx
        }) }

//
    draw_teams_titles({
        match: match_with_Y,
        x: team_title_left_X,
        is_expanded: true,
        options,
        ctx,
    })

//
    draw_scores({
        match: match_with_Y,
        x: scores_left_X,
        options,
        ctx
     })

    ctx.globalAlpha = 1
}
