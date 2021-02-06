
/**
 * Detect the indexes of a Readonly Array
 */
export type IndexOf<T extends ReadonlyArray<any>, S extends number[] = []> =
    T['length'] extends S['length'] ? S[number] : IndexOf<T, [S['length'], ...S]>



/**
 * Detect keys of an object that are functions
 */
export type FunctionKeys<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T]
export type SubSet<A extends {}, B extends {}> = {
    [P in keyof B]: P extends keyof A ? (B[P] extends A[P] | undefined ? A[P] : never) : never
}

/**
 * Make Strict restringtion over the type
 * @example
 * function createUserStrict<T extends Strict<User, T>>(user: T) {}
 */
export type Strict<A extends {}, B extends {}> = SubSet<A, B> & SubSet<B, A>


