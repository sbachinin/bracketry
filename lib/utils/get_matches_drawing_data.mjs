import { get_round_left_X, get_round_title_height } from './sizes.mjs'

export const get_matches_drawing_data = (
    round_data,
    options,
    round_index,
    state,
    canvas_el
) => {
    const all_matches_are_visible = (canvas_el.height - get_round_title_height(options))
        > round_data.matches.length * options.minimal_height_per_match

    const visible_height_per_match = (
        (canvas_el.height - get_round_title_height(options))
        / round_data.matches.length
    )
    const free_height_per_match = Math.max(
        visible_height_per_match,
        options.minimal_height_per_match
    )
    
    return round_data.matches.map(
        match_data => ({
            first_team_score: match_data.teams[0].score.map(score => score.game),
            second_team_score: match_data.teams[1].score.map(score => score.game),
            first_team_title: match_data.teams[0].players[0].shortName,
            second_team_title: match_data.teams[1].players[0].shortName,

            positionX: get_round_left_X(options, round_index) + state.scrollX,
            centerY: (
                get_round_title_height(options)
                + free_height_per_match * (match_data.order - 0.5)
                - (all_matches_are_visible ? 0 : state.scrollY)
            ),
        }))
        
}