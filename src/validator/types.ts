declare const $NestedValue: unique symbol




export type NestedValue<TValue extends any[] | object = any[] | object> = {
    [$NestedValue]: never
} & TValue

export type EmptyObject = { [K in string | number]: never }

export type Primitive = string | boolean | number | symbol | null | undefined



export type FieldValues = Record<string, any>






export interface MatchType {
    "bigint": BigInt
    "boolean": boolean
    "function": (...args: any[]) => any
    "number": number
    "object": object
    "string": string
    "symbol": symbol
    "undefined": undefined,
}





