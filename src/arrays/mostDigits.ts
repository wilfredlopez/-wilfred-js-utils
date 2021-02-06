import { digitCount } from './digitCount'

/**
 * Finds the max digit count in the array of numbers.
 * @param arr array of numbers
 * @example
 *  mostDigits([22, 403, 12345678]); // 8
 */
export function mostDigits(arr: number[]) {
    let maxDigits = 0

    for (const n of arr) {
        maxDigits = Math.max(digitCount(n), maxDigits)
    }
    return maxDigits
    //this would do it but we iterate twice on the array. one for the map and another one spreading the array into Math.max
    //the one on top only goes one time by the array
    //   return Math.max(...arr.map((d) => digitCount(d)));
}