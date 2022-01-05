import {
    measure_round_heights,
    get_round_left_X,
    get_single_player_scores_width,
    get_round_width
} from './sizes.mjs'

const get_default_round_title = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const extract_basic_drawing_attrs = (rounds, options, canvas_el) => {
    const ctx = canvas_el.getContext('2d')
    ctx.save();

    let widest_team_title_width = 0
    let widest_team_score_width = 0
    rounds.forEach(round => {
        round.matches.forEach(match => {
            ctx.font = `${options.team_title_font_size}px ${options.team_title_font_family}`
            widest_team_title_width = Math.max(
                widest_team_title_width,
                ctx.measureText(match.sides[0].title).width,
                ctx.measureText(match.sides[1].title).width
            )
            ctx.font = `bold ${options.score_size}px ${options.score_font_family}`;
            widest_team_score_width = Math.max(
                widest_team_score_width,
                get_single_player_scores_width(match.sides[0].score, options, ctx),
                get_single_player_scores_width(match.sides[1].score, options, ctx),
            )
        })
    })

    ctx.restore();
    
    const round_width = get_round_width(widest_team_title_width, widest_team_score_width, options)

    return {
        widest_team_title_width,
        widest_team_score_width,
        round_width,
        rounds_drawing_attrs: rounds.map(
            (round, round_index) => {
                return {
                    title: round.name || get_default_round_title(rounds.length, round_index),
                    ...measure_round_heights(
                        round.matches.length,
                        options,
                        canvas_el.height
                    ),
                    left_X: get_round_left_X(options, round_index, round_width)
                }
            }
        )
    }
}