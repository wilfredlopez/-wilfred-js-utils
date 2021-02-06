import isUrl from "./isUrl"
import isIP from "./isIP"
import isPostalCode from "./isPostalCode"
import { ArrayHelper } from "../arrays"
import { isSerializable } from "./isSerializable"
import { isDeepEqual, isDeepEqualReact } from "./isDeepEqual"
import { alpha, alphanumeric, decimal } from "./constants"
import { merge, includes, zip } from "../multiuse"
import { isEmail } from './isEmail'
import { isJSON } from './isJSON'
import { isString } from './isString'
import { isTypeof } from './isTypeOf'
import { isPrimitive } from './isPrimitive'
import { isNullOrUndefined } from './isNullOrUndefined'
import { isEmptyObject } from './isEmptyObject'
import { isObject } from './isObject'
import { isArray } from './isArray'
import { isFileInput } from './isFileInput'
import { maxLength, minLength, isLength } from './len'
import { isEmpty, isUndefined } from './multi'

/**
 * Validator
 */
export const Validator = {
  isEmail,
  isTypeof,
  isPostalCode,
  isPrimitive,
  isString,
  isArray,
  isJSON,
  isNullOrUndefined,
  isObject,
  isEmptyObject,
  isFileInput: isFileInput,
  isDeepEqual,
  // isDeepEqual: isDeepEqualWilfred,
  isDeepEqualReact,
  isSerializable,
  minLength,
  maxLength,
  isLength: isLength,
  isEmpty: isEmpty,
  isHTMLElement: (value: any): value is HTMLElement =>
    value instanceof HTMLElement
  ,
  isNotEmptyString(arg: any): arg is string {
    return typeof arg === "string" && arg.trim() !== ""
  },
  isRegex: (value: unknown): value is RegExp => value instanceof RegExp

  ,
  isSameRegex(reg1: RegExp, reg2: RegExp) {
    return reg1.source === reg2.source && reg1.flags === reg2.flags
  },

  /**
   * Check if the string is valid JSON (if it can be parsed to json)
   * @param str 
   * @param options 
   */

  /**
   *  Check if the string contains only letters (a-zA-Z).
   * @param str 
   * @param locale 
   */
  isAlpha(str: string, locale: keyof typeof alpha = "en-US") {
    if (!Validator.isString(str)) {
      return false
    }

    if (locale in alpha) {
      return alpha[locale].test(str)
    }
    throw new Error(`Invalid locale '${locale}'`)
  }

  ,
  toDate(date: string | number) {
    if (!Validator.isString(date)) return null
    date = Date.parse(date)
    return !isNaN(date) ? new Date(date) : null
  }
  /**
   * check if the string is a date that's after the specified date (defaults to now).
   * @param value value to evaluate
   * @param date  specified date (defaults to now).
   * @example
   * const before = "10/20/2020";
   * const after = "11/20/2020";
   * expect(Validator.isAfter(before, after)).toBe(false);
   * expect(Validator.isAfter(after, before)).toBe(true);
   * expect(Validator.isAfter("1/1/9000")).toBe(true);
   */
  ,
  isAfter(value: string, date = String(new Date())) {
    if (!Validator.isString(value)) return false
    const comparison = Validator.toDate(date)
    const original = Validator.toDate(value)
    return !!(original && comparison && original > comparison)
  }
  /**
   * check if the string is a date that's before the specified date.
   * @param value value to evaluate
   * @param date specified date (defaults to now).
   */
  ,
  isBefore(value: string, date = String(new Date())) {
    if (!Validator.isString(value)) return false
    const comparison = Validator.toDate(date)
    const original = Validator.toDate(value)
    return !!(original && comparison && original < comparison)
  }
  /**
   * check if the fullString contains the value. 
   * @param fullString entire string to evaluate if contains the value.
   * @param value seed
   * @param options options is an object that defaults to { ignoreCase: false}.  ignoreCase specified whether the case of the substring be same or not.
   */
  ,
  contains(
    fullString: string,
    value: string,
    options: { ignoreCase?: boolean } = {},
  ) {
    if (!Validator.isString(fullString)) return false
    if (!Validator.isString(value)) return false
    const defaulContainsOptions = {
      ignoreCase: false,
    }
    options = merge(options, defaulContainsOptions)
    return options.ignoreCase
      ? fullString.toLowerCase().indexOf(value.toLowerCase()) >= 0
      : fullString.indexOf(value) >= 0
  }
  /**
   * check if the string matches the comparison.
   * @param str 
   * @param comparison 
   */
  ,
  equals(str: string, comparison: string) {
    if (!Validator.isString(str)) return false
    if (!Validator.isString(comparison)) return false
    return str === comparison
  }
  ,
  isValidDateFormat(format: string) {
    return /(^(y{4}|y{2})[\/-](m{1,2})[\/-](d{1,2})$)|(^(m{1,2})[\/-](d{1,2})[\/-]((y{4}|y{2})$))|(^(d{1,2})[\/-](m{1,2})[\/-]((y{4}|y{2})$))/gi
      .test(format)
  }
  /**
   *  Check if the input is a valid date.
   * @param input 
   * @param format  date format Defatuls to YYYY/MM/DD
   * @example
   * expect(Validator.isDate("wilfred lopez", "wilfred")).toBe(false);
   * expect(Validator.isDate("invalid")).toBe(false);
   * expect(Validator.isDate("1/20/20")).toBe(false);
   * expect(Validator.isDate("10/20/2020", "MM/DD/YYYY")).toBe(true);
   * expect(Validator.isDate("2020/01/01")).toBe(true);
   * expect(Validator.isDate("2020/1/1", "YYYY/M/D")).toBe(true);
   */
  ,
  isDate(input: string, format: string = "YYYY/MM/DD") {
    if (typeof input === "string" && Validator.isValidDateFormat(format)) {
      const splitter = /[-/]/,
        dateAndFormat = zip(
          input.split(splitter),
          format.toLowerCase().split(splitter),
        ),
        dateObj: { [key: string]: string } = {}
      for (const [dateWord, formatWord] of dateAndFormat) {
        if (dateWord.length !== formatWord.length) {
          return false
        }

        dateObj[formatWord.charAt(0)] = dateWord
      }

      return new Date(`${dateObj.m}/${dateObj.d}/${dateObj.y}`).getDate() ===
        +dateObj.d
    }

    return Object.prototype.toString.call(input) === "[object Date]" &&
      isFinite(input as any)
  }

  /**
   * check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
   * @param str 
   * @param options 
   */
  ,
  isDecimal(str: string, options: {
    force_decimal?: boolean
    decimal_digits?: string
    locale?: keyof typeof decimal
  } = {}) {
    if (!Validator.isString(str)) return false
    const default_decimal_options = {
      force_decimal: false,
      decimal_digits: "1,",
      locale: "en-US" as keyof typeof decimal,
    }
    const blacklist = ["", "-", "+"]
    const updatedOptions = merge<typeof default_decimal_options>(
      options,
      default_decimal_options,
    )
    function decimalRegExp(options: typeof default_decimal_options) {
      const regExp = new RegExp(
        `^[-+]?([0-9]+)?(\\${decimal[options.locale]
        }[0-9]{${options.decimal_digits}})${options.force_decimal ? "" : "?"}$`,
      )
      return regExp
    }

    if (updatedOptions.locale in decimal) {
      return !includes(blacklist, str.replace(/ /g, "")) &&
        decimalRegExp(updatedOptions).test(str)
    }
    throw new Error(`Invalid locale '${updatedOptions.locale}'`)
  }

  /**
 *  
 * Check if the string is an URL.
 * @param url 
 * @param options options is an object which defaults 
 * to { protocols: ['http','https','ftp'], require_tld: true, require_protocol: false, require_host: true, require_valid_protocol: true, allow_underscores: false, host_whitelist: false, host_blacklist: false, allow_trailing_dot: false, allow_protocol_relative_urls: false, disallow_auth: false }
 * 
 */
  ,
  isURL(
    url: string,
    options: {
      protocols?: string[]
      require_tld?: boolean
      require_protocol?: boolean
      require_host?: boolean
      require_valid_protocol?: boolean
      allow_underscores?: boolean
      host_whitelist?: boolean
      host_blacklist?: boolean
      allow_trailing_dot?: boolean
      allow_protocol_relative_urls?: boolean
      disallow_auth?: boolean
    } = {
        protocols: ["http", "https", "ftp"],
        require_tld: true,
        require_protocol: false,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: false,
        host_whitelist: false,
        host_blacklist: false,
        allow_trailing_dot: false,
        allow_protocol_relative_urls: false,
        disallow_auth: false,
      },
  ) {
    return isUrl.bind(this, url, options).call(this)
  }

  /**
   * check if the string is an IP (version 4 or 6).
   * @param str
   * @param version 4 or 6
   */
  ,
  isIP(str: string, version: string | number = "") {
    return isIP.apply(this, [str, version])
  }

  /**
   * check if string matches the pattern.
   * @param str 
   * @param pattern Either matches('foo', /foo/i) or matches('foo', 'foo', 'i')
   * @param flags 
   * @example
   * Validator.matches("123abc", /[abc]/)) // true
   * Validator.matches("something", /[0-9]/) //false
   */
  ,
  matches(str: string, pattern: string | RegExp, flags?: string) {
    if (!Validator.isString(str)) return false
    let regex: RegExp

    if (Object.prototype.toString.call(pattern) !== "[object RegExp]") {
      pattern = new RegExp(pattern, flags)
    }
    if (pattern instanceof RegExp) {
      regex = pattern
    } else {
      regex = new RegExp(pattern, flags)
    }
    return regex.test(str)
  }

  /**
   * check if the string is a hexadecimal number.
   * @param str 
   */
  ,
  isHexadecimal(str: string) {
    const hexadecimal = /^(0x|0h)?[0-9A-F]+$/i
    return hexadecimal.test(str)
  }
  /**
   * 	check if the string is a valid hex-encoded representation of a MongoDB ObjectId.
   * @param str 
   */
  ,
  isMongoId(str: string) {
    return Validator.isHexadecimal(str) && str.length === 24
  }

  ,
  isBoolean(val: any): val is boolean {
    return (
      val instanceof Boolean ||
      val === true ||
      val === false ||
      typeof val === "boolean"
    )
  }

  ,
  isNumber(arg: any): arg is number {
    return typeof arg === "number"
  }

  ,
  isKey(value: [] | string) {
    return !Validator.isArray(value) &&
      (/^\w*$/.test(value) ||
        !/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/.test(value))
  }

  ,
  isFunction<T extends Function>(arg: any): arg is T {
    return typeof arg === "function"
  }

  ,
  isUndefined: isUndefined
  ,



  /**
   * Returns true of all the characters in the string are in uppercase.
   * Returns false if an empty string is passed or the string has any characters in lowercase.
   * @param {String} string string to verify
   */
  isUppercase(string: any) {
    if (!string || typeof string !== "string") {
      return false
    }
    return string === string.toUpperCase()
  }

  ,
  /**
   * Check if string or number is integer
   * @param str 
   * @param options 
   */
  isInt(str: number | string, options: {
    min?: number
    max?: number
    lt?: number
    gt?: number
    allow_leading_zeroes?: boolean
  } = {}) {
    if (typeof str !== "string" && typeof str !== "number") return false
    options = options || {}
    const int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/
    const intLeadingZeroes = /^[-+]?[0-9]+$/

    // Get the regex to use for testing, based on whether
    // leading zeroes are allowed or not.
    let regex = (
      options.hasOwnProperty("allow_leading_zeroes") &&
        !options.allow_leading_zeroes
        ? int
        : intLeadingZeroes
    )

    // Check min/max/lt/gt
    let minCheckPassed = (!options.min || str >= options.min)
    let maxCheckPassed = (!options.max || str <= options.max)
    let ltCheckPassed = (!options.lt || str < options.lt)
    let gtCheckPassed = (!options.gt || str > options.gt)
    return regex.test(str as any) && minCheckPassed && maxCheckPassed &&
      ltCheckPassed && gtCheckPassed
  }

  /**
   * Check if is a valid port number. should be a integer less than 65535
   * @param port 
   */
  ,
  isPort(port: string | number) {
    return Validator.isInt(port, { min: 0, max: 65535 })
  }



  /**
   * Check if the string is of type slug. Options allow a single hyphen between string. 
   * e.g. [cn-cn, cn-c-c]
   * @param str 
   */
  ,
  isSlug(str: string) {
    if (!Validator.isString(str)) return false
    let charsetRegex = /^[^\s-_](?!.*?[-_]{2,})([a-z0-9-\\]{1,})[^\s]*[^-_\s]$/
    return (charsetRegex.test(str))
  }
  /**
   * Returns true of all the characters in the string are in lowercase.
   * Returns false if an empty string is passed or the string has any characters in uppercase.
   * @param {String} string string to verify
   */
  ,
  isLowerCase(string: any) {
    if (!string || typeof string !== "string") {
      return false
    }
    return string === string.toLowerCase()
  }
  /**
     * Returns true if character is alpha-numeric a-z | A-Z | 0-9
     * @param str single character. if more than one character is passed it will only evaluate the char at position 0.
     */
  ,
  isAlphaNumeric(
    str: string,
    locale: keyof typeof alphanumeric = "en-US",
  ) {
    //Handle called with bad arguments
    if (!str || typeof str !== "string") {
      return false
    }
    if (locale in alphanumeric) {
      return alphanumeric[locale].test(str)
    }
    throw new Error(`Invalid locale '${locale}'`)
  }

  /**
   * @param {number} number
   * @return {boolean}
   */
  ,
  isEven(number: number) {
    //could also be (number % 2) === 0
    //Using & bitwise operator.
    return (number & 1) === 0
  }


  ,
  isOdd(number: number) {
    //but could also be (number % 2) !== 0
    //Using & instead of % here. & represents a bitwise operation.
    return (number & 1) !== 0
  }

  /**
   * Check if number is positive
   * @param {number} number - 32-bit integer.
   * @return {boolean}
   */
  ,
  isPositive(number: number) {
    if (!Validator.isNumber(number)) return false
    // Zero is neither a positive nor a negative number.
    if (number === 0) {
      return false
    }
    // The most significant 32nd bit can be used to determine whether the number is positive.
    return ((number >> 31) & 1) === 0
  }
  /**
   * Returns true or false if the number is prime or not.
   * @param n number to verify
   * @complexity O(log n) :)
   */
  ,
  isPrime(n: number) {
    //base cases
    if (n < 2) return false
    if (n === 2) return true

    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false
      }
    }
    return true
  }
  /**
   * Determines if number is power of 2
   * @param number 
   * @complexity O(1) Constant time.
   * @example
   * console.log(NumberHelper.isPowerOfTwo(16)) //true
   */
  ,
  isPowerOfTwo(number: number): boolean {
    if (number < 1) return false
    return (number & (number - 1)) === 0
  }
}

export function isDeepEqualWilfred(val1: any, val2: any): boolean {
  if (Validator.isRegex(val1) && Validator.isRegex(val2)) {
    return Validator.isSameRegex(val1, val2)
  }
  //JSON Doenst work for deep Regex
  // return JSON.stringify(val1) === JSON.stringify(val2)
  //   if regular equality.
  if (val1 === val2) {
    return true
  }

  if (Validator.isPrimitive(val1) && Validator.isPrimitive(val2)) {
    return val1 === val2
  }

  if (Validator.isArray(val1) && Validator.isArray(val2)) {
    return ArrayHelper.arraysEqual(val1, val2)
  }

  //handle object
  if (Validator.isObject(val1) && Validator.isObject(val2)) {
    const keys1 = Object.keys(val1)
    const keys2 = Object.keys(val2)
    if (keys1.length !== keys2.length) {
      return false
    }
    if (keys1.length === 0) {
      // console.log('both are empty')
      return true
    }
    //handle object equality
    let equal: boolean = true
    while (keys1.length && keys2.length && equal) {
      let k1 = keys1.pop()
      let k2 = keys2.pop()
      equal = Validator.isDeepEqual(
        val1[k1 as keyof object],
        val2[k2 as keyof object],
      )
      if (!equal) {
        return false
      }
    }
    return equal
  }

  return false
}




