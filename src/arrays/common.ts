import { isArray } from '../validator/isArray'

export function last<T extends any>(array: T[]) {
    const length = array == null ? 0 : array.length
    return length ? array[length - 1] : undefined
}

export function map<T extends any>(
    array: T[],
    iteratee: (value: T, index: number, array: T[]) => void
) {
    let index = -1
    const length = array == null ? 0 : array.length
    const result: any[] = new Array<T>(length)

    while (++index < length) {
        result[index] = iteratee(array[index], index, array)
    }
    return result as T[]
}

export function dropRightTimes(n: number): <A>(as: ReadonlyArray<A>) => ReadonlyArray<A> {
    return (as) => as.slice(0, as.length - n)
}

export interface Predicate<A> {
    (a: A): boolean
}


export function allValuesInArrayAreEqual(arg: any[]): boolean {
    if (!isArray(arg)) {
        throw new Error('Arg is not an array')
    } else {
        return arg.every((value, _index, array) => value === array[0])
    }
}

export const spanIndexUncurry = <A>(as: ReadonlyArray<A>, predicate: Predicate<A>): number => {
    const l = as.length
    let i = 0
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break
        }
    }
    return i
}
