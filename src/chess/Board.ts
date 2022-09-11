import { Pawn, Piece } from './pieces'
import { Point } from './interface'

type BoardItem = Piece | null
type BoardData = BoardItem[][]

export class Board {
    private _data: BoardData = []
    private width = 0
    private height = 0

    get data(): BoardData {
        return this._data
    }

    set data(value: BoardData) {
        this._data = value
        this.height = this.data.length
        this.width = this.data[0].length
        this.updatePositions()
    }

    public getItem(from: Point): BoardItem {
        return this._data[from[0]][from[1]]
    }

    public setItem(to: Point, newValue: BoardItem) {
        this._data[to[0]][to[1]] = newValue
        if (newValue !== null) newValue.position = to
    }

    public moveItem(from: Point, to: Point) {
        const item = this.getItem(from)
        this.setItem(to, item)
        this.setItem(from, null)
        if (item instanceof Pawn) item.moved = true
    }

    public inRange([i, j]: Point): boolean {
        return i >= 0 && i < this.height && j >= 0 && j < this.width
    }

    public iterator(from: Point, directions: Point[], range?: number): Point[] {
        const result: Point[] = []

        for (const direction of directions) {
            let counter = 0
            const pointer: Point = [...from]

            while (true) {
                pointer[0] += direction[0]
                pointer[1] += direction[1]
                if (!this.inRange(pointer) || range && counter >= range) break

                result.push([...pointer])
                counter++

                if (this.getItem(pointer) !== null) break

            }
        }
        return result
    }

    private updatePositions() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const position: Point = [i, j]
                const piece = this.getItem(position)
                if (piece === null) continue

                piece.position = [...position]
            }
        }
    }
}
