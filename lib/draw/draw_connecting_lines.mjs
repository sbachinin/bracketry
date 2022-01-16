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

    const upper_parent = previous_round_matches[match_index*2]
    const lower_parent = previous_round_matches[match_index*2 + 1]
        
    if (options.connection_lines_type === 'bended-2') {
        current_coords = [
            parents_right_X,
            upper_parent.center_Y + (lower_parent.center_Y - upper_parent.center_Y) / 2
        ]
    }

    if (options.connection_lines_type === 'bended-1') {
        current_coords = [
            current_coords[0] - options.distance_between_rounds/2 - options.connection_lines_width,
            upper_parent.center_Y + (lower_parent.center_Y - upper_parent.center_Y) / 2
        ]
    }

    ctx.lineTo(...current_coords)

    draw_connection_to_parent_match(
        [parents_right_X, upper_parent.center_Y],
        current_coords,
        options,
        ctx
    )
    ctx.moveTo(...current_coords);
    draw_connection_to_parent_match(
        [parents_right_X, lower_parent.center_Y],
        current_coords,
        options,
        ctx)
}