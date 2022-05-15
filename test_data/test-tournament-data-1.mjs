const match1 = {
    order: 0,
    sides: [
        {
            contestant_id: 'a',
            score: [
                {
                    main_score: 0,
                    tie_break: 7
                },
                {
                    main_score: 6
                }
            ],
            result: 'winner'
        },
        {
            contestant_id: 'b',
            score: [
                {
                    main_score: 0,
                    tie_break: 5
                },
                {
                    main_score: 3
                }
            ],
            result: `<div style="
                border: 1px solid;
                background: tomato;
                padding: 2px 4px;
                font-size: 14px;
                line-height: 12px;
                border-radius: 4px;
            ">W/O</div>`
        }
    ]
}

const match2 = {
    order: 1,
    sides: [
        {
            contestant_id: 'c',
            score: [],
            result: 'winner'
        },
        {
            contestant_id: 'd',
            score: [],
            result: 'Ret'
        }
    ]
}

export default {
    rounds: [
        {
            name: 'Ovo',
            matches: [
                match1,
                match2
            ]
        },
        {
            name: 'Fin',
            matches: []
        }
    ],

    contestants: {
        a: {
            title: '<a href="http://google.com" style="text-decoration: none">link to google</a>',
            nationality_code: 'ALB',
            entry_status: 'J'
        },
        b: {
            title: 'Bruno Van Den Schplusselberg',
        },
        c: {
            title: 'Ccccc',
            entry_status: 'WO'
        },
        d: {
            title: 'DD DD DD',
            nationality_code: 'fsdfds'
        }
    }
}