import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'

export const draw_connecting_lines = ({
    type,
    later_connection_point,
    upper_parent,
    lower_parent,
    parent_to_highlight,
    options,
    ctx
}) => {
    const parents_right_X = later_connection_point[0] - options.distance_between_rounds
    let current_coords = [...later_connection_point]

// draw first part of bended- lines
    if (type === 'bended-2') {
        current_coords = [
            parents_right_X,
            upper_parent.center_Y + (lower_parent.center_Y - upper_parent.center_Y) / 2
        ]
    }
    if (type === 'bended-1') {
        current_coords = [
            current_coords[0] - options.distance_between_rounds/2 - options.connection_lines_width,
            upper_parent.center_Y + (lower_parent.center_Y - upper_parent.center_Y) / 2
        ]
    }
    ctx.lineTo(...current_coords)

    const draw_line_to = parent => {
        draw_connection_to_parent_match(
            [parents_right_X, parent.center_Y],
            current_coords,
            options,
            ctx
        )
        ctx.lineTo(parents_right_X - 10, parent.center_Y)
    }

// draw regular lines
    if (parent_to_highlight === null) {
        // uninterrupted line must be drawn to FARTHEST parent to avoid bad angles
        const upper_parent_is_farthest = Math.abs(later_connection_point[1] - upper_parent.center_Y) > Math.abs(later_connection_point[1] - lower_parent.center_Y)
        const closest_parent = upper_parent_is_farthest ? lower_parent : upper_parent
        const farthest_parent = upper_parent_is_farthest ? upper_parent : lower_parent
        draw_line_to(farthest_parent)
        ctx.moveTo(...current_coords)
        draw_line_to(closest_parent)
    } else {
// draw single highlighted line
        draw_line_to(parent_to_highlight)
    }
}