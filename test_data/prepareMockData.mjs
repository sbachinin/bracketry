import { iso3_to_iso2 } from './country_codes_iso3_to_iso2.mjs'
import { is_object } from '../lib/utils/utils.mjs'

const prepare_single_player = (all_data, player_id, contestant_orig_meta) => {
    const player_meta = all_data.players.find(player => player.uuid === player_id)
    const code = iso3_to_iso2[player_meta.nationality.code] || player_meta.nationality.code
    return {
        title: player_meta.short_name,
        nationality_code: code,
        flag_url: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`,
        entry_status: contestant_orig_meta.seed ? String(contestant_orig_meta.seed) : contestant_orig_meta.entry_status?.abbr
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

                contestants[side.team_id] = contestant_orig_meta.players
                    .map(player_id => prepare_single_player(all_data, player_id, contestant_orig_meta))
            }
        })
    })

    return contestants
}

const get_sides_data = (match_teams) => {
    return match_teams.filter(Boolean).map(team => {
        return {
            id: team.team_id,
            score: !team.score.length ? undefined : team.score.map(score => ({
                main_score: score.game,
                tie_break: score.tie_break && Number(score.tie_break)
            })),
            result: team.status === 'Winner' ? 'winner'
                : undefined // '<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" />',
        }
    })
}

const getMatchesForRound = (roundId, orig_data, contestants) => {
    return orig_data.matches
        .filter(match => match.teams.find(is_object))
        .filter(match => match.round_id === roundId)
        .map((match) => ({
            ...match,
            id: match.id,
            dev_match_title: match.teams
                .filter(Boolean)
                .map(t => contestants[t.team_id].title).join('/'),
            sides: get_sides_data(match.teams),
            order: match.order - 1
        }))
        .sort(() => 0.5 - Math.random()) // order of matches in this array should have no effect; order of rendering should be defined by 'order' property of a match
}





export const prepareMockData = orig_data => {
    const contestants = get_contestants(orig_data)
    return Promise.resolve({
        rounds: orig_data.rounds.map(
            round => ({
                name: round.name,
                matches: getMatchesForRound(round.uuid, orig_data, contestants)
            })
        ),
        contestants
    })
}