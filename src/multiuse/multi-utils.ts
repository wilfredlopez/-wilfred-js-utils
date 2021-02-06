
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
