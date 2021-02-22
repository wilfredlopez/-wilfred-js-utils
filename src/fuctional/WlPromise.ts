
const states = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
} as const
type States = "pending" | "fulfilled" | "rejected"

const isThenable = (maybePromise: any): maybePromise is WlPromise => maybePromise && typeof maybePromise.then === 'function'


type ThenQueueType<S, F> = [WlPromise<S, F>, ((value: S) => void | S | WlPromise<S, F>) | undefined, ((reason: F) => void | F | WlPromise<S, F>) | null]

export class WlPromise<S = any, F = any>{
    protected _state: States = states.PENDING;
    protected _value: S | undefined = undefined;
    protected _reason: F | undefined = undefined;
    protected _thenQueue: Array<ThenQueueType<S, F>> = []
    protected _finallyQueue: [WlPromise<S, F>, () => void][] = [];
    constructor(computation?: (resolve: (value: S) => void, reject: (value: F) => void) => void) {
        if (typeof computation === 'function') {
            setImmediate(() => {
                try {
                    computation(
                        this._onFulfilled.bind(this),
                        this._onRejected.bind(this)
                    )
                } catch (ex) {
                    this._onRejected(ex)
                }
            })
        }
    }

    public then(fulfilledFn?: ((value: S) => void | S | WlPromise<S, F>), catchFn: ((reason: F) => void | F | WlPromise<S, F>) | null = null): WlPromise<S, F> {
        const controlledPromise = new WlPromise<S, F>()
        this._thenQueue.push([controlledPromise, fulfilledFn, catchFn])

        if (this._state === states.FULFILLED) {
            this._propagateFulfilled()
        } else if (this._state === states.REJECTED) {
            this._propagateRejected()
        }

        return controlledPromise as WlPromise<S, F>
    }

    public catch(catchFn: (value: F) => void) {
        return this.then(undefined, catchFn)
    }

    [Symbol.toStringTag] = 'WlPromise'

    public finally(sideEffectFn: () => void) {
        if (this._state !== states.PENDING) {
            sideEffectFn()

            return this._state === states.FULFILLED
                ? WlPromise.resolve(this._value)
                : WlPromise.reject(this._reason)
        }

        const controlledPromise = new WlPromise<S, F>()
        this._finallyQueue.push([controlledPromise, sideEffectFn])

        return controlledPromise
    }

    static resolve<T>(value: T) {
        return new WlPromise<T, any>(resolve => resolve(value))
    }
    static reject<E>(reason: E) {
        return new WlPromise<any, E>((_, reject) => reject(reason))
    }

    private _propagateFulfilled() {
        this._thenQueue.forEach(([controlledPromise, fulfilledFn]) => {
            if (typeof fulfilledFn === 'function') {
                const valueOrPromise = fulfilledFn(this._value!)

                if (isThenable(valueOrPromise)) {
                    valueOrPromise.then(
                        value => controlledPromise._onFulfilled(value),
                        reason => controlledPromise._onRejected(reason)
                    )
                } else {
                    controlledPromise._onFulfilled(valueOrPromise as any)
                }
            } else {
                return controlledPromise._onFulfilled(this._value!)
            }
        })

        this._finallyQueue.forEach(([controlledPromise, sideEffectFn]) => {
            sideEffectFn()
            controlledPromise._onFulfilled(this._value!)
        })

        this._thenQueue = []
        this._finallyQueue = []
    }

    private _propagateRejected() {
        this._thenQueue.forEach(([controlledPromise, _, catchFn]) => {
            if (typeof catchFn === 'function') {
                const valueOrPromise = catchFn(this._reason!)

                if (isThenable(valueOrPromise)) {
                    valueOrPromise.then(
                        value => controlledPromise._onFulfilled(value),
                        reason => controlledPromise._onRejected(reason)
                    )
                } else {
                    controlledPromise._onFulfilled(valueOrPromise as any)
                }
            } else {
                return controlledPromise._onRejected(this._reason!)
            }
        })

        this._finallyQueue.forEach(([controlledPromise, sideEffectFn]) => {
            sideEffectFn()
            // controlledPromise._onRejected(this._value!)
            controlledPromise._onRejected(this._reason!)
        })

        this._thenQueue = []
        this._finallyQueue = []
    }


    private _onFulfilled(value: S) {
        if (this._state === states.PENDING) {
            this._state = states.FULFILLED
            this._value = value
            this._propagateFulfilled()
        }
    }

    private _onRejected(reason: F) {
        if (this._state === states.PENDING) {
            this._state = states.REJECTED
            this._reason = reason
            this._propagateRejected()
        }
    }

}
