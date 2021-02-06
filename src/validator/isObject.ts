import { isArray } from './isArray'
import { isNullOrUndefined } from './isNullOrUndefined'

export function isObject(arg: any): arg is object {
    return !isNullOrUndefined(arg) && !isArray(arg) &&
        typeof arg === "object"
}