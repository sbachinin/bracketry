import { draw_expanded_match } from './draw_expanded_match.mjs'
import { draw_lines_for_match } from './draw_lines_for_match.mjs'
import {
    get_round_scroll_Y_px,
    is_match_visible_Y,
    get_match_center_scroll_Y
} from '../utils/sizes.mjs'
import { draw_highlighted_match } from './draw_highlighted_match.mjs'

const is_round_visible_X = (round_width, round_scroll_X, options, canvas_width) => {
    return (round_scroll_X + round_width) > 0
        && (round_scroll_X - options.distance_between_rounds) < canvas_width
}


export const draw_rounds = (
    all_data,
    state,
    main_canvas_el,
    offscreen_canvas_el,
    options,
) => {
    const ctx = main_canvas_el.getContext('2d', { alpha: false })
    ctx.clearRect(0, 0, main_canvas_el.width, main_canvas_el.height)
    
    all_data.rounds.forEach((_, round_index) => {
        const reverse_index = all_data.rounds.length - 1 - round_index
        const round = all_data.rounds[reverse_index]

        const round_scroll_X = round.left_X - state.scroll_X
        const round_scroll_Y = get_round_scroll_Y_px(round, state.scroll_Y)
        
        if (!is_round_visible_X(round.width, round_scroll_X, options, main_canvas_el.width)) return
    
// draw matches without lines
        ctx.drawImage(
            offscreen_canvas_el,
            round.left_X,
            round_scroll_Y,
            round.width,
            main_canvas_el.height,
            round_scroll_X,
            0,
            round.width,
            main_canvas_el.height,
        )

        round.matches.forEach(
            (match, match_index) => {
                const center_scroll_Y = get_match_center_scroll_Y(round, state.scroll_Y, match_index, options)
                const match_with_Y = { ...match, center_scroll_Y }

// draw a highlighted version of a regular match, if necessary
                if (match.sides.find(s => s.id === state.highlighted_team_id)) {
                    draw_highlighted_match({
                        all_data,
                        round_index: reverse_index,
                        left_X: round_scroll_X,
                        match: match_with_Y,
                        highlighted_team_id: state.highlighted_team_id,
                        options,
                        ctx
                    })
                }

// draw lines
                if (is_match_visible_Y(match_with_Y.center_scroll_Y, main_canvas_el.height)) {
                    draw_lines_for_match({
                        this_round: round,
                        this_round_scroll_X: round_scroll_X,
                        previous_round: all_data.rounds[reverse_index - 1],
                        match: match_with_Y,
                        state,
                        options,
                        ctx
                    })
                }
                
// draw tooltip
                if (state.tooltip && match.id === state.tooltip?.match_id) {
                    const font_size = options.team_title_font_size
                    const longer_title = match.sides[state.tooltip.side_index].short_title
                    const title_width = ctx.measureText(longer_title).width

                    const tooltip_center_Y = state.tooltip.side_index === 0
                        ? center_scroll_Y - options.vert_gap_between_opponents / 2 - font_size * 1
                        : center_scroll_Y + options.vert_gap_between_opponents / 2 + font_size * 1
                    const tooltip_X = round_scroll_X + round.width - options.match_padding_right - all_data.scores_width - title_width - 30
                    
                    ctx.textBaseline = 'middle'
                    ctx.fillStyle = options.background_color
                    ctx.fillRect(
                        tooltip_X,
                        tooltip_center_Y - font_size * 0.75,
                        title_width + 20,
                        font_size * 1.5
                    )
                    ctx.strokeRect(
                        tooltip_X,
                        tooltip_center_Y - font_size * 0.75,
                        title_width + 20,
                        font_size * 1.5
                    )
                    ctx.fillStyle = options.team_title_text_color
                    ctx.fillText(longer_title, tooltip_X + 10, tooltip_center_Y)
                }
            }
        )
    })
// draw expanded match + previously expanded match, if transition isn't finished
    // (must be drawn after all collapsed matches to be on top of them)
    state.expanded_match && draw_expanded_match({
        match: state.expanded_match,
        round: all_data.rounds[state.expanded_match.round_index],
        state,
        main_canvas_el,
        options
    })

    state.previous_expanded_match && draw_expanded_match({
        match: state.previous_expanded_match,
        round: all_data.rounds[state.previous_expanded_match.round_index],
        state,
        main_canvas_el,
        options
    })
}