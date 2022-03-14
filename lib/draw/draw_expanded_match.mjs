import { draw_entry_status } from './entry_status.mjs'
import { draw_nationalities } from './nationalities.mjs'
import { draw_teams_titles } from './draw_teams_titles.mjs'
import { draw_scores } from './draw_scores.mjs'
import { get_match_center_scroll_Y, is_match_visible_Y } from '../utils/sizes.mjs'
import {
    TEAM_TITLE_LEFT_MARGIN,
    SCORES_LEFT_MARGIN,
    MATCH_PADDING_LEFT,
    MATCH_PADDING_RIGHT,
    VERT_GAP_BTW_OPPONENTS
} from '../constants.mjs'

export const get_expanded_match_props = (round, match, state, options) => {
    const center_scroll_Y = get_match_center_scroll_Y(round, state.scroll_Y, match.index, options)
    const entry_status_exists = !!match.sides.find(s => s.entry_status !== undefined)
    const entry_status_actual_width = (entry_status_exists ? options.entry_status_width : 0)
    const nationality_exists = !!match.sides.find(s => s.nationality_code !== undefined)
    const nationality_actual_width = (nationality_exists ? options.nationality_width : 0)
    const title_actual_width = Math.max(
        ...match.sides.map(s => s.short_title_width))
    const scores_actual_width = (options.score_font_size + options.score_hor_margin * 2)
        * Math.max(...match.sides.map(s => s.score.length))
    const expanded_width = Math.ceil(
        MATCH_PADDING_LEFT
        + entry_status_actual_width
        + nationality_actual_width
        + TEAM_TITLE_LEFT_MARGIN
        + title_actual_width
        + SCORES_LEFT_MARGIN
        + scores_actual_width
        + MATCH_PADDING_RIGHT)
    let expanded_left_X = round.left_X
        - entry_status_actual_width
        - nationality_actual_width
        - Math.floor(state.scroll_X)
    
    expanded_left_X = Math.max(10, expanded_left_X)

    let top_Y = Math.floor(-VERT_GAP_BTW_OPPONENTS / 2 - options.team_title_font_size * 1.4)
    if (options.connection_lines_width % 2 !== 0) top_Y += 0.5
    
    const match_height = Math.ceil(VERT_GAP_BTW_OPPONENTS + options.team_title_font_size * 2.8)

    return {
        center_scroll_Y,
        expanded_width,
        expanded_left_X,
        top_Y,
        match_height,
        title_actual_width
    }
}

export const draw_expanded_match = ({ match, round, state, ctx, options }) => {
    // if (round.left_X > state.scroll_X + ctx.canvas.width) return

    const {
        center_scroll_Y,
        expanded_width,
        expanded_left_X,
        top_Y,
        match_height,
        title_actual_width
    } = get_expanded_match_props(round, match, state, options)

    if (!is_match_visible_Y(center_scroll_Y, options)) return
    ctx.translate(expanded_left_X, center_scroll_Y)
    ctx.textBaseline = 'middle'
    
    if (match.id === state.expanded_match?.id) {
        ctx.globalAlpha = state.expanded_match_opacity
    }
    if (match.id === state.previous_expanded_match?.id) {
        ctx.globalAlpha = 1 - state.expanded_match_opacity
    }
    
// draw expanded bg
    ctx.fillStyle = options.expanded_match_background_color || options.background_color
    ctx.fillRect(
        (options.connection_lines_width % 2 === 0) ? 0 : 0.5, // for crisp lines
        top_Y,
        expanded_width,
        match_height
    );

// draw expanded border
    ctx.strokeStyle = options.expanded_match_border_color || options.connection_lines_color
    ctx.lineWidth = options.connection_lines_width
    ctx.strokeRect(
        (options.connection_lines_width % 2 === 0) ? 0 : 0.5, // for crisp lines
        top_Y,
        expanded_width,
        match_height
    )

//
    ctx.translate(MATCH_PADDING_LEFT, 0)
    if (match.sides.find(s => s.entry_status !== undefined)) {
        draw_entry_status({ match, options, ctx })
        ctx.translate(options.entry_status_width, 0)
    }

//
    if (match.sides.find(s => s.nationality_code !== undefined)) {
        draw_nationalities({ match, options, ctx })
        ctx.translate(options.nationality_width, 0)
    }

//
    ctx.translate(TEAM_TITLE_LEFT_MARGIN, 0)
    draw_teams_titles({ match, is_expanded: true, options, ctx })
    ctx.translate(title_actual_width + SCORES_LEFT_MARGIN, 0)

//
    draw_scores({ match, options, ctx })

    ctx.globalAlpha = 1
    ctx.setTransform(1, 0, 0, 1, 0, 0)
}
