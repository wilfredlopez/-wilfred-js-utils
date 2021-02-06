


import { debounce } from './debounce'


describe('debounce', () => {
    it('does something', () => {
        const d = debounce(function (n: number) {
            return n + 1
        }, 0, {
            maxWait: 0,

        })
        let n = d(1)
        if (!n) {
            n = d(1)
        }
        expect(n).toBe(2)
    })
})