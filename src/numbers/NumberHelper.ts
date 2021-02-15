import { appendMethodObject, appendValueObject } from '../multiuse/appendMethod'
import secondsToObject from './secondsToObject'
import { getDigitAt } from './getDigitAt'

export type ResultOf<T> =
  | {
    success: true
    value: T
    error: null
  }
  | {
    success: false
    error: string
    value: null
  }

const NumberHelperBase = {
  toString() {
    return `[object NumberHelper]`
  },
  secondsToObject,
  /**
   * Returns true or false if the number is prime or not.
   * @param n number to verify
   * @complexity O(log n) :)
   */
  isPrime(n: number) {
    //base cases
    if (n < 2) return false
    if (n === 2) return true
    let max = Math.ceil(Math.sqrt(n))
    for (let i = 2; i <= max; i++) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  },

  /**
   * Get random integer.
   * @param min - number to start from. Defaults to 0.
   * @param max - number to end. Defaults to 100.
   */
  getRandomInt(min = 0, max = 100) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  },
  /**
   * Parse text to int.
   * @param text - Text to parse to int.
   * returns {success:true, value: number} if can parse it.
   * returns {success:false, error: 'Invalid number format'} if cant parse it.
   * @param radix - A value between 2 and 36 that specifies the base of the number in numString. If this argument is not supplied, strings with a prefix of '0x' are considered hexadecimal.
   * All other strings are considered decimal. DEFAULT=10.
   */
  tryParseInt(text: string, radix = 10): ResultOf<number> {
    if (/^-?\d+$/.test(text)) {
      return {
        success: true,
        value: parseInt(text, radix),
        error: null,
      }
    } else {
      return {
        success: false,
        value: null,
        error: 'Invalid number format',
      }
    }
  },

  /**
   * Verifies if the value is a power of the second argument `powerOf`.
   * @param value value to evaluate
   * @param powerOf power to compare. defaults to 2
   */
  isPowerOf(value: number, powerOf = 2) {
    return (Math.log(value) / Math.log(powerOf)) % 1 === 0
  },

  /**
   * Determines if number is power of 2
   * @param number
   * @complexity O(1) Constant time.
   * @example
   * console.log(NumberHelper.isPowerOfTwo(16)) //true
   */
  isPowerOfTwo(number: number): boolean {
    if (number < 1) return false
    return (number & (number - 1)) === 0
  },

  /**
   * Formats seconds into duration. eg. formatDuration(60000) => '00:06:00'
   * @param seconds total seconds
   */
  formatDuration(seconds: number) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  },

  /**
   * @param {number} number
   * @return {boolean}
   */
  isEven(number: number) {
    //could also be (number % 2) === 0
    //Using & bitwise operator.
    return (number & 1) === 0
  },

  isOdd(number: number) {
    //but could also be (number % 2) !== 0
    //Using & instead of % here. & represents a bitwise operation.
    return (number & 1) !== 0
  },

  /**
   * @param {number} number - 32-bit integer.
   * @return {boolean}
   */
  isPositive(number: number) {
    // Zero is neither a positive nor a negative number.
    if (number === 0) {
      return false
    }

    // The most significant 32nd bit can be used to determine whether the number is positive.
    return ((number >> 31) & 1) === 0
  },

  /**
   * Switch the sign of the number using "Twos Complement" approach.
   * @param {number} number
   * @return {number} number with the oposite sign. + or -
   */
  switchSign(number: number) {
    return ~number + 1
  },

  getDigitAt: getDigitAt,

  /**
   * calculate fibonacci numbers.
   * Uses Memoization for speed improvemnts.
   * @complexity O(n)
   */
  fibonacci(n: number) {
    if (n <= 2) return 1
    let fivNums = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
      fivNums[i] = fivNums[i - 1] + fivNums[i - 2]
    }
    return fivNums[n]
    /* Alternative Way. might be better but need to measure
if (n <= 2) return 1;
  return Array(n).fill([1, 0]).reduce(
    (prev, _acc) => [prev[0] + prev[1], prev[0]],
  )[0];

    */
  },

  /**
   * Calculate fibonacci number at specific position using closed form function (Binet's formula).
   * @see: https://en.wikipedia.org/wiki/Fibonacci_number#Closed-form_expression
   *
   * @param {number} position - Position number of fibonacci sequence (must be number from 1 to 75).
   * @return {number}
   */
  fibonacciClosedForm(position: number) {
    const topMaxValidPosition = 70

    // Check that position is valid.
    if (position < 1 || position > topMaxValidPosition) {
      throw new Error(
        `Can't handle position smaller than 1 or greater than ${topMaxValidPosition}`
      )
    }

    // Calculate √5 to re-use it in further formulas. (≈ 2.23606)
    const sqrt5 = Math.sqrt(5)
    // Calculate φ constant (≈ 1.618033).
    const phi = (1 + sqrt5) / 2

    // Calculate fibonacci number using Binet's formula.
    return Math.floor(phi ** position / sqrt5 + 0.5)
  },

  /**
   * Return a fibonacci sequence as an array.
   *
   * @param n
   * @return {number[]}
   */
  fibonacciSequence(n: number) {
    if (n <= 1) return [1]
    let fivNums = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
      fivNums[i] = fivNums[i - 1] + fivNums[i - 2]
    }

    return fivNums.slice(1)
  },

  /**
   *
   * @param n number to calculate.
   * @deprecated callstack can be a problem. please use NumberHelper.fibonacci
   */
  fibRecursive(
    n: number,
    memo: { [key: string]: number } = { '0': 0, '1': 1, '2': 1 }
  ): number {
    if (memo[n] !== undefined) return memo[n]
    //base case. alredy included in memo but leaving here anyways
    if (n <= 2) return 1
    let res =
      NumberHelperWithMath.fibRecursive(n - 1, memo) +
      NumberHelperWithMath.fibRecursive(n - 2, memo)
    memo[n] = res
    return res
  },

  isNumber(arg: any): arg is number {
    return typeof arg === 'number'
  },
  addUpTo(n: number) {
    return (n * (n + 1)) / 2
    // return (n / 2) * (1 + n); //the same
  },

  msToTime(d: number) {
    var seconds = Math.floor((d / 1000) % 60),
      minutes = Math.floor((d / (1000 * 60)) % 60)

    return minutes + ':' + (seconds < 10 ? `0${seconds}` : seconds)
  },

  /**
   * @param {number} number
   * @return {number}
   * @complexity O(n)
   */
  factorial(number: number) {
    let result = 1

    for (let i = 2; i <= number; i += 1) {
      result *= i
    }

    return result
  },

  factorialRecursive(number: number): number {
    if (number < 1) return 0
    if (number === 1) return 1
    return number * NumberHelperWithMath.factorialRecursive(number - 1)
  },

  /**
   * Returns a generator returning the numbers from start to end.
   * @param {Object} config configuration object with start, end(inclusive) and step.
   * @default config {start: 0, end:10, step:1}
   * @example
   * for (let n of NumberHelper.range({end: 20, step: 2})) {
        console.log(n); // 0,2, 4, 5, 8, 10, 12, 14, 16, 18, 20
    }

      const arr = [...NumberHelper.range({start: 0, end: 10})];
      console.log(arr); /
   */
  range: function* range({ start = 1, end = 10, step = 1 } = {}) {
    for (let i = start; i <= end; i = i + step) {
      yield i
    }
  },

  /**
   * Returns a function that sums over the first parameters sum.
   * @param x at least one number but up to an infinite number arguments. (1,3,5,6...)
   * @example
   * const acc3M4 = NumberHelper.accumulator(3, -4)
   * console.log(acc3M4(1.5,5)) // 5.5
   */
  accumulator(...x: number[]) {
    let sum = x.reduce((acc, curr) => (acc += curr), 0)
    return (...y: number[]) => {
      let plus = y.reduce((acc, curr) => (acc += curr), 0)
      return (sum += plus)
    }
  },
}

let NumberHelperWithMath = NumberHelperBase as Math & typeof NumberHelperBase
for (let key of Reflect.ownKeys(Math)) {
  const fnOrProp = Math[key as keyof Math]

  if (typeof fnOrProp === 'function') {
    NumberHelperWithMath = appendMethodObject(
      NumberHelperWithMath,
      fnOrProp,
      key
    )
  } else {
    NumberHelperWithMath = appendValueObject(
      NumberHelperWithMath,
      fnOrProp,
      key
    )
  }
}

export const NumberHelper = NumberHelperWithMath
