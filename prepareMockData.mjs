const getFullTeamsData = (matchTeams, allData) => {
    
    return matchTeams.map(team => {
        const teamMeta = allData.teams
            .find(({uuid}) => uuid === team.team_id)

        return {
            ...team,
            players: teamMeta.players
                .map(playerId => {
                    const playerMeta = allData.players.find(
                        player => player.uuid === playerId
                    )
                    return {
                        playerId,
                        firstName: playerMeta.first_name,
                        lastName: playerMeta.last_name,
                        fullName: playerMeta.full_name,
                        shortName: playerMeta.short_name,
                        gender: playerMeta.gender,
                        nationality: playerMeta.nationality,
                    }
                })
        }
    })
}

const getMatchesForRound = (roundId, allData) => {
    return allData.matches
        .filter(match => match.round_id === roundId)
        .map(match => ({
            ...match,
            teams: getFullTeamsData(match.teams, allData)
        }))
        .sort((a, b) => a.order - b.order)
}





export const prepareMockData = allData => {
    return Promise.resolve(allData.rounds.map(
        round => ({
            ...round,
            matches: getMatchesForRound(round.uuid, allData)
        })
    ))
}