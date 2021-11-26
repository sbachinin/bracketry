import { getPlayerForMatch } from './utils.mjs'

export const drawBrackets = (data, canvasEl) => {
    if (canvasEl.getContext) {
        var ctx = canvasEl.getContext('2d');
        
        // draw rounds
        ctx.font = '12px sans-serif';
        data.rounds.forEach((round, index) => {
            ctx.fillText(round.name, 150 * index, 50);
        })

        // draw matches
        const roundsToMatches = data.rounds.map(() => [])
        
        data.matches.forEach(match => {
            const roundIndex = data.rounds.findIndex(r => r.uuid.match(match.round_id))
            roundsToMatches[roundIndex].push(match)
        })

        roundsToMatches.forEach((matchesOfSingleRound, roundIndex) => {
            matchesOfSingleRound
            .sort((a, b) => a.order - b.order)
            .forEach((match, matchIndex) => {
                const firstPlayer = getPlayerForMatch(match, 0, data)
                const secondPlayer = getPlayerForMatch(match, 1, data)
                ctx.fillText(firstPlayer.short_name, 150 * roundIndex, 100 + 50 * matchIndex)
                ctx.fillText(secondPlayer.short_name, 150 * roundIndex, 120 + 50 * matchIndex)
            })
        })
    }
}