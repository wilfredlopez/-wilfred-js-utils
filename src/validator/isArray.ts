export function isArray<T extends any>(arg: any): arg is Array<T> {
    return arg instanceof Array
}