import { Player, Point } from '../interface'
import { Piece } from './Piece'
import { Board } from '../Board'

type Direction = 1 | -1

export class Pawn extends Piece {
    public direction: Direction

    constructor(board: Board, color: Player) {
        super(board, color, 'pawn')
        this.direction = this.color === 'black' ? 1 : -1
    }

    _movesWithoutCapture(): Point[] {
        const tiles: Point[] = []
        const range = this.moved ? 1 : 2
        const pointer: Point = [...this.position]

        for (let i = 0; i < range; i++) {
            pointer[0] += this.direction
            if (!this.board.inRange(pointer) || this.board.getItem(pointer)) break

            tiles.push([...pointer])
        }

        return tiles
    }

    _movesWithCapture(): Point[] {
        const potentialTiles: Point[] = [
            [this.position[0] + this.direction, this.position[1] + 1],
            [this.position[0] + this.direction, this.position[1] - 1],
        ]

        return potentialTiles.filter(point => this.board.inRange(point) && this.board.getItem(point)?.color === this.enemy)
    }
}
