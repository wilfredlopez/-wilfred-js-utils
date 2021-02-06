import { getAsString } from '../strings'
export function getAsNumber(value: any): number | undefined {
    const result = getAsString(value)
    if (!result) {
        return undefined
    }
    const num = parseInt(result)
    if (isNaN(num)) {
        return undefined
    }
    return num
}