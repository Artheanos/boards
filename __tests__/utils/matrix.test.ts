import { createMatrix } from 'utils/matrix'

describe('createMatrix', () => {
    it('creates proper matrix', () => {
        const matrix = createMatrix([3, 5], 'a')
        expect(matrix).toEqual([
            ['a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a'],
            ['a', 'a', 'a', 'a', 'a'],
        ])
    })
})
