import { flow } from './flow'
import { pipe } from './pipe'
import { exists, failure, success, CatchTry, chain, onSuccess, isFailure, isSuccess } from './CatchTry'


function reverse(st: string) {
    return st.split('').reverse().join('')
}

function len(st: string) {
    return st.length
}

function double(num: number) {
    return num * 2
}

type Payload = CatchTry<{ code: number, label: string }, string>
const minLength = (s: string): Payload => {
    return s.length >= 6 ? success(s) : failure({ code: 1, label: 'Password length should be greater than 5' })
}
function oneCapilal(s: string): Payload {
    return /[A-Z]/g.test(s) ? success(s) : failure({ code: 2, label: "Password most have at least on capital letter" })
}
function oneNumber(s: string): Payload {
    return /[0-9]/g.test(s) ? success(s) : failure({ code: 3, label: "Password most have at least on number" })
}
function validatePassword(s: string) {
    return pipe(minLength(s), chain(oneCapilal), chain(oneNumber))
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


    describe('CatchTry', () => {
        test('should return false if not exist', () => {
            const gt2 = exists((n: number) => n > 2)
            expect(gt2(failure('a'))).toBe(false)
            expect(gt2(success(2))).toBe(false)
            expect(gt2(success(3))).toBe(true)
        })
        test('should validate password', async () => {
            onSuccess(validatePassword('WW')).then(_success => {
                //this will never run since it will fail
            }).catch(e => {
                expect(e).toEqual({ code: 1, label: 'Password length should be greater than 5' })
            })
            // const val = await onSuccess(validatePassword('Wilfred28'))
            expect(validatePassword('wilfr')).toEqual(failure({ code: 1, label: "Password length should be greater than 5" }))
            expect(validatePassword('wilfred')).toEqual(failure({ code: 2, label: "Password most have at least on capital letter" }))
            expect(validatePassword('Wilfred')).toEqual(failure({ code: 3, label: "Password most have at least on number" }))
            expect(validatePassword('Wilfred29')).toEqual(success("Wilfred29"))


        })


        test('should validate success or failure', () => {
            const value = validatePassword('Wilfred22')
            // if (isFailure(value)) {
            //     console.log(value.failure)
            // } else {
            //     console.log("Success: ", value.success)
            // }
            expect(isFailure(value)).toBe(false)
            expect(isSuccess(value)).toBe(true)
        })


    })

})
