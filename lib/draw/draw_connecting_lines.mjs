import { within_range } from '../utils/utils.mjs'
import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'

export const draw_connecting_lines = ({
    later_connection_point,
    upper_parent,
    lower_parent,
    options,
    ctx
}) => {
    const { connection_lines_type: type, distance_between_rounds, connection_lines_width } = options
    const parents_right_X = later_connection_point[0] - distance_between_rounds
    let current_coords = [...later_connection_point]

    const middle_Y_btw_parents = upper_parent.center_scroll_Y + (lower_parent.center_scroll_Y - upper_parent.center_scroll_Y) / 2
    const intermediate_70percent_Y = later_connection_point[1] + (middle_Y_btw_parents - later_connection_point[1]) * 0.7

// draw first part of bended- lines
    if (type === 'bended-2') {
        current_coords = [
            parents_right_X,
            within_range(intermediate_70percent_Y, upper_parent.center_scroll_Y, lower_parent.center_scroll_Y)
        ]
        ctx.lineTo(...current_coords)
    }
    if (type === 'bended-1') {
        current_coords = [
            current_coords[0] - distance_between_rounds/2 - connection_lines_width,
            intermediate_70percent_Y
        ]
        ctx.lineTo(...current_coords)
    }
    if (type === 'curve') {
        current_coords = [
            current_coords[0] - distance_between_rounds/1.35 - connection_lines_width,
            middle_Y_btw_parents
        ]
        ctx.bezierCurveTo(
            later_connection_point[0] - distance_between_rounds/2.5,
            later_connection_point[1],
            current_coords[0] + distance_between_rounds/2.5,
            current_coords[1],
            ...current_coords
        )
    }

    const draw_line_to = parent => {
        draw_connection_to_parent_match(
            [parents_right_X, parent.center_scroll_Y],
            current_coords,
            options,
            ctx
        )
        type !== 'curve' && ctx.lineTo(parents_right_X - options.connection_lines_width, parent.center_scroll_Y)
    }

// draw regular lines
    const parent_to_highlight = [upper_parent, lower_parent].find(p => p.is_highlighted)
    if (!parent_to_highlight) {
        // uninterrupted line must be drawn to FARTHEST parent to avoid bad angles
        const upper_parent_is_farthest = Math.abs(later_connection_point[1] - upper_parent.center_scroll_Y) > Math.abs(later_connection_point[1] - lower_parent.center_scroll_Y)
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