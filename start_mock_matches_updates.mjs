const live_match = {
    is_live: true,
    match_id: "MS219",
    order: 18,
    round_id: "0c28cf42-c060-4e02-a45c-6435d03f9a48",
    sides: [{
        contestant_id: "163976",
        is_serving: false,
        is_winner: false,
        score: [ { main_score: "4"}, { main_score: "1" } ],
        subscore: "40"
    }, {
        contestant_id: "164216",
        is_serving: true,
        is_winner: false,
        score: [ { main_score: "6" }, { main_score: "0" } ],
        subscore: "40"
    }]
}

const live_match2 = {
    match_id: "MS220",
    order: 19,
    round_id: "0c28cf42-c060-4e02-a45c-6435d03f9a48",
    sides: [{
        contestant_id: "164341",
        score: [ {
            main_score: "", tie_break: undefined
        } ],
        subscore: ""
    }, {
        contestant_id: "164166",
        score: [ {
            main_score: "", tie_break: undefined
        } ],
        subscore: ""
    }]
}


const items = ['15', '30', '40', 'A']

export const start_mock_matches_updates = (applyMatchUpdates) => {
    return
    setInterval(() => {
        live_match.sides[1].subscore = live_match.sides[1].subscore === '40' ? 'A' : '40'
        live_match2.sides[0].score[0].main_score = items[Math.floor(Math.random()*items.length)]
        live_match2.sides[1].score[0].main_score = items[Math.floor(Math.random()*items.length)]
        applyMatchUpdates([ live_match, live_match2 ])
    }, 3000)
}

    


