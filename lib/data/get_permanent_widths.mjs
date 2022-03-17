import {
    TEAM_TITLE_LEFT_MARGIN,
    SCORES_LEFT_MARGIN,
    MATCH_PADDING_LEFT,
    MATCH_PADDING_RIGHT,
    FLAG_WIDTH_FACTOR
} from '../constants.mjs'

let longest_score_length = 0

export const get_permanent_widths = (rounds, options, ctx) => {
    ctx.save();

    let widest_team_title_width = 0
    let widest_entry_status_width = 0
    rounds.forEach(round => {
        round.matches.forEach(match => {
            ctx.font = `${options.match_font_size}px ${options.team_title_font_family}`
            widest_team_title_width = Math.max(
                widest_team_title_width,
                ctx.measureText(match.sides[0].title).width,
                ctx.measureText(match.sides[1].title).width
            )
            longest_score_length = Math.max(
                longest_score_length,
                match.sides[0].score.length,
                match.sides[1].score.length,
            )
            widest_entry_status_width = Math.max(
                widest_entry_status_width,
                match.sides[0].entry_status ? ctx.measureText(match.sides[0].entry_status).width : 0,
                match.sides[1].entry_status ? ctx.measureText(match.sides[1].entry_status).width : 0
            )
        })
    })

    ctx.restore();

    const scores_width = (options.match_font_size + options.score_hor_margin*2) * longest_score_length

    const round_width = MATCH_PADDING_LEFT
        + widest_entry_status_width
        + options.match_font_size * FLAG_WIDTH_FACTOR // width of nationality/flag
        + TEAM_TITLE_LEFT_MARGIN
        + widest_team_title_width
        + SCORES_LEFT_MARGIN
        + scores_width
        + MATCH_PADDING_RIGHT
    
    return {
        team_title_width: widest_team_title_width,
        scores_width,
        entry_status_width: widest_entry_status_width,
        round_width: round_width
    }
}