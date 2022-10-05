import { Bishop, Piece, Rook } from './'
import { Point } from '../interface'

type CastlingMove = {
    kingNewPosition: Point
    rookNewPosition: Point
    rook: Rook
}

export class King extends Piece {
    protected _moves(): Point[] {
        const directions = Bishop.diagonalDirections.concat(Rook.straightDirections)
        return this.board.directionalIterator(this.position, directions, 1).concat(this.castlingMoves().map(i => i.kingNewPosition))
    }

    castlingMoves(): CastlingMove[] {
        const result: CastlingMove[] = []
        if (this.moved) return result

        for (const direction of [-1, 1]) {
            const pointer: Point = [...this.position]
            while (true) {
                pointer[1] += direction
                if (!this.board.inRange(pointer)) break

                const piece = this.board.getItem(pointer)
                if (piece !== null) {
                    if (piece instanceof Rook && !piece.moved) {
                        result.push({
                            kingNewPosition: [this.position[0], this.position[1] + direction * 2],
                            rookNewPosition: [this.position[0], this.position[1] + direction],
                            rook: piece,
                        })
                    }
                    break
                }
            }
        }

        return result
    }

    canBeCaptured() {
        const stringPosition = this.position.join(',')

        for (const piece of this.board.pieces(this.enemy)) {
            if (piece._movesWithCapture().some(point => point.join(',') === stringPosition)) return true
        }

        return false
    }
}
