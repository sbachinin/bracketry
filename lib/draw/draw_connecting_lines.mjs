import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'
import { set_line_props } from './set_line_props.mjs'

export const draw_connecting_lines = ({
    type,
    later_connection_point,
    team_id_to_highlight,
    upper_parent,
    lower_parent,
    options,
    ctx
}) => {
    const parents_right_X = later_connection_point[0] - options.distance_between_rounds
    let current_coords = [...later_connection_point]

// draw first part of bended- lines
    ctx.beginPath()
    ctx.moveTo(...current_coords)
    team_id_to_highlight && set_line_props({ is_highlighted: true, options, ctx })
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
    ctx.stroke()


// draw line/curve to upper parent's connection point
    ctx.beginPath()
    ctx.moveTo(...current_coords);
    team_id_to_highlight 
        && set_line_props({
            is_highlighted: upper_parent.sides.find(s => s.id === team_id_to_highlight),
            options, ctx
        })
    draw_connection_to_parent_match(
        [parents_right_X, upper_parent.center_Y],
        current_coords,
        options,
        ctx
    )
    ctx.stroke()


// draw line/curve to lower parent's connection point
    ctx.beginPath()
    ctx.moveTo(...current_coords)
    team_id_to_highlight 
        && set_line_props({
            is_highlighted: lower_parent.sides.find(s => s.id === team_id_to_highlight),
            options, ctx
        })
    draw_connection_to_parent_match(
        [parents_right_X, lower_parent.center_Y],
        current_coords,
        options,
        ctx)
    ctx.stroke()
}