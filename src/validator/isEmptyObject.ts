import { isObject } from './isObject'
import { EmptyObject } from './types'

export function isEmptyObject(value: unknown): value is EmptyObject {
    return isObject(value) && !Object.keys(value).length
}