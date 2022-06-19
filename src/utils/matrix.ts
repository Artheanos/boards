export const createMatrix = <T = number>([height, width]: [number, number], defaultValue: T): T[][] => {
    const result = []
    for (let i = 0; i < height; i++) {
        result.push(new Array(width).fill(defaultValue))
    }
    return result
}
