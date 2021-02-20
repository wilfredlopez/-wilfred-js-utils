import type { PathKeys, PropType } from './utility-types'

// declare function getProp<T, P extends PathKeys<T>>(obj: T, path: P): PropType<T, P>
export function getProp<T, P extends PathKeys<T>>(obj: T, path: P): PropType<T, P> {
    // const obj = {
    //      cars: [{ make: 'Ford', age: 10 },{ make: 'Trabant', age: 35 }]
    // } as const

    //path = 'cars.1.make' => ['cars', '1', 'make']
    const paths = path.split('.') as (keyof T)[]
    let search: any = null
    for (const key of paths) {
        if (search === null) {
            search = obj[key] // obj['cars']
        } else {
            search = search[key] //search[1] | search['make']
        }
    }
    return search // 'Trabant'
}

// const obj = {
//     name: 'John',
//     age: 42,
//     cars: [
//         { make: 'Ford', age: 10 },
//         { make: 'Trabant', age: 35 }
//     ]
// } as const

// let make = getProp(obj, 'cars.1.make')  // 'Trabant'