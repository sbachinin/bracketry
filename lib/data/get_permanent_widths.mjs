import {
    SCORES_MARGIN_LEFT_RATIO,
    NATIONALITY_MARGIN_LEFT_RATIO,
    TEAM_TITLE_MARGIN_LEFT_RATIO,
    MATCH_PADDING_LEFT,
    FLAG_WIDTH_RATIO,
    CURVE_LINE_OFFSET
} from '../constants.mjs'
import { get_main_canvas } from '../utils/utils.mjs'

export const get_permanent_widths = (all_data, options) => {
    const ctx = get_main_canvas().getContext('2d')
    ctx.save();

    ctx.font = `${options.match_font_size}px ${options.team_title_font_family}`

    let longest_score_length = 0
    all_data.rounds.forEach(round => {
        round.matches.forEach(match => {
            longest_score_length = Math.max(
                longest_score_length,
                match.sides[0].score.length,
                match.sides[1].score.length,
            )
        })
    })

    let widest_team_title_width = 0
    let widest_entry_status_width = 0
    let have_nationalities = false
    Object.values(all_data.teams).forEach(team_meta => {
        widest_team_title_width = Math.max(
            widest_team_title_width,
            ctx.measureText(team_meta.title).width,
        )
        widest_entry_status_width = Math.max(
            widest_entry_status_width,
            team_meta.entry_status ? ctx.measureText(team_meta.entry_status).width : 0
        )
        if (team_meta.nationality_code) {
            have_nationalities = true
        }
    })

    ctx.restore();

    const scores_width = options.single_score_width * longest_score_length

    const nationality_width = have_nationalities ? options.match_font_size * FLAG_WIDTH_RATIO : 0

    const round_width = MATCH_PADDING_LEFT
        + widest_entry_status_width
        + options.match_font_size * NATIONALITY_MARGIN_LEFT_RATIO
        + nationality_width
        + options.match_font_size * TEAM_TITLE_MARGIN_LEFT_RATIO
        + widest_team_title_width
        + options.match_font_size * SCORES_MARGIN_LEFT_RATIO
        + scores_width
        + options.single_score_width/1.6 // a right padding in case of long tiebreaks etc
        + (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET/3 : 0)
    
    return {
        team_title_width: widest_team_title_width,
        scores_width,
        entry_status_width: widest_entry_status_width,
        nationality_width,
        round_width: round_width
    }
}