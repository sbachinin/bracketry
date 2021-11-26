import { getPlayerForMatch } from './utils.mjs'

export const drawBrackets = (data, canvasEl) => {
    if (canvasEl.getContext) {
        var ctx = canvasEl.getContext('2d');
        
        // draw rounds
        ctx.font = '10px sans-serif';
        data.rounds.forEach((round, index) => {
            ctx.fillText(round.name, 150 * index, 50);
        })

        // draw matches
        const matchesForRound = data.rounds.map(() => [])
        
        data.matches.forEach(match => {
            const roundIndex = data.rounds.findIndex(r => r.uuid.match(match.round_id))
            matchesForRound[roundIndex].push(match)
        })

        matchesForRound.forEach((matches, roundIndex) => {
            matches.forEach((match, matchIndex) => {
                const firstPlayer = getPlayerForMatch(match, 0, data)
                const secondPlayer = getPlayerForMatch(match, 1, data)
                const rivals = firstPlayer.short_name + ' : ' + secondPlayer.short_name
                ctx.fillText(rivals, 150 * roundIndex, 100 + 50 * matchIndex)
            })
        })
    }
}