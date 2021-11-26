export const getPlayerForMatch = (match, playerIndex, data) => {
    const playerId = data.teams.find(t => t.uuid.match(match.teams[playerIndex].team_id))?.players[0]
    return data.players.find(p => p.uuid === playerId)
}