import { Board } from '../../src/chess/Board'
import { Point } from '../../src/chess/interface'
import { Bishop, Knight, Pawn, Piece, Rook } from '../../src/chess/pieces'

describe('Board', () => {
    const board = new Board()

    const pawn: Pawn = new Pawn(board, 'black')
    const bishop: Bishop = new Bishop(board, 'black')
    const knight: Knight = new Knight(board, 'black')
    const rook: Rook = new Rook(board, 'black')

    beforeEach(() => {
        board.data = [
            [pawn, bishop],
            [knight, rook],
        ]
    })

    describe('getItem', () => {
        const cases: {position: Point, expectedResult: Piece}[] = [
            {
                position:[0, 0],
                expectedResult: pawn,
            },
            {
                position:[0, 1],
                expectedResult: bishop,
            },
            {
                position:[1, 0],
                expectedResult: knight,
            },
            {
                position:[1, 1],
                expectedResult: rook,
            },
        ]

        it.each(cases)('gets item by position', ({ position, expectedResult }) => {
            expect(board.getItem(position)).toBe(expectedResult)
        })
    })

    describe('setItem', () => {
        it('replaces item in the position with a new value', () => {
            const newPiece = new Pawn(board, 'white')
            board.setItem([0, 1], newPiece)
            expect(board.data).toEqual([[pawn, newPiece], [knight, rook]])
        })
    })

    describe('moveItem', () => {
        it('sets the `to` position to the value from `from` position and sets the `from` position to null', () => {
            board.moveItem([0, 0], [1, 1])
            expect(board.data).toEqual([[null, bishop], [knight, pawn]])
        })
    })
})
