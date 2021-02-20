
import { Primitive } from './types'
import { isNullOrUndefined } from './isNullOrUndefined'


export function isPrimitive(value: unknown): value is Primitive {
    return isNullOrUndefined(value) || !(typeof value === "object")
}

