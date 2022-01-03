export const validate_data = all_rounds_data => {
    // should be an array of rounds
    if (!Array.isArray(all_rounds_data)) {
        console.warn('Incorrect data. Need an array of rounds data, instead got: ', all_rounds_data)
    }
}