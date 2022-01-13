import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'

export const draw_connecting_lines = (
    previous_round_matches,
    match_index,
    right_connection_point,
    options,
    ctx
) => {
    let current_coords = [...right_connection_point]

    const parents_right_X = current_coords[0] - options.distance_between_rounds

    const upper_parent_connection_point = [
        parents_right_X,
        previous_round_matches[match_index*2].center_Y
    ]
    const lower_parent_connection_point = [
        parents_right_X,
        previous_round_matches[match_index*2 + 1].center_Y
    ]
        
    if (options.connection_lines_type.includes('bended')) {
        current_coords = [
            current_coords[0] - options.distance_between_rounds/2 - options.connection_lines_width,
            upper_parent_connection_point[1] + (lower_parent_connection_point[1] - upper_parent_connection_point[1]) / 2
        ]
        ctx.lineTo(...current_coords)
    }

    draw_connection_to_parent_match(
        upper_parent_connection_point,
        current_coords,
        options,
        ctx
    )
    ctx.moveTo(...current_coords);
    draw_connection_to_parent_match(
        lower_parent_connection_point,
        current_coords,
        options,
        ctx)
}