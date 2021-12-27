import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'
import { draw_scores } from './draw_scores.mjs'
import * as constants from './constants.mjs'

export const draw_matches_for_round = (roundIndex, allRounds, ctx, options) => {
    allRounds[roundIndex].matches_to_draw.forEach((match_data, matchIndex) => {
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
            match_data.centerY - match_data.match_body_height / 10)
        ctx.fillText(
            match_data.second_team_title,
            match_data.positionX + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            match_data.centerY + constants.FONT_SIZE + match_data.match_body_height / 10)
        

        draw_scores(ctx, match_data, options)

        ctx.beginPath();
        
        ctx.lineWidth = options.connection_lines_width
        ctx.strokeStyle = options.connection_lines_color;
        
        ctx.moveTo(
            match_data.positionX + options.round_width - constants.MATCH_HOR_MARGIN,
            match_data.centerY
        );

        let connectionPoint = [
            match_data.positionX + constants.MATCH_HOR_MARGIN,
            match_data.centerY
        ]
        ctx.lineTo(...connectionPoint)
        
        if (roundIndex > 0) {
            
            const get_earlier_connection_point = parent_match_index => {
                const previous_round_matches = allRounds[roundIndex - 1].matches_to_draw
                return [
                    match_data.positionX - constants.MATCH_HOR_MARGIN,
                    previous_round_matches[matchIndex * 2 + parent_match_index].centerY
                ]
            }

            const upper_parent_connection_point = get_earlier_connection_point(0)
            const lower_parent_connection_point = get_earlier_connection_point(1)
           
            if (options.connection_lines_type.includes('bended')) {
                connectionPoint = [
                    connectionPoint[0] - constants.MATCH_HOR_MARGIN - options.connection_lines_width,
                    upper_parent_connection_point[1] + (lower_parent_connection_point[1] - upper_parent_connection_point[1]) / 2
                ]
                ctx.lineTo(...connectionPoint)
            }

            draw_connection_to_parent_match(
                upper_parent_connection_point,
                connectionPoint,
                options,
                ctx
            )
            ctx.moveTo(...connectionPoint);
            draw_connection_to_parent_match(
                lower_parent_connection_point,
                connectionPoint,
                options,
                ctx)
        }

        ctx.stroke();
    })
}