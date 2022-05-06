import { maybe_draw_lines_for_match } from './lines_for_match.mjs'

export const draw_normal_lines = (
    rounds_count,
    stable_elements,
    options
) => {
    const ctx = stable_elements.lines_canvas.getContext('2d')
    ctx.clearRect(0, 0, stable_elements.lines_canvas.width, stable_elements.lines_canvas.height)
    ctx.lineJoin = 'round'

    Array.from(Array(rounds_count)).forEach((_, round_index) => {
        
        const match_count = Math.pow(2, rounds_count - 1 - round_index)
        Array.from(Array(match_count)).forEach(
            (_, match_index) => {
                maybe_draw_lines_for_match({
                    round_index,
                    match_index,
                    rounds_count,
                    options,
                    stable_elements,
                })
            }
        )
    })
}