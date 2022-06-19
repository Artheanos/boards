import { MineSweeper } from 'mineSweeper/MineSweeper'
import { randomInteger } from 'mineSweeper/random'

let bombPoints = [
    1, 1,
    2, 1,
]

jest.mock('../../src/mineSweeper/random', () => {
    let bombPointPointer = 0
    return {
        randomInteger: (_min: number, _max: number) => {
            return bombPoints[bombPointPointer++ % bombPoints.length]
        },
    }
})

describe('MineSweeper', () => {
    it('generates board', () => {
        const mine = new MineSweeper([5, 5])

        expect(mine.board).toEqual([
            [1, 2, 2, 1, 0],
            [1, 128, 128, 1, 0],
            [1, 2, 2, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ])

        mine.click(4, 0)

        expect(mine.board).toEqual([
            [1, 2, 2, 65, 64],
            [1, 128, 128, 65, 64],
            [65, 66, 66, 65, 64],
            [64, 64, 64, 64, 64],
            [64, 64, 64, 64, 64],
        ])
        expect(mine.status).toBeUndefined()

        mine.click(0, 0)

        expect(mine.board).toEqual([
            [65, 66, 2, 65, 64],
            [65, 128, 128, 65, 64],
            [65, 66, 66, 65, 64],
            [64, 64, 64, 64, 64],
            [64, 64, 64, 64, 64],
        ])
        expect(mine.status).toBeUndefined()

        mine.click(0, 2)

        expect(mine.status).toEqual('won')
        expect(mine.board).toEqual([
            [65, 66, 66, 65, 64],
            [65, 192, 192, 65, 64],
            [65, 66, 66, 65, 64],
            [64, 64, 64, 64, 64],
            [64, 64, 64, 64, 64],
        ])
    })

    it('updates status to "lost" after clicking a bomb', () => {
        const mine = new MineSweeper([5, 5])

        mine.click(1, 1)

        expect(mine.status).toEqual('lost')
        expect(mine.board).toEqual([
            [65, 66, 66, 65, 64],
            [65, 192, 192, 65, 64],
            [65, 66, 66, 65, 64],
            [64, 64, 64, 64, 64],
            [64, 64, 64, 64, 64],
        ])
    })
})
