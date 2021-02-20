// import { throttle } from "./index"
// import { wait } from "@testing-library"
import { toFinite, toInteger } from './multi-utils'
// describe("Throttle", () => {
//   it("creates delay", async () => {
//     let i = 0
//     function getInt() {
//       i++
//     }
//     const getId = throttle(getInt, 300)
//     //call it three times in a row. it shoulnd increment i more than 1 time.
//     getId()
//     getId()
//     getId()
//     expect(i).toBe(1)

//     await wait(
//       () => {
//         getId()
//         getId()
//         expect(i).toBe(2)
//       },
//       { timeout: 300 },
//     )
//   })
// })


describe('multi-utils', () => {
  test('should return number', () => {
    const val = toFinite('3.2')
    const n = toFinite(() => 1)
    const inf = toFinite(Infinity)
    const minusInf = toFinite(-Infinity)
    expect(val).toBe(3.2)
    expect(n).toBe(1)
    expect(inf).toBe(Number.MAX_VALUE)
    expect(minusInf).toBe(-1.7976931348623157e+308)
  })

})

test('should ', () => {
  expect(true).toBe(true)
})

export { }