import { Point } from './interface'

export const comparePoints = (a: Point, b: Point) => a.join('') === b.join('')
export const point = (x: string): Point => [56 - x.charCodeAt(1), x.charCodeAt(0) - 97]
export const pointToString = (point: Point) => `${String.fromCharCode(point[1] + 97)}${String.fromCharCode(56 - point[0])}`
