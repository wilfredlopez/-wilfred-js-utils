import { MatchType } from './types'

export function isTypeof<T extends keyof MatchType>(value: any, condition: T): value is MatchType[T] {
    return typeof value === condition
}