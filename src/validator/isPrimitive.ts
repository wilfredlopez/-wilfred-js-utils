import { isNullOrUndefined } from 'util'
import { Primitive } from './types'

export function isPrimitive(value: unknown): value is Primitive {
    return isNullOrUndefined(value) || !(typeof value === "object")
}