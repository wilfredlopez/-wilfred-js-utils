import { Validator } from '..'
export function getAsString(value: any): string | undefined {
    if (!value) {
        return undefined
    }
    if (Array.isArray(value)) {
        return getAsString(value[0])
    }
    if (Validator.isObject(value)) {
        return undefined
    }
    return value
}
