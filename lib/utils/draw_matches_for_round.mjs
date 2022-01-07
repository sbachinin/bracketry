import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'
import { draw_scores } from './draw_scores.mjs'
import { get_round_title_height } from './sizes.mjs'

const adjust_font = (options, isWinner) => {
    return `${
        (options.winner_is_highlighted && isWinner) ? 'bold': ''
    } ${
        options.team_title_font_size
    }px ${
        options.team_title_font_family
    }`
}

export const draw_matches_for_round = (
    round_index,
    all_rounds,
    canvas_el,
    options,
    scroll_X,
    { team_title_width, rounds_drawing_attrs, round_width }
) => {
    all_rounds[round_index].matches.forEach((match_data, match_index) => {
        const { center_Y, sides } = match_data

        // match is invisible in this scrollY position
        if (center_Y < get_round_title_height(options) || center_Y > canvas_el.height) return

        const left_X = rounds_drawing_attrs[round_index].left_X + scroll_X

        const ctx = canvas_el.getContext('2d')
        ctx.fillStyle = 'black'
        ctx.textBaseline = 'middle';

        // DRAW TEAMS NAMES
        ctx.font = adjust_font(options, sides[0].isWinner)
        ctx.fillText(
            sides?.[0]?.title_to_display,
            left_X + options.match_padding_left,
            center_Y - options.vert_gap_between_opponents/2 - options.team_title_font_size/2 + 2)
        ctx.font = adjust_font(options, sides[1].isWinner)
        ctx.fillText(
            sides?.[1]?.title_to_display,
            left_X + options.match_padding_left,
            center_Y + options.vert_gap_between_opponents/2 + options.team_title_font_size/2 + 2)
        
        draw_scores(
            ctx,
            match_data,
            left_X + options.match_padding_left + team_title_width + options.scores_left_margin,
            options
        )

        ctx.beginPath();
        
        ctx.lineWidth = options.connection_lines_width
        ctx.strokeStyle = options.connection_lines_color;
        
        ctx.moveTo(left_X + round_width, center_Y);

        let connection_point = [left_X, center_Y]

        ctx.lineTo(...connection_point) // draw 'axis' of the match
        
        if (round_index > 0) {
            
            const get_earlier_connection_point = parent_match_index => {
                const previous_round_matches = all_rounds[round_index - 1].matches
                return [
                    left_X - options.distance_between_rounds,
                    previous_round_matches[match_index * 2 + parent_match_index].center_Y
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