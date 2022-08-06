let shouted = false
export const shout = (msg, actual_data) => {
    if (shouted) return
    shouted = true

    log_data_error(msg, actual_data)
}

export const log_data_error = (msg, data) => {
    console.error(
        `Incorrect data. %c ${msg} %c${data ? JSON.stringify(data, null, 2) : ''}`,
        'color: #9d7575',
        'font-size: 10px; color: #9d7575'
    )
}


export const halt = (msg, actual_data) => {
    shout(msg, actual_data)
    throw ''
}
