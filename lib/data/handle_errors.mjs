const log_data_error = (msg, data) => {
    console.warn(
        `Incorrect data. %c ${msg} %c${data ? JSON.stringify(data, null, 2) : ''}`,
        'color: #9d7575',
        'font-size: 10px; color: #9d7575'
    )
}

export const handle_data_errors = (errors) => {
    if (!errors.length) {
        return {
            have_errors: false,
            have_critical_error: false
        }
    }

    const critical_error = errors.find(err => err.is_critical)
    
    if (!critical_error) {
        log_data_error(errors[0].message, errors[0].data || '')
        return {
            have_errors: true,
            have_critical_error: false
        }
    }

    log_data_error(critical_error.message, critical_error.data || '')
    return {
        have_errors: true,
        have_critical_error: true
    }
}
