import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { King } from '../../../src/chess/pieces'
import { point, pointToString } from '../../../src/chess/utils'

describe('King', () => {
    let board: Board

    beforeEach(() => {
        board = new Chess().board
    })

    it('when pawn next to the king is removed', () => {
        const king = board.getItem(point('e8')) as King
        board.setItem(point('e7'), null)
        const movesWithoutCapture = king.movesWithoutCapture().map(pointToString)
        const movesWithCapture = king.movesWithCapture().map(pointToString)

        expect(movesWithoutCapture).toEqual(['e7'])
        expect(movesWithCapture).toEqual([])
    })

    it('when king is next to the enemy\'s row', () => {
        const king = board.getItem(point('e8')) as King
        board.moveItem(point('e8'), point('e3'))
        const movesWithoutCapture = king.movesWithoutCapture().map(pointToString)
        const movesWithCapture = king.movesWithCapture().map(pointToString)

        expect(movesWithoutCapture.sort()).toEqual(['d3', 'd4', 'e4', 'f3', 'f4'])
        expect(movesWithCapture.sort()).toEqual(['d2', 'e2', 'f2'])
    })
})
