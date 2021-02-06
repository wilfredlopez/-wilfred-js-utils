export function isNullOrUndefined(arg: any): arg is undefined {
    return typeof arg === "undefined" || arg === null
}