import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'
import { draw_scores } from './draw_scores.mjs'
import { get_round_left_X } from './sizes.mjs'

export const draw_matches_for_round = (round_index, all_rounds, ctx, options) => {
    ctx.font = options.team_title_font_size + 'px sans-serif'

    all_rounds[round_index].matches.forEach((match_data, match_index) => {
        const { center_Y, teams } = match_data

        const left_X = get_round_left_X(options, round_index) + state.scrollX,

        const first_team_title = teams[0].players[0].shortName
        const second_team_title = teams[1].players[0].shortName

        ctx.fillStyle = 'black'
        ctx.textBaseline = 'middle';

        // DRAW TEAMS NAMES
        ctx.fillText(
            first_team_title,
            left_X + options.match_padding_left,
            center_Y - options.vert_gap_between_opponents/2 - options.team_title_font_size/2 + 2)
        ctx.fillText(
            second_team_title,
            left_X + options.match_padding_left,
            center_Y + options.vert_gap_between_opponents/2 + options.team_title_font_size/2 + 2)
        

        draw_scores(ctx, match_data, left_X, options)

        ctx.beginPath();
        
        ctx.lineWidth = options.connection_lines_width
        ctx.strokeStyle = options.connection_lines_color;
        
        ctx.moveTo(left_X + options.match_width, center_Y);

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