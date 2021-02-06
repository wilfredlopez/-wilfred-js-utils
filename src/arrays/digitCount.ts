/**
 * gets the count of digits that a number has.
 * @param num number
 * @example
 * digitCount(1234) // 4
 * digitCount(1) // 1
 */
export function digitCount(num: number) {
    if (num === 0) return 1
    return Math.floor(Math.log10(Math.abs(num))) + 1
}
