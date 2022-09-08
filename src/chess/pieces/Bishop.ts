import { Point } from '../interface'
import { Piece } from './Piece'


export class Bishop extends Piece {
    static diagonalDirections = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ]

    movesWithoutCapture(from: Point): Point[] {
        const tiles: Point[] = []
        for (const direction of Bishop.diagonalDirections) {
            const pointer: Point = [...from]
            while(true) {
                pointer[0] += direction[0]
                pointer[1] += direction[1]
                if (!this.board.inRange(pointer) || this.board.getItem(pointer) !== null) break

                tiles.push([...pointer])
            }
        }
        return tiles
    }
}
