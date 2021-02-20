
function slice<T>(array: T[], start: number, end: number): T[] {
    let length = array == null ? 0 : array.length
    if (!length) {
        return []
    }
    start = start == null ? 0 : start
    end = end === undefined ? length : end

    if (start < 0) {
        start = -start > length ? 0 : length + start
    }
    end = end > length ? length : end
    if (end < 0) {
        end += length
    }
    length = start > end ? 0 : (end - start) >>> 0
    start >>>= 0

    let index = -1
    const result = new Array<T>(length)
    while (++index < length) {
        result[index] = array[index + start]
    }
    return result
}
/**
 * The base implementation of methods like `dropWhile` and `takeWhile`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the slice of `array`.
 */
export function baseWhile<T>(
    array: T[],
    predicate: (value: T, index: number, array: T[]) => void,
    isDrop: boolean,
    fromRight: boolean
): T[] {
    const { length } = array
    let index = fromRight ? length : -1

    while (
        (fromRight ? index-- : ++index < length) &&
        predicate(array[index], index, array)
    ) { }

    return isDrop
        ? slice(array, fromRight ? 0 : index, fromRight ? index + 1 : length)
        : slice(array, fromRight ? index + 1 : 0, fromRight ? length : index)
}

/**
 * Creates a slice of `array` excluding elements dropped from the end.
 * Elements are dropped until `predicate` returns falsey. The predicate is
 * invoked with three arguments: (value, index, array).
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to query.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * const users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': true },
 *   { 'user': 'pebbles', 'active': true }
 * ]
 *
 * dropRightWhile(users, ({ active }) => active)
 * // => objects for ['barney']
 */
export function dropRightWhile<T extends any>(
    array: T[],
    predicate: (value: T) => boolean
): T[] {
    return array != null && array.length
        ? baseWhile(array, predicate, true, true)
        : []
}


export function dropRight<T extends any>(array: T[], n = 1) {
    const length = array == null ? 0 : array.length
    n = length - toInteger(n)
    return length ? slice(array, 0, n < 0 ? 0 : n) : []
}

export function toInteger(value: number) {
    const result = toFinite(value)
    const remainder = result % 1

    return remainder ? result - remainder : result
}

/** Used as references for various `Number` constants. */
const MAX_INTEGER = 1.7976931348623157e+308


/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i

/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i
function isObject(value: any): value is object | Function {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
}
/**
 * Converts `value` to a finite number.
 *
 * 
 * toFinite(0xffffff)
 * // => 16777215
 * 
 * toFinite(3.2)
 * // => 3.2
 *
 * toFinite(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toFinite(Infinity)
 * // => 1.7976931348623157e+308
 *
 * toFinite('3.2')
 * // => 3.2
 */
export function toFinite(value: unknown): number {
    if (!value) {
        return value === 0 ? value : 0
    }

    if (value === Infinity || value === -Infinity) {
        const sign = (value < 0 ? -1 : 1)
        return sign * MAX_INTEGER
    }

    if (typeof value === 'number') {
        return value
    }

    if (typeof value === 'symbol') {
        return NaN
    }
    if (isObject(value)) {
        const other = typeof value === 'function' ? value() : value
        value = isObject(other) ? `${other}` : other
    }
    if (typeof value !== 'string') {
        return value === 0 ? value : parseInt(String(value))
    }
    const isBinary = reIsBinary.test(value)
    return (isBinary || reIsOctal.test(value))
        ? parseInt(value.slice(2), isBinary ? 2 : 8)
        : (reIsBadHex.test(value) ? NaN : +value)

}


export const includes = (arr: any[], val: any) =>
    arr.some((arrVal) => val === arrVal)


export function merge<T extends {}>(obj: Partial<T> = {}, defaults: T): T {
    for (const key in defaults) {
        if (typeof obj[key] === "undefined") {
            obj[key] = defaults[key]
        }
    }
    return obj as T
}


export function zip(date: string[], format: string[]) {
    const zippedArr = [],
        len = Math.min(date.length, format.length)

    for (let i = 0; i < len; i++) {
        zippedArr.push([date[i], format[i]])
    }

    return zippedArr
}


/**
 * Avoid extra data in objects by picking only the keys that are needed.
 * @param obj Object to pick from
 * @param keys keys of the object that you want to pick
 * @returns
 */
export function pick<T extends {}, D extends (keyof T)>(obj: T, keys: D[]): Pick<T, D> {
    const pt: Partial<T> = {}
    for (const key of keys) {
        pt[key] = obj[key]
    }
    return pt as Pick<T, D>
}
