import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { Knight } from '../../../src/chess/pieces'
import { point, pointToString } from '../../../src/chess/utils'

describe('Knight', () => {
    let board: Board

    beforeEach(() => {
        board = new Chess().board
    })

    it('when', () => {
        const knight = board.getItem(point('b8')) as Knight
        const movesWithoutCapture = knight._movesWithoutCapture().map(pointToString)
        const movesWithCapture = knight._movesWithCapture().map(pointToString)

        expect(movesWithoutCapture).toEqual(['a6', 'c6'])
        expect(movesWithCapture).toEqual([])
    })

    it('when knight is next to the enemy\'s row', () => {
        const knight = board.getItem(point('b8')) as Knight
        board.moveItem(point('b8'), point('b3'))
        const movesWithoutCapture = knight._movesWithoutCapture().map(pointToString)
        const movesWithCapture = knight._movesWithCapture().map(pointToString)

        expect(movesWithoutCapture.sort()).toEqual(['a5', 'c5', 'd4'])
        expect(movesWithCapture.sort()).toEqual(['a1', 'c1', 'd2'])
    })
})
