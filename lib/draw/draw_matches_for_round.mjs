import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'
import { draw_scores } from './draw_scores.mjs'
import { should_draw_seed, draw_seed } from './draw_seed.mjs'
import { get_round_title_height } from '../utils/sizes.mjs'

const adjust_font = (options, isHighlighted) => {
    return `${
        (options.winner_is_highlighted && isHighlighted) ? 'bold': ''
    } ${
        options.team_title_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const draw_matches_for_round = (
    round_index,
    all_data,
    canvas_el,
    options,
    state,
) => {
    all_data.rounds[round_index].matches.forEach((match_data, match_index) => {
        const { center_Y, sides } = match_data
        const match_is_hovered = state.hovered_match_id === match_data.id
        // match is invisible in this scrollY position
        if (center_Y < get_round_title_height(options) || center_Y > canvas_el.height) return
        
        const ctx = canvas_el.getContext('2d')
        ctx.textBaseline = 'middle'
        
        const round_left_X = all_data.rounds[round_index].left_X - state.scroll_X
        const round_width = all_data[round_index === 0 ? 'first_round_width' : 'round_width']
        let round_right_X = round_left_X + round_width
        let current_X = round_left_X + options.match_padding_left
        
        const texts_offset = options.vert_gap_between_opponents/2 + options.team_title_font_size/2

        if (should_draw_seed(round_index, options.draw_seed)) {
            draw_seed(sides, options, current_X, center_Y, ctx)
            current_X += options.seed_width
        }

        // DRAW TEAMS NAMES
        ctx.textAlign = 'left'
        ctx.fillStyle = options.team_title_text_color
        ctx.font = adjust_font(options, sides[0].isWinner)
        ctx.fillText(
            sides?.[0]?.title_to_display,
            current_X,
            center_Y - texts_offset + 2)
        ctx.font = adjust_font(options, sides[1].isWinner)
        ctx.fillText(
            sides?.[1]?.title_to_display,
            current_X,
            center_Y + texts_offset + 2)

        current_X += all_data.team_title_width + options.scores_left_margin
        if (!options.show_scores_only_on_hover) {
            draw_scores(ctx, match_data, current_X, options)
        }






// draw expanded stuff
        if (options.show_scores_only_on_hover && match_is_hovered) {
            ctx.globalAlpha = state.hovered_match_opacity
    // draw expanded bg
            const score_actual_width = (options.score_font_size + options.score_hor_margin*2)
                * Math.max(...match_data.sides.map(s => s.score.length))
            const expanded_width = round_width + options.scores_left_margin + score_actual_width
            ctx.fillStyle = options.background_color
            ctx.fillRect(round_right_X,
                center_Y - options.vert_gap_between_opponents/2 - options.team_title_font_size*1.4,
                options.scores_left_margin + score_actual_width,
                options.vert_gap_between_opponents + options.team_title_font_size*2.8);
    
    // draw expanded border
            ctx.strokeStyle = options.hovered_match_border_color || options.connection_lines_color
            ctx.strokeRect(round_left_X,
                center_Y - options.vert_gap_between_opponents/2 - options.team_title_font_size*1.4,
                expanded_width,
                options.vert_gap_between_opponents + options.team_title_font_size*2.8)
            draw_scores(ctx, match_data, current_X, options, state.hovered_match_opacity)
            
    // draw expanded part of the axis line
            ctx.beginPath()
            ctx.lineWidth = options.connection_lines_width
            ctx.strokeStyle = options.connection_lines_color
            ctx.moveTo(round_right_X, center_Y)
            ctx.lineTo(round_left_X + expanded_width, center_Y)
            ctx.stroke()
            
            ctx.globalAlpha = 1
        }







// draw 'axis' of the match
        ctx.beginPath()
        ctx.lineWidth = options.connection_lines_width
        ctx.strokeStyle = options.connection_lines_color
        ctx.moveTo(round_right_X, center_Y)
        let connection_point = [round_left_X, center_Y]
        ctx.lineTo(...connection_point)

// draw connection lines
        if (round_index > 0) {

            const get_earlier_connection_point = parent_match_index => {
                const previous_round_matches = all_data.rounds[round_index - 1].matches
                return [
                    round_left_X - options.distance_between_rounds,
                    previous_round_matches[match_index*2 + parent_match_index].center_Y
                ]
            }

            const upper_parent_connection_point = get_earlier_connection_point(0)
            const lower_parent_connection_point = get_earlier_connection_point(1)

            if (options.connection_lines_type.includes('bended')) {
                connection_point = [
                    connection_point[0] - options.distance_between_rounds/2 - options.connection_lines_width,
                    upper_parent_connection_point[1] + (lower_parent_connection_point[1] - upper_parent_connection_point[1]) / 2
                ]
                ctx.lineTo(...connection_point)
            }

            draw_connection_to_parent_match(
                upper_parent_connection_point,
                connection_point,
                options,
                ctx
            )
            ctx.moveTo(...connection_point);
            draw_connection_to_parent_match(
                lower_parent_connection_point,
                connection_point,
                options,
                ctx)
        }

        ctx.stroke();
    })
}