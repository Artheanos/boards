import { Piece } from './pieces/Piece'

export type Player = 'black' | 'white'
export type Board = (Piece | null)[][]
export type Point = [number, number]
export type PieceType = 'pawn' | 'bishop' | 'knight' | 'rook' | 'queen' | 'king'
