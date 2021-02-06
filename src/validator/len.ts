/**
* Returns true if the length of the argument as string is less than or equal to the max_lenght parameter.
* @param arg string
* @param max_length max lenght of the argument for it to be consirered valid.
* @example
* Validator.isLenghtLessThan("wilfred", 4) //return false
* Validator.isLenghtLessThan("hi", 4) //return true
* 
*/
export function maxLength(arg: any, max_length: number) {
    return (typeof arg === "string" ||
        typeof arg === "number") && String(arg).length <= max_length
}

/**
* Returns true if the length of the argument as string is greater than or equal to the min_lenght parameter.
* @param arg string
* @param min_length min lenght of the argument for it to be consirered valid.
* @example
* Validator.isLenghtGreaterThan("wilfred", 4) //return true
* Validator.isLenghtGreaterThan("hi", 4) //return false
* 
*/
export function minLength(arg: any, min_length: number) {
    return (typeof arg === "string" ||
        typeof arg === "number") && String(arg).length >= min_length
}


/**
 * check if the string's length falls in a range.
 * @param arg  string to verify
 * @param options  ({min:0, max: 100000})
 */

export function isLength(arg: any, options = { min: 0, max: 100000 }) {
    return (typeof arg === "string" ||
        typeof arg === "number") &&
        String(arg).length >= options.min && String(arg).length <= options.max
}