export const get_visible_rounds_count = (shell, get_option) => {
    const rounds = shell.matches_positioner.querySelectorAll('.round-wrapper')

    const vrc = get_option('visibleRoundsCount')

    if (vrc !== undefined && vrc >= 1) { // --> not auto
        return Math.min(rounds.length, vrc)
    } else {
        const vrc_float = shell.matches_scroller.getBoundingClientRect().width
            / rounds[0].getBoundingClientRect().width
        if (isNaN(vrc_float)) return 0
        if (get_option('displayWholeRounds')) {
            return Math.floor(vrc_float)
        }
        return vrc_float
    }
}

export const is_last_round_fully_visible = (shell, base_index_value, get_option) => {
    const rounds = shell.matches_positioner.querySelectorAll('.round-wrapper')
    return base_index_value + get_visible_rounds_count(shell, get_option) * 1.01 >= rounds.length
}

export const get_max_base_index = (shell, get_option) => {
    const rounds = shell.matches_positioner.querySelectorAll('.round-wrapper')
    return rounds.length - Math.floor(get_visible_rounds_count(shell, get_option) * 1.01)
}