const highlighted_class = 'highlighted'
const last_highlighted_class = 'last-highlighted'

export const update_highlight = (matches_positioner, new_id) => {
    if (typeof new_id !== 'string' && new_id !== null) return

    // unhighlight what necessary
    ([...matches_positioner.querySelectorAll('.side-wrapper.' + highlighted_class)])
        .forEach(s => {
            s.classList.remove(highlighted_class)
            s.closest('.match-wrapper').classList.remove(highlighted_class)
            s.closest('.' + last_highlighted_class)?.classList.remove(last_highlighted_class)
        })

    if (new_id === null || new_id === '') return

    const sides_to_highlight = [...matches_positioner.querySelectorAll(`.side-wrapper[contestant-id="${new_id}"]`)]
    
    if (!sides_to_highlight.length) return // id was irrelevant
        
    if (sides_to_highlight[0].classList.contains(highlighted_class)) return // already highlighted

    // highlight what necessary
    sides_to_highlight.reverse().forEach((s, i) => {
        s.classList.add(highlighted_class)
        s.closest('.match-wrapper').classList.add(highlighted_class)
        if (i === 0) s.closest('.match-wrapper').classList.add(last_highlighted_class)
    })
}