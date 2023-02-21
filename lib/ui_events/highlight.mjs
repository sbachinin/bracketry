const highlighted_class = 'highlighted'
const last_highlighted_class = 'last-highlighted'

export const update_highlight = (matches_positioner, new_id) => {
    if (typeof new_id !== 'string' && new_id !== null) return

    // unhighlight what necessary
    ([...matches_positioner.querySelectorAll('.side-wrapper.' + highlighted_class)])
        .forEach(s => s.classList.remove(highlighted_class));

    ([...matches_positioner.querySelectorAll('.match-wrapper.' + highlighted_class)])
        .forEach(m => m.classList.remove(highlighted_class));

    ([...matches_positioner.querySelectorAll('.match-wrapper.' + last_highlighted_class)])
        .forEach(m => m.classList.remove(highlighted_class))

    if (new_id === null || new_id === '') return

    const sides_to_highlight = [...matches_positioner.querySelectorAll(`.side-wrapper[contestant-id="${new_id}"]`)]

    if (!sides_to_highlight.length) return // id was irrelevant

    if (sides_to_highlight[0].classList.contains(highlighted_class)) return // already highlighted

    // highlight what necessary
    sides_to_highlight.reverse().forEach((s, i) => {
        s.classList.add(highlighted_class)
        const match_parent = s.closest('.match-wrapper')
        match_parent.classList.add(highlighted_class)
        if (i === 0) s.closest('.match-wrapper').classList.add(last_highlighted_class)

        const last_round_parent = s.closest('.last-round-wrapper-wrapper')
        if (last_round_parent) {
            last_round_parent.querySelector('.pseudo-round-wrapper:first-child .match-wrapper')?.classList.add(highlighted_class)
            if (match_parent.classList.contains('even')) {
                last_round_parent.querySelector('.pseudo-round-wrapper:nth-child(2) .match-wrapper.even')?.classList.add(highlighted_class)
            } else {
                last_round_parent.querySelector('.pseudo-round-wrapper:nth-child(2) .match-wrapper.odd')?.classList.add(highlighted_class)
            }
        }
    })

}