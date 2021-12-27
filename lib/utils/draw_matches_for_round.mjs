import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'
import { draw_scores } from './draw_scores.mjs'
import * as constants from './constants.mjs'

export const draw_matches_for_round = (round_index, all_rounds, ctx, options) => {
    all_rounds[round_index].matches_to_draw.forEach((match_data, match_index) => {
        // ctx.fillRect(
        //     match_data.positionX + constants.MATCH_HOR_MARGIN,
        //     match_data.match_body_Y,
        //     match_data.match_body_width,
        //     match_data.match_body_height)
        
        ctx.fillStyle = 'black'

        // DRAW TEAMS NAMES
        ctx.fillText(
            match_data.first_team_title,
            match_data.positionX + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            match_data.centerY - options.vert_gap_between_opponents / 2 - 5)
        ctx.fillText(
            match_data.second_team_title,
            match_data.positionX + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            match_data.centerY + constants.FONT_SIZE + options.vert_gap_between_opponents / 2)
        

        draw_scores(ctx, match_data, options)

        ctx.beginPath();
        
        ctx.lineWidth = options.connection_lines_width
        ctx.strokeStyle = options.connection_lines_color;
        
        ctx.moveTo(
            match_data.positionX + options.round_width - constants.MATCH_HOR_MARGIN,
            match_data.centerY
        );

        let connection_point = [
            match_data.positionX + constants.MATCH_HOR_MARGIN,
            match_data.centerY
        ]
        ctx.lineTo(...connection_point) // draw 'axis' of the match
        
        if (round_index > 0) {
            
            const get_earlier_connection_point = parent_match_index => {
                const previous_round_matches = all_rounds[round_index - 1].matches_to_draw
                return [
                    match_data.positionX - constants.MATCH_HOR_MARGIN,
                    previous_round_matches[match_index * 2 + parent_match_index].centerY
                ]
            }

            const upper_parent_connection_point = get_earlier_connection_point(0)
            const lower_parent_connection_point = get_earlier_connection_point(1)
           
            if (options.connection_lines_type.includes('bended')) {
                connection_point = [
                    connection_point[0] - constants.MATCH_HOR_MARGIN - options.connection_lines_width,
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