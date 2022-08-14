const get_default_round_name = (rounds_count, round_index) => {
    if (round_index === (rounds_count-1)) return 'Final'
    if (round_index === (rounds_count-2)) return 'Semifinals'
    if (round_index === (rounds_count-3)) return 'Quarterfinals'
    return `1/${Math.pow(2, rounds_count - round_index - 1)}`
}

export const get_round_titles_html = (rounds_data) => {
    return rounds_data.map((r, i) => {
        const name = r.name || get_default_round_name(rounds_data.length, i)
        return `<div class="round-name">${name.trim()}</div>`
    }).join('')
}
