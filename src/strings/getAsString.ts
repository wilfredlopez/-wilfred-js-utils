import { isObject } from '../validator/isObject'
export function getAsString(value: any): string | undefined {
    if (!value) {
        return undefined
    }
    if (Array.isArray(value)) {
        return getAsString(value[0])
    }
    if (isObject(value)) {
        return undefined
    }
    return value
}
