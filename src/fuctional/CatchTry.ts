import { WlPromise } from './WlPromise'

export interface Success<E> {
    readonly _tag: 'Success'
    readonly success: E
}

export interface Failure<A> {
    readonly _tag: 'Failure'
    readonly failure: A
}

export type CatchTry<Catch, Try> = Failure<Catch> | Success<Try>

export function success<E = never, A = never>(value: A): CatchTry<E, A> {
    return {
        _tag: "Success",
        success: value
    }
}

//should i return a Faiture<E> instead of CatchTry<E, A> ?
export function failure<E = never, A = never>(value: E): CatchTry<E, A> {
    return {
        _tag: "Failure",
        failure: value
    }
}
// export const _success = <E = never, A = never>(e: A): CatchTry<E, A> => ({ _tag: "Success", success: e })
// export const _failure = <E = never, A = never>(e: E): CatchTry<E, A> => ({ _tag: "Failure", failure: e })



/**
 * returns true when is a success.
 * guard for TryCatch type
 */
export const isFailure = <E, A>(ma: CatchTry<E, A>): ma is Failure<E> => ma._tag === "Failure"

/**
 * returns true and when is a failure
 * guard for TryCatch type
 */
export const isSuccess = <E, A>(ma: CatchTry<E, A>): ma is Success<A> => ma._tag === "Success"


export function exists<A>(predicate: (value: A) => boolean): <E>(ma: CatchTry<E, A>) => boolean {
    return (ma) => (isFailure(ma) ? false : predicate(ma.success))
}


const innerChain = <D, A, B>(f: (a: A) => CatchTry<D, B>) => <E>(ma: CatchTry<E, A>): CatchTry<D | E, B> =>
    isFailure(ma) ? ma : f(ma.success)

/**
 * chains into the pipe function is value is a success or returns the failure.
 */
export const chain: <E, A, B>(f: (a: A) => CatchTry<E, B>) => (ma: CatchTry<E, A>) => CatchTry<E, B> = innerChain


// export function onCatchTry<Fail, Succe>(value: CatchTry<Fail, Succe>, success: (value: Succe) => void, failure?: (value: Fail) => void,) {
//     if (isFailure(value)) {
//         if (failure) {
//             failure(value.failure)
//         }
//     } else {
//         success(value.success)
//     }
// }

export function onSuccess<Fail, Succe>(value: CatchTry<Fail, Succe>): WlPromise<Succe, Fail> {

    return new WlPromise<Succe, Fail>((res, rej) => {
        if (isFailure(value)) {
            rej(value.failure)
        } else {
            res(value.success)
        }
    })
    // return new Promise<Succe>((res, reject: (reason: Fail) => void) => {
    //     if (isFailure(value)) {
    //         reject(value.failure)
    //     } else {
    //         res(value.success)
    //     }
    // })
}




