export const getPlayerMeta = (match, playerIndex, allData) => {
    const playerId = allData.teams.find(t => t.uuid.match(match.teams[playerIndex].team_id))?.players[0]
    return allData.players.find(p => p.uuid === playerId)
}