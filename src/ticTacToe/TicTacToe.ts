import { createMatrix } from 'utils/matrix'


export class TicTacToe {
    public currentPlayer: TicTacToe.Player = TicTacToe.Tile.PLAYER_1
    public board: TicTacToe.Board = []
    public status?: TicTacToe.Status

    constructor() {
        this.board = createMatrix([3, 3], 0)
    }

    public move(y: number, x: number) {
        if (this.board[y][x] || this.status) return

        this.board[y][x] = this.currentPlayer
        this.updateStatus()
        this.togglePlayer()
    }

    togglePlayer() {
        this.currentPlayer = this.currentPlayer === TicTacToe.Tile.PLAYER_1 ? TicTacToe.Tile.PLAYER_2 : TicTacToe.Tile.PLAYER_1
    }

    updateStatus() {
        if (this.checkForDraw()) return this.status = 'draw'

        for (const row of this.board) {
            const winner = this.validateStreak(row)
            if (winner) return this.status = winner
        }

        for (let j = 0; j < 3; j++) {
            const column = []
            for (let i = 0; i < 3; i++) {
                column.push(this.board[i][j])
            }
            const winner = this.validateStreak(column)
            if (winner) return this.status = winner
        }

        let across = []
        for (let i = 0; i < 3; i++) {
            across.push(this.board[i][i])
        }
        let winner = this.validateStreak(across)
        if (winner) return this.status = winner

        across = []
        for (let i = 0; i < 3; i++) {
            across.push(this.board[2 - i][i])
        }

        winner = this.validateStreak(across)
        if (winner) return this.status = winner
    }

    checkForDraw() {
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (!this.board[i][j]) return false
        return true
    }

    validateStreak(streak: TicTacToe.Tile[]): TicTacToe.Player | null {
        const result = streak[0]
        if (TicTacToe.isHomogenous(streak) && result !== TicTacToe.Tile.EMPTY) {
            return result
        } else {
            return null
        }
    }

    static isHomogenous(array: number[]) {
        return new Set(array).size === 1
    }
}

export namespace TicTacToe {
    export enum Tile {
        EMPTY,
        PLAYER_1,
        PLAYER_2
    }

    export type Player = Tile.PLAYER_1 | Tile.PLAYER_2
    export type Board = Tile[][]
    export type Status = 'draw' | Player
}
