const get_width_deficit = shell => (
    shell.matches_positioner.getBoundingClientRect().width
    - shell.content_area.getBoundingClientRect().width
)

export const is_last_round_fully_visible = (shell, base_index_value, get_option) => {
    const vrc = get_option('visibleRoundsCount')
    if (vrc !== undefined && vrc >= 1) { // --> not auto
        return base_index_value + vrc >= shell.matches_positioner.querySelectorAll('.round-wrapper').length
    } else {
        const marginLeft = parseFloat(shell.content_horizontal_scroller.style.marginLeft) || 0
        return (-Math.ceil(marginLeft) - Math.floor(get_width_deficit(shell))) >= 0
    }
}
