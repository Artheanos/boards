export const randomInteger = (min: number, max: number): number => {
    return Math.random() * (max - min + 1) + min >> 0
}
