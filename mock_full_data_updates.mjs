import data2 from './test_data/ausopen-dot-com-data-2021.mjs'
import { prepareMockData } from './test_data/prepareMockData.mjs'


export const start_mock_full_data_updates = (applyFullDataUpdate) => {
    let counter = 0

    setInterval(() => {
        counter += 1
        prepareMockData(data2).then(data => {
            data.matches = data.matches.map(m => {
                return {
                    ...m,
                    sides: m.sides.map(s => {
                        return {
                            ...s,
                            score: s.score.map(ss => {
                                return { ...ss, main_score: (parseInt(ss.main_score) || 0) + counter + '' }
                            })
                        }
                    })
                }
            })
            applyFullDataUpdate(data)
        })
    }, 3000)
}
