import { is_object } from './utils/utils.mjs'

export const validate_data = all_rounds_data => {
    // should be an array of rounds
    if (!Array.isArray(all_rounds_data)) {
        console.warn('Incorrect data. Expected an array of rounds, instead got: ', all_rounds_data)
    }
    if (!Array.isArray(all_rounds_data[0].matches)) {
        console.warn('Incorrect data. Expected an array of matches, instead got: ', all_rounds_data[0].matches)
    }
    if (!is_object(all_rounds_data[0].matches[0])) {

    }
}

/*
[
    {
        name?: string,
        matches: [
            {
                order: number,
                sides: [
                    {
                        title: string,
                        ? nationality: string,
                        score: number[],
                        isWinner: boolean
                    }
                ]
            }
        ]
    }
]
*/

