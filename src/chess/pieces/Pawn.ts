import { Player, Point } from '../interface'
import { Piece } from './Piece'
import { Board } from '../Board'
import { comparePoints } from '../utils'

type Direction = 1 | -1

export class Pawn extends Piece {
    public direction: Direction
    public moved: boolean

    constructor(board: Board, color: Player) {
        super(board, color, 'pawn')
        this.direction = this.color === 'black' ? 1 : -1
        this.moved = false
    }

    canMove(from: Point, to: Point): boolean {
        if (super.canMove(from, to)) {
            this.moved = true
            return true
        }
        return false
    }

    movesWithoutCapture(from: Point): Point[] {
        const tiles: Point[] = []
        const pointer: Point = [...from]
        const range = this.moved ? 1 : 2

        for (let i = 0; i < range; i++) {
            pointer[0] += this.direction
            if (this.board.getItem(pointer)) break

            tiles.push([...pointer])
        }

        return tiles
    }

    movesWithCapture(from: Point): Point[] {
        const potentialTiles: Point[] = [
            [from[0] + this.direction, from[1] + 1],
            [from[0] + this.direction, from[1] - 1],
        ]

        return potentialTiles.filter(point => this.board.getItem(point)?.color === this.enemy)
    }
}
