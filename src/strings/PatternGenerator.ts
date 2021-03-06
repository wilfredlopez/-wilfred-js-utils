type PatternGroup = 'A' | 'a' | 9 | 'X' | 'x' | '#'
/**
   * Creates a Pattern Generator that returns random strings with the especified pattern.
   * If you would like to use reserved characters in you pattern you can quote it with single quotes, for example:
   * @example
   * const xmasCodes = new PatternGenerator("'XMAS'-XXXXX")
   * console.log(xmasCodes.next) //XMAS-4K9LN
   * const codes = [];
      while (codes.length < 1000) {
      codes.push(xmasCodes.next);
      }
   * @example
   * const pg = new PatternGenerator("AAA-99999")
    console.log(pg.next) // UAD-28986 
    console.log(pg.next) //FQH-78470 
    console.log(pg.next) // LWR-88988 
   */
export class PatternGenerator {
  pattern: string
  #combinations: number
  #placeholders = {
    A: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    a: 'abcdefghijklmnopqrstuvwxyz',
    '9': '0123456789',
    X: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    x: 'abcdefghijklmnopqrstuvwxyz0123456789',
    '#': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  } as const
  #cache: { [key: string]: boolean } = {}
  #maxAttempts = 0xbad
  /**
   *
   * @param pattern a string containing the accepted patterns. for exampe AAA-99999. this would generate something like EGX-78797
   * @A	for uppercase letters
   * @a	for lowercase letters
   * @9	for digits
   * @X	for uppercase letters + digits
   * @x	for lowercase letters + digits
   * @#	for uppercase and lowercase letters + digits
   */
  constructor(pattern: string) {
    this.pattern = pattern
    this.#combinations = this.countCombinations(this.pattern)
  }

  get maxAttempts() {
    return this.#maxAttempts
  }

  get next() {
    let attempt = 0
    let code: string
    do {
      code = this.randomCode(this.pattern)
    } while (this.#cache[code] && ++attempt < this.#maxAttempts)

    this.#cache[code] = true

    if (attempt === this.#maxAttempts) {
      throw new Error('PatternGenerator: cannot generate next unique code.')
    }

    return code
  }
  reset() {
    this.#cache = {}
  }
  get combinations() {
    return this.#combinations
  }

  private randomInt(max: number) {
    return Math.floor(Math.random() * max)
  }

  private randomElem(array: string) {
    return array[this.randomInt(array.length)]
  }

  private randomCode(pattern: string) {
    var code = ''
    var quote = "'"
    var quoteOpen = false
    pattern.split('').forEach(c => {
      if (!quoteOpen) {
        if (this.#placeholders[c as PatternGroup]) {
          code += this.randomElem(this.#placeholders[c as PatternGroup])
        } else if (c === quote) {
          quoteOpen = true
        } else {
          code += c
        }
      } else {
        if (c === quote) {
          quoteOpen = false
        } else {
          code += c
        }
      }
    })
    return code
  }

  private countCombinations(pattern: string) {
    var combinations = 1
    var quote = "'"
    var quoteOpen = false
    pattern.split('').forEach(c => {
      if (!quoteOpen) {
        if (this.#placeholders[c as PatternGroup]) {
          combinations *= this.#placeholders[c as PatternGroup].length
        } else if (c === quote) {
          quoteOpen = true
        }
      } else if (c === quote) {
        quoteOpen = false
      }
    })
    return combinations
  }
}

// const pg = new PatternGenerator("'WL'-XXXXX");

// const codes = [];
// console.log(pg.next); //WL-H2QDD
// while (codes.length < 50) {
//   codes.push(pg.next);
// }
// console.log(codes); //[ 'WL-H2QDD', 'WL-LHCO7', 'WL-0EFK6', 'WL-SQU7W',...,'WL-9NYHX' ]  // UAD-28986 (something with this pattern but not exactly)
// console.log(pg.next); //FQH-78470 (something with this pattern but not exactly)
// console.log(pg.next); // LWR-88988 (something with this pattern but not exactly)
