import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'
import { draw_scores } from './draw_scores.mjs'
import * as constants from './constants.mjs'

export const drawMatchesForRound = (roundIndex, allRounds, ctx, options) => {
    allRounds[roundIndex].matchesToDraw.forEach((matchData, matchIndex) => {
        // ctx.fillRect(
        //     matchData.positionX + constants.MATCH_HOR_MARGIN,
        //     matchData.match_body_Y,
        //     matchData.match_body_width,
        //     matchData.match_body_height)
        
        ctx.fillStyle = 'black'

        // DRAW TEAMS NAMES
        ctx.fillText(
            matchData.first_team_title,
            matchData.positionX + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            matchData.centerY - matchData.match_body_height / 10)
        ctx.fillText(
            matchData.second_team_title,
            matchData.positionX + constants.MATCH_HOR_MARGIN + constants.MATCH_HOR_PADDING,
            matchData.centerY + constants.FONT_SIZE + matchData.match_body_height / 10)
        

        draw_scores(ctx, matchData)

        ctx.beginPath();
        
        ctx.lineWidth = options.connection_lines_width
        ctx.strokeStyle = options.connection_lines_color;
        
        ctx.moveTo(
            matchData.positionX + constants.ROUND_WIDTH - constants.MATCH_HOR_MARGIN,
            matchData.centerY
        );

        let connectionPoint = [
            matchData.positionX + constants.MATCH_HOR_MARGIN,
            matchData.centerY
        ]
        ctx.lineTo(...connectionPoint)
        
        if (roundIndex > 0) {
            
            const get_earlier_connection_point = parent_match_index => {
                const previous_round_matches = allRounds[roundIndex - 1].matchesToDraw
                return [
                    matchData.positionX - constants.MATCH_HOR_MARGIN,
                    previous_round_matches[matchIndex * 2 + parent_match_index].centerY
                ]
            }

            const upper_parent_connection_point = get_earlier_connection_point(0)
            const lower_parent_connection_point = get_earlier_connection_point(1)
           
            if (options.connection_lines_type.includes('bended')) {
                connectionPoint = [
                    connectionPoint[0] - constants.MATCH_HOR_MARGIN,
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