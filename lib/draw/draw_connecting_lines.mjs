import { draw_connection_to_parent_match } from './draw_connection_to_parent_match.mjs'

export const draw_connecting_lines = (round_index, match_index, connection_point, all_data, round_left_X, options, ctx) => {
    if (round_index > 0) {

        const get_earlier_connection_point = parent_match_index => {
            const previous_round_matches = all_data.rounds[round_index - 1].matches
            return [
                round_left_X - options.distance_between_rounds,
                previous_round_matches[match_index*2 + parent_match_index].center_Y
            ]
        }

        const upper_parent_connection_point = get_earlier_connection_point(0)
        const lower_parent_connection_point = get_earlier_connection_point(1)

        if (options.connection_lines_type.includes('bended')) {
            connection_point = [
                connection_point[0] - options.distance_between_rounds/2 - options.connection_lines_width,
                upper_parent_connection_point[1] + (lower_parent_connection_point[1] - upper_parent_connection_point[1]) / 2
            ]
            ctx.lineTo(...connection_point)
        }

        draw_connection_to_parent_match(
            upper_parent_connection_point,
            connection_point,
            options,
            ctx
        )
        ctx.moveTo(...connection_point);
        draw_connection_to_parent_match(
            lower_parent_connection_point,
            connection_point,
            options,
            ctx)
    }
}