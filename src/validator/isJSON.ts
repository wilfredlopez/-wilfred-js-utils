import { merge } from '../multiuse'
import { isString } from './isString'

export function isJSON(str: string, options: { allow_primitives?: boolean } = {}) {
    if (!isString(str)) {
        return false
    }
    try {
        const default_json_options = {
            allow_primitives: false,
        }
        options = merge(options, default_json_options)
        let primitives: any[] = []
        if (options.allow_primitives) {
            primitives = [null, false, true]
        }

        const obj = JSON.parse(str)
        return primitives.includes(obj) || (!!obj && typeof obj === "object")
    } catch (e) { /* ignore */ }
    return false
}