import { randomInteger } from './random'
import { createMatrix } from 'utils/matrix'

export class MineSweeper {
    public width: number
    public height: number
    public board: number[][] = []
    public status: MineSweeper.Status

    constructor([width, height]: [number, number]) {
        this.width = width
        this.height = height
        this.board = createMatrix([height, width], 0)
        this.placeMines((this.width * this.height / 10) >> 0)
        this.calculateNumbers()
    }

    public click(y: number, x: number) {
        if (this.board[y][x] & MineSweeper.Flag.VISIBLE) return

        if (this.board[y][x] & MineSweeper.Flag.BOMB) {
            this.endGame('lost')
        } else {
            this.reveal(y, x)
            if (this.checkIfWon()) {
                this.endGame('won')
            }
        }
    }

    public toggleFlag(y: number, x: number) {
        this.board[y][x] ^= MineSweeper.Flag.FLAGGED
    }

    endGame(status: MineSweeper.Status) {
        this.status = status
        this.revealAll()
    }

    checkIfWon() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (!(this.board[i][j] & MineSweeper.Flag.VISIBLE) && !(this.board[i][j] & MineSweeper.Flag.BOMB)) return false
            }
        }

        return true
    }

    revealAll() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.board[j][i] |= MineSweeper.Flag.VISIBLE
            }
        }
    }

    placeMines(mineCount: number) {
        for (let i = 0; i < mineCount; i++) {
            const x = randomInteger(0, this.width - 1)
            const y = randomInteger(0, this.height - 1)
            this.board[y][x] |= MineSweeper.Flag.BOMB
        }
    }

    calculateNumbers() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] === 0) {
                    this.board[i][j] |= this.adjacentBombCount(i, j)
                }
            }
        }
    }

    adjacentBombCount(y: number, x: number) {
        let result = 0
        for (const yOffset of [-1, 0, 1]) {
            for (const xOffset of [-1, 0, 1]) {
                const i = y + yOffset
                const j = x + xOffset
                if (this.isInRange(i, j) && this.board[i][j] & MineSweeper.Flag.BOMB) {
                    result++
                }
            }
        }
        return result
    }

    reveal(y: number, x: number) {
        for (const yOffset of [-1, 0, 1]) {
            for (const xOffset of [-1, 0, 1]) {
                const i = y + yOffset
                const j = x + xOffset
                if (
                    !this.isInRange(i, j) ||
                    this.board[i][j] & (MineSweeper.Flag.VISIBLE | MineSweeper.Flag.BOMB)
                ) continue

                this.board[i][j] |= MineSweeper.Flag.VISIBLE
                if (!(this.board[i][j] & MineSweeper.Flag.NUMBER)) {
                    this.reveal(i, j)
                }
            }
        }
    }

    isInRange(y: number, x: number) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height
    }
}

export namespace MineSweeper {
    export enum Flag {
        BOMB = 0b10000000,
        VISIBLE = 0b01000000,
        FLAGGED = 0b00100000,
        NUMBER = 0b00000111,
    }

    export type Status = 'won' | 'lost' | undefined
}
