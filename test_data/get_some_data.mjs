import emptydata from './empty-tournament-data.mjs'
import testdata1 from './test-tournament-data-1.mjs'
import data1 from './ausopen-2022-live-data.mjs'
import data2 from './ausopen-dot-com-data-2021.mjs'
import data4 from './ausopen-2022-mens-singles-finished.mjs'
import data5 from './ausopen-2022-live-mens-doubles.mjs'
import { prepareMockData } from './prepareMockData.mjs'


export const datas = [
    {
        type: 'empty',
        title: 'Empty (upcoming) 3-round tournament',
        resolver: () => Promise.resolve(emptydata)
    },
    {
        type: 'tennis',
        title: '2-round tennis tournament',
        resolver: () => Promise.resolve(testdata1)
    },
    {
        type: 'tennis',
        title: '...',
        resolver: () => prepareMockData(data1)
    },
    {
        type: 'tennis',
        resolver: () => prepareMockData(data2)
    },
    {
        type: 'tennis',
        resolver: () => prepareMockData({
            ...data2,
            rounds: data2.rounds.slice(data2.rounds.length - 4)
        })
    },
    {
        type: 'tennis',
        resolver: () => prepareMockData(data4)
    },
    {
        type: 'tennis',
        resolver: () => prepareMockData(data5)
    },
]


export const get_some_data = (index) => {
    // return Promise.resolve(testdata1)
    switch (index) {
        case -1: return Promise.resolve(emptydata)
        case 0: return Promise.resolve(testdata1)
        case 1: return prepareMockData(data1)
        case 2: return prepareMockData(data2)
        case 3: return prepareMockData(data2).then(data => {
            return {
                ...data,
                rounds: data.rounds.slice(data.rounds.length - 4)
            }
        })
        case 4: return prepareMockData(data4)
        case 5:
        default:
            return prepareMockData(data5)
    }
}
