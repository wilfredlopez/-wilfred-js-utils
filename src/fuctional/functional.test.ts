import { flow } from './flow'
import { pipe } from './pipe'



function reverse(st: string) {
    return st.split('').reverse().join('')
}

function len(st: string) {
    return st.length
}

function double(num: number) {
    return num * 2
}


describe('flow and pipe', () => {
    describe('flow', () => {
        test('should return a piped function', () => {
            const reveserAndDobleLen = flow(reverse, len, double)
            const res = reveserAndDobleLen('hello')

            expect(res).toBe(10)

        })
    })

    describe('pipe', () => {
        test('should return a piped value', () => {
            const res = pipe('hello', reverse, len, double)
            expect(res).toBe(10)
        })
    })


})
