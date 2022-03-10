let shouted = false
export const shout = (msg, actual_data) => {
    if (shouted) return
    shouted = true

    console.error(
        `Incorrect data. %c ${msg} %c${actual_data ? JSON.stringify(actual_data, null, 2) : ''}`,
        'color: #9d7575',
        'font-size: 10px; color: #9d7575'
    )
}

export const halt = (msg, actual_data) => {
    shout(msg, actual_data)
    throw ''
}
