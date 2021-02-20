import { isArray } from '../validator/isArray'
import type { Head, Last } from '../utility-types'

// type Tail<T extends readonly unknown[]> = T extends readonly [any, ...infer U] ? U : [...T]

// type Init<T extends readonly unknown[]> = T extends readonly [...infer U, any] ? U : [...T]

export function last<T extends readonly unknown[]>(array: T): Last<T> {
    const len = Array.isArray(array) ? array.length : -1
    return array[len - 1] as Last<T>
}

export function first<A extends readonly unknown[]>(arr: A): Head<A> {
    return arr[0]
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



