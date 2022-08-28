export const update_highlight = (matches_positioner, new_id) => {
    if (typeof new_id !== 'string' && new_id !== null) {
        return
    }
    
    if (typeof new_id === 'string') {
        const is_valid_id = matches_positioner.querySelector(`.side-wrapper[contestant-id="${new_id}"]`) !== null
        if (!is_valid_id) return
    }
    
    if (matches_positioner.querySelector(`.side-wrapper.highlighted[contestant-id="${new_id}"]`) !== null) {
        return // sides with such id are already highlighted
    }



    const all_matches = [...matches_positioner.querySelectorAll('.match-wrapper')]
    all_matches.forEach(m => {
            m.classList.remove('highlighted', 'last-highlighted')
            const match_sides = [...m.querySelectorAll('.side-wrapper')]
            match_sides.forEach(s => {
                s.classList.remove('highlighted')
                if (new_id === null) return
                if (s.getAttribute('contestant-id') === new_id) {
                    s.classList.add('highlighted')
                    m.classList.add('highlighted')
                }
            })
        })
    
    const highlighted_matches = [...matches_positioner.querySelectorAll('.match-wrapper.highlighted')]
    highlighted_matches.reverse()[0]?.classList.add('last-highlighted')
}