export const update_highlight = (matches_positioner, highlighted_contestant_id) => {
    if (typeof highlighted_contestant_id !== 'string' && highlighted_contestant_id !== null) {
        return
    }
    
    if (typeof highlighted_contestant_id === 'string') {
        const is_valid_id = matches_positioner.querySelector(`.side-wrapper[contestant-id="${highlighted_contestant_id}"]`) !== null
        if (!is_valid_id) return
    }

    const all_matches = [...matches_positioner.querySelectorAll('.match-wrapper')]
    all_matches.forEach(m => {
            m.classList.remove('highlighted', 'last-highlighted')
            const match_sides = [...m.querySelectorAll('.side-wrapper')]
            match_sides.forEach(s => {
                s.classList.remove('highlighted')
                if (highlighted_contestant_id === null) return
                if (s.getAttribute('contestant-id') === highlighted_contestant_id) {
                    s.classList.add('highlighted')
                    m.classList.add('highlighted')
                }
            })
        })
    
    const highlighted_matches = [...matches_positioner.querySelectorAll('.match-wrapper.highlighted')]
    highlighted_matches.reverse()[0]?.classList.add('last-highlighted')
}