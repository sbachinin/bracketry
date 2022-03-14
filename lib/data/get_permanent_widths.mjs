import {
    visibility_options,
    TEAM_TITLE_LEFT_MARGIN,
    SCORES_LEFT_MARGIN,
    MATCH_PADDING_LEFT,
    MATCH_PADDING_RIGHT,
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
                ctx.measureText(match.sides[0].short_title).width,
                ctx.measureText(match.sides[1].short_title).width
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
    const team_title_width = Math.min(
        parseInt(options.team_title_max_width),
        widest_team_title_width
    )

    const scores_width = (options.match_font_size + options.score_hor_margin*2) * longest_score_length

    const is_match_reduced = options.reduce_match_until_clicked || options.reduce_match_until_hovered
    const round_width = MATCH_PADDING_LEFT
        + (options.entry_status_visibility === visibility_options.ALL_ROUNDS && !is_match_reduced ? widest_entry_status_width : 0)
        + (options.nationalities_visibility === visibility_options.ALL_ROUNDS && !is_match_reduced ? options.match_font_size*2 : 0)
        + TEAM_TITLE_LEFT_MARGIN
        + team_title_width
        + (is_match_reduced ? 0 : scores_width + SCORES_LEFT_MARGIN)
        + MATCH_PADDING_RIGHT
    let first_round_width = round_width
    if (options.entry_status_visibility === visibility_options.FIRST_ROUND && !is_match_reduced) {
        first_round_width += widest_entry_status_width
    }
    if (options.nationalities_visibility === visibility_options.FIRST_ROUND && !is_match_reduced) {
        first_round_width += options.match_font_size*2
    }

    return {
        team_title_width: Math.floor(team_title_width),
        scores_width,
        widest_entry_status_width,
        round_width: Math.floor(round_width),
        first_round_width: Math.floor(first_round_width)
    }
}