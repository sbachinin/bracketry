import { get_n_things } from '../utils/utils.mjs'

// this guy ensures that all side-info-items are at least as high as players-titles side-info-item
const get_height_maker_for_side = (sides) => {
    const players_max_count = Math.max(
        sides[0]?.players.length || 0,
        sides[1]?.players.length || 0
    )
    return `<div class="height-maker">
        ${ get_n_things(players_max_count, () => '<div>&#8203;</div>').join('') }
    </div>`
}

export const get_pair = (pair_class, match, side0_players_info, side1_players_info) => {
    return `<div class="match-info-pair ${pair_class}" match-id="${match.id}">
        <div class="side-info-item" contestant-id="${match.sides[0]?.contestant_id || ''}">
            <div class="players-info-wrapper">
                ${side0_players_info || ''}
            </div>
            ${get_height_maker_for_side(match.sides)}
        </div>
        <div class="side-info-item" contestant-id="${match.sides[1]?.contestant_id || ''}">
            <div class="players-info-wrapper">
                ${side1_players_info || ''}
            </div>
            ${get_height_maker_for_side(match.sides)}
        </div>
    </div>`
}