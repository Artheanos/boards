import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { Knight, Bishop } from '../../../src/chess/pieces'
import { point, pointToString } from '../../../src/chess/utils'

describe('Bishop', () => {
    let board: Board

    beforeEach(() => {
        board = new Chess().board
    })

    describe('moving', () => {
        it('can move diagonally', () => {
            const bishop = board.getItem(point('c8')) as Bishop
            board.setItem(point('d7'), null)
            console.log(bishop.movesWithoutCapture(point('c8')).map(i => pointToString(i)))
        })
    })
})
