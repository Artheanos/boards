import { Point } from '../interface'
import { Piece } from './Piece'
import { Bishop } from './Bishop'


export class Knight extends Piece {
    static ranges = [
        [1, 2],
        [2, 1],
    ]

    moves() {
        const tiles: Point[] = []

        for (const direction of Bishop.diagonalDirections) {
            for (const range of Knight.ranges) {
                const pointer: Point = [...this.position]
                pointer[0] += range[0] * direction[0]
                pointer[1] += range[1] * direction[1]
                if (this.board.inRange(pointer)) tiles.push(pointer)
            }
        }

        return tiles
    }
}
