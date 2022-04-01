import { iso3_to_iso2 } from './country_codes_iso3_to_iso2.mjs'

const get_teams = all_data => {
    const teams = {}

    all_data.matches.forEach(match => {
        match.teams.forEach(side => {
            const team_meta = all_data.teams
                .find(({ uuid }) => uuid === side.team_id)

            const first_player_meta = all_data.players.find(player => player.uuid === team_meta.players[0])

            const code = iso3_to_iso2[first_player_meta.nationality.code] || first_player_meta.nationality.code

            teams[side.team_id] = teams[side.team_id]
                || {
                    title: first_player_meta.short_name,
                    nationality_code: code,
                    flag_url: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
                    entry_status: team_meta.seed ? String(team_meta.seed) : team_meta.entry_status?.abbr
                }
        })
    })

    return teams
}

const get_sides_data = (match_teams) => {
    return match_teams.map(team => {
        return {
            id: team.team_id,
            score: team.score.map(score => ({
                main_score: Number(score.game),
                tie_break: score.tie_break && Number(score.tie_break)
            })),
            isWinner: team.status === 'Winner',
        }
    })
}

const getMatchesForRound = (roundId, all_data, teams) => {
    return all_data.matches
        .filter(match => match.round_id === roundId)
        .map(match => ({
            id: match.id,
            dev_match_title: match.teams.map(t => teams[t.team_id].title).join('/'),
            order: match.order,
            sides: get_sides_data(match.teams, teams)
        }))
        .sort((a, b) => a.order - b.order)
}





export const prepareMockData = all_data => {
    const teams = get_teams(all_data)
    return Promise.resolve({
        rounds: all_data.rounds.map(
            round => ({
                name: round.name,
                matches: getMatchesForRound(round.uuid, all_data, teams)
            })
        ),
        teams
    })
}