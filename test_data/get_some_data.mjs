import emptydata from './empty-tournament-data.mjs'
import testdata1 from './test-tournament-data-1.mjs'
import data1 from './ausopen-2022-live-data.mjs'
import data2 from './ausopen-dot-com-data-2021.mjs'
import data4 from './ausopen-2022-mens-singles-finished.mjs'
import data5 from './ausopen-2022-live-mens-doubles.mjs'
import { prepareMockData } from './prepareMockData.mjs'

export const INITIAL_TEST_DATA_INDEX = 4

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
        title: 'Tennis ongoing tournament',
        resolver: () => prepareMockData(data1)
    },
    {
        type: 'tennis',
        title: 'Tennis finished tournament',
        resolver: () => prepareMockData(data2)
    },
    {
        type: 'tennis',
        title: 'Tennis finished tournament (shortened)',
        resolver: () => prepareMockData({
            ...data2,
            rounds: data2.rounds.slice(data2.rounds.length - 4)
        })
    },
    {
        type: 'tennis',
        title: 'Another tennis singles finished tournament',
        resolver: () => prepareMockData(data4)
    },
    {
        type: 'tennis',
        title: 'Tennis DOUBLES unfinished tournament',
        resolver: () => prepareMockData(data5)
    },
]


export const get_some_data = (i = INITIAL_TEST_DATA_INDEX) => {
    return datas[i].resolver()
}
