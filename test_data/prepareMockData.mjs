import { iso3_to_iso2 } from './country_codes_iso3_to_iso2.mjs'

const prepare_single_player = (all_data, player_id) => {
    const player_meta = all_data.players.find(player => player.uuid === player_id)
    const code = iso3_to_iso2[player_meta.nationality.code] || player_meta.nationality.code
    return {
        title: player_meta.short_name,
        nationality_code: code,
        flag_url: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
    }
}

const get_contestants = all_data => {
    const contestants = {}

    all_data.matches.forEach(match => {
        match.teams.forEach(side => {
            if (side === null) return

            if (!contestants[side.team_id]) {
                const contestant_orig_meta = all_data.teams
                    .find(team_meta => team_meta.uuid === side.team_id)

                contestants[side.team_id] = {
                    ...contestant_orig_meta,
                    entry_status: contestant_orig_meta.seed ? String(contestant_orig_meta.seed) : contestant_orig_meta.entry_status?.abbr,
                    players: contestant_orig_meta.players
                        .map(player_id => prepare_single_player(all_data, player_id))
                }
            }
        })
    })

    return contestants
}

const get_sides_data = (match_teams) => {
    return match_teams.filter(Boolean).map(team => {
        return {
            contestant_id: team.team_id,
            score: team.score === undefined ? [] : team.score
                .filter(score => score.game !== '')
                .map(score => ({
                    main_score: score.game,
                    tie_break: score.tie_break && Number(score.tie_break),
                    is_winner: score.winner
                })),
            subscore: team.point,
            is_serving: team.is_serving,
            is_winner: team.status === 'Winner'
        }
    })
}


export const prepareMockData = orig_data => {
    const contestants = get_contestants(orig_data)
    return Promise.resolve({
        rounds: orig_data.rounds.map(
            round => ({ id: round.uuid, name: round.name })
        ),

        matches: orig_data.matches.map((match) => ({
            ...match,
            sides: get_sides_data(match.teams),
            order: match.order - 1,
            is_live: match.match_status !== null && match.match_status.name === 'Live',
            match_status: match.match_status?.name || '05.04.2020'
        })).filter(m => m.sides.find(Boolean)),

        contestants
    })
}