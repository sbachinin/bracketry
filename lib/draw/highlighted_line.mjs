import { get_match_middle_Y } from '../utils/sizes.mjs'
import { draw_connecting_lines } from './draw_connecting_lines.mjs'
import { CURVE_LINE_OFFSET } from '../constants.mjs'

const draw_highlighted_line_for_match = ({
    all_data,
    round_index,
    match,
    state,
    options,
    canvas
}) => {
    const round_left_X = state.first_round_width * round_index

    const connection_point = [round_left_X + options.match_hor_margin, match.match_middle_Y]
    const ctx = canvas.getContext('2d')
    ctx.lineTo(...connection_point)

    const prev_round = all_data.rounds[round_index - 1]

    if (!prev_round || !prev_round.matches) return

    const upper_parent_original = prev_round.matches.find(m => m.order === match.order * 2)
    if (!upper_parent_original) return
    const upper_parent = {
        ...upper_parent_original,
        match_middle_Y: get_match_middle_Y(
            all_data.rounds.length,
            round_index - 1,
            upper_parent_original.order,
            canvas.height
        ),
        is_highlighted: !!upper_parent_original.sides.find(s => s.id === state.highlighted_team_id)
    }

    const lower_parent_original = prev_round.matches.find(m => m.order === match.order * 2 + 1)
    if (!lower_parent_original) return
    const lower_parent = {
        ...lower_parent_original,
        match_middle_Y: get_match_middle_Y(
            all_data.rounds.length,
            round_index - 1,
            lower_parent_original.order,
            canvas.height
        ),
        is_highlighted: !!lower_parent_original.sides.find(s => s.id === state.highlighted_team_id)
    }

    draw_connecting_lines({
        later_connection_point: connection_point,
        upper_parent,
        lower_parent,
        options,
        ctx: ctx,
    })

    draw_highlighted_line_for_match({
        all_data,
        round_index: round_index - 1,
        match: [upper_parent, lower_parent].find(p => p.is_highlighted),
        state,
        options,
        canvas
    })
}




const find_rightmost_highlighted_match = (rounds, highlighted_team_id) => {
    let result = null
    for (let round_index = rounds.length - 1; round_index >= 0; round_index--) {
        const round = rounds[round_index]
        const match_with_highlighted_team = round.matches.find((match) => {
            return match.sides.find(side => {
                if (side.id === highlighted_team_id) {
                    result = { round, round_index, match, side }
                    return true
                }
            })
        })
        if (match_with_highlighted_team) break
    }
    return result
}




export const maybe_draw_highlighted_line = (
    all_data,
    state,
    options,
    canvas
) => {

    if (typeof state.highlighted_team_id !== 'string') return

    const ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.strokeStyle = options.highlight_color
    ctx.fillStyle = options.highlight_color
    ctx.lineWidth = options.highlighted_connection_lines_width
    ctx.lineJoin = 'round'

    if (options.highlighted_connection_lines_are_dashed) {
        ctx.setLineDash([
            options.highlighted_connection_lines_width * 2,
            options.highlighted_connection_lines_width * 2.5
        ])
    }

    const rightmost_highlighted = find_rightmost_highlighted_match(all_data.rounds, state.highlighted_team_id)

    if (rightmost_highlighted === null) return

    Object.assign(rightmost_highlighted.match, {
        match_middle_Y: get_match_middle_Y(
            all_data.rounds.length,
            rightmost_highlighted.round_index,
            rightmost_highlighted.match.order,
            canvas.height
        )
    })

    const rightmost_highlighted_left_X = state.first_round_width * rightmost_highlighted.round_index

    ctx.moveTo(
        rightmost_highlighted_left_X
            + state.first_round_width
            - options.match_hor_margin
            - (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET : options.connection_lines_width),
        rightmost_highlighted.match.match_middle_Y
    )

    // maybe draw an 'end of team history' rect, if loss
    if (rightmost_highlighted.side.result !== 'winner') {
        const dot_size = Math.max(8, options.highlighted_connection_lines_width * 2)
        ctx.fillRect(
            rightmost_highlighted_left_X
                + state.first_round_width
                - options.match_hor_margin
                - (options.connection_lines_type === 'curve' ? CURVE_LINE_OFFSET : 0)
                - dot_size / 2,
            rightmost_highlighted.match.match_middle_Y - dot_size / 2,
            dot_size,
            dot_size,
        )
    }

    draw_highlighted_line_for_match({
        all_data,
        round_index: rightmost_highlighted.round_index,
        match: rightmost_highlighted.match,
        state,
        options,
        canvas
    })

    ctx.stroke();
}