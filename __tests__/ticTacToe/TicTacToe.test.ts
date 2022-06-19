import { TicTacToe } from 'ticTacToe/TicTacToe'
import * as timers from 'timers'

describe('TicTacToe', () => {
    let ticTacToe: TicTacToe

    beforeEach(() => {
        ticTacToe = new TicTacToe()
    })

    it('initializes the board', () => {
        expect(ticTacToe.board).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ])
    })

    it('ignores moving to a non-empty tile', () => {
        ticTacToe.move(0, 0)
        expect(ticTacToe.board).toEqual([
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ])

        ticTacToe.move(0, 0)
        expect(ticTacToe.board).toEqual([
            [1, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ])
    })

    it('registers draw', () => {
        ticTacToe.move(0, 0)
        ticTacToe.move(0, 1)
        ticTacToe.move(0, 2)
        ticTacToe.move(1, 0)
        ticTacToe.move(1, 1)
        ticTacToe.move(1, 2)
        ticTacToe.move(2, 1)
        ticTacToe.move(2, 0)
        expect(ticTacToe.status).toBeUndefined()
        ticTacToe.move(2, 2)
        expect(ticTacToe.status).toEqual('draw')
    })

    it('registers horizontal wins', () => {
        ticTacToe.board = [
            [0, 1, 1],
            [0, 2, 2],
            [0, 0, 0],
        ]
        ticTacToe.move(0, 0)
        expect(ticTacToe.status).toEqual(1)
    })

    it('registers vertical wins', () => {
        ticTacToe.board = [
            [0, 0, 0],
            [1, 2, 0],
            [1, 2, 0],
        ]
        ticTacToe.move(0, 0)
        expect(ticTacToe.status).toEqual(1)
    })

    it('registers wins across LU RD', () => {
        ticTacToe.board = [
            [0, 0, 0],
            [2, 1, 0],
            [0, 2, 1],
        ]
        ticTacToe.move(0, 0)
        expect(ticTacToe.status).toEqual(1)
    })

    it('registers wins across LD RU', () => {
        ticTacToe.board = [
            [0, 0, 0],
            [2, 1, 0],
            [1, 2, 0],
        ]
        ticTacToe.move(0, 2)
        expect(ticTacToe.status).toEqual(1)
    })

    describe('play through', () => {
        it('changes the board correctly', () => {
            ticTacToe.move(0, 0)
            ticTacToe.move(2, 1)
            ticTacToe.move(0, 1)
            ticTacToe.move(1, 1)
            expect(ticTacToe.status).toBeUndefined()
            ticTacToe.move(0, 2)
            expect(ticTacToe.status).toEqual(1)
            expect(ticTacToe.board).toEqual([
                [1, 1, 1],
                [0, 2, 0],
                [0, 2, 0],
            ])
        })
    })
})
