export const try_change_other_options = (option_name, option_value) => {
    if (option_name === 'auto_canvas_size' && option_value) {
        return {
            use_classical_layout: true
        }
    }
}