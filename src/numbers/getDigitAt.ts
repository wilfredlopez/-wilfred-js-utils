
/**
 * Returns the digit in number at the given position.
 * Always returns a positive number and returns 0 if the place doesnt exist.
 * @param number the number to get the digit from.
 * @param position the position or place in the number where 0 is the last number. to get the last number (5) in 12345 the position would be 0.
 *
 * Example:
 * For 1835 to get the 5 you can pass the 0 place.
 * @example
 * getDigitAt(1835, 0) // 5
 * getDigitAt(12345, 0) // 5
 * getDigitAt(12345, 1) // 4
 * getDigitAt(12345, 2) // 3
 * getDigitAt(12345, 3) // 2
 * getDigitAt(12345, 4) // 1
 * getDigitAt(1, 4) // 0 (there's no fourth place in this case returns 0)
 */
export function getDigitAt(number: number, position: number): number {
    return Math.floor(Math.abs(number) / Math.pow(10, position)) % 10
}