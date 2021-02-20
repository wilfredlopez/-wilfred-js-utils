
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


export type EventName<S extends string> = `on${Capitalize<S>}Changed`

// type T1 = EventName<'slider'>

export type SnakeToCamelCase<S extends string> =
    S extends `${infer T}_${infer U}` ? `${Lowercase<T>}${SnakeToPascalCase<U>}` :
    S extends `${infer T}` ? `${Lowercase<T>}` :
    SnakeToPascalCase<S>


export type SnakeToPascalCase<S extends string> =
    string extends S ? string :
    S extends `${infer T}_${infer U}` ? `${Capitalize<Lowercase<T>>}${SnakeToPascalCase<U>}` :
    S extends `${infer T}` ? `${Capitalize<Lowercase<T>>}` :
    never

// type T30 = SnakeToPascalCase<'hello_world_foo'>  // 'HelloWorldFoo'
// type T31 = SnakeToPascalCase<'FOO_BAR_BAZ'>  // 'FooBarBaz'
// type T32 = SnakeToCamelCase<'hello_world_foo'>  // 'helloWorldFoo'
// type T33 = SnakeToCamelCase<'FOO_BAR_BAZ'>  // 'fooBarBaz'

export type Head<T extends readonly unknown[]> = T[0]
export type Last<T extends readonly unknown[]> = T extends readonly [...infer _, infer U] ? U : undefined


export type Reverse<T> =
    T extends [] ? T :
    T extends [infer Head, ...infer Tail] ? [...Reverse<Tail>, Head] :
    T

// type T10 = Reverse<[string, number, boolean]> //[boolean, number, string]

export type OnPropChangedMethods<T> = {
    [P in keyof T & string as `${P}Changed`]: (cb: (newValue: T[P]) => void) => void
}

// declare function makeWatchedObject<T>(obj: T): T & OnPropChangedMethods<T>
// let homer = makeWatchedObject({
//     firstName: "Homer",
//     age: 42,
//     location: "Springfield",
// })

// homer.ageChanged()

export type PathKeys<T> =
    object extends T ? string :
    T extends readonly any[] ? Extract<keyof T, `${number}`> | SubKeys<T, Extract<keyof T, `${number}`>> :
    T extends object ? Extract<keyof T, string> | SubKeys<T, Extract<keyof T, string>> :
    never

type SubKeys<T, K extends string> = K extends keyof T ? `${K}.${PathKeys<T[K]>}` : never

export type PropType<T, Path extends string> =
    Path extends keyof T ? T[Path] :
    Path extends `${infer K}.${infer R}` ? K extends keyof T ? PropType<T[K], R> : unknown :
    unknown

// declare function getProp<T, P extends PathKeys<T>>(obj: T, path: P): PropType<T, P>