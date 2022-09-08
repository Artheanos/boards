import { Piece } from './pieces'
import { Point } from './interface'

export class Board {
    public data: (Piece | null)[][] = []

    public getItem(from: Point): Piece | null {
        return this.data[from[0]][from[1]]
    }

    public setItem(to: Point, newValue: Piece | null) {
        this.data[to[0]][to[1]] = newValue
    }

    public moveItem(from: Point, to: Point) {
        this.setItem(to, this.getItem(from))
        this.setItem(from, null)
    }

    public inRange([i, j]: Point): boolean {
        return i >= 0 && i < 8 && j >= 0 && j < 8
    }
}
