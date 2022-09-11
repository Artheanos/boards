import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { Bishop } from '../../../src/chess/pieces'
import { point, pointToString } from '../../../src/chess/utils'

describe('Bishop', () => {
    let board: Board

    beforeEach(() => {
        board = new Chess().board
    })

    it('when pawn next to the bishop is removed', () => {
        const bishop = board.getItem(point('c8')) as Bishop
        board.setItem(point('d7'), null)
        const movesWithoutCapture = bishop.movesWithoutCapture().map(pointToString)
        const movesWithCapture = bishop.movesWithCapture().map(pointToString)

        expect(movesWithoutCapture).toEqual(['d7', 'e6', 'f5', 'g4', 'h3'])
        expect(movesWithCapture).toEqual([])
    })

    it('when bishop is next to the enemy\'s row', () => {
        const bishop = board.getItem(point('c8')) as Bishop
        board.moveItem(point('c8'), point('c3'))
        const movesWithoutCapture = bishop.movesWithoutCapture().map(pointToString)
        const movesWithCapture = bishop.movesWithCapture().map(pointToString)

        expect(movesWithoutCapture).toEqual(['b4', 'a5', 'd4', 'e5', 'f6'])
        expect(movesWithCapture).toEqual(['b2', 'd2'])
    })
})
