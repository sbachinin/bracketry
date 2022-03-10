const get_sides_data = (match_teams, all_data) => {
    
    return match_teams.map(team => {
        const team_meta = all_data.teams
            .find(({uuid}) => uuid === team.team_id)
        
        const player_meta = all_data.players.find(player => player.uuid === team_meta.players[0])
        return {
            id: team.team_id,
            score: team.score.map(score => ({
                main_score: Number(score.game),
                tie_break: score.tie_break && Number(score.tie_break)
            })),
            isWinner: team.status === 'Winner',
            short_title: player_meta.short_name,
            nationality_code: player_meta.nationality.code,
            entry_status: team_meta.seed ? String(team_meta.seed) : team_meta.entry_status?.abbr
        }
    })
}

const getMatchesForRound = (roundId, all_data) => {
    return all_data.matches
        .filter(match => match.round_id === roundId)
        .map(match => ({
            id: match.id,
            order: match.order,
            sides: get_sides_data(match.teams, all_data)
        }))
        .sort((a, b) => a.order - b.order)
}





export const prepareMockData = all_data => {
    return Promise.resolve(all_data.rounds.map(
        round => ({
            name: round.name,
            matches: getMatchesForRound(round.uuid, all_data)
        })
    ))
}