/**
 * Javascript Map with timeout and max size functionality.
 * @param options.maxCacheSize cap for the size of the cache. cache will be cleared by half when max size is reached.
 * @param options.ttl number in milliseconds for total live of the cache. example: { ttl: 10 * 60 * 1000 } cached for at most 10 minutes
 */
export class TempMap<K = any, T = any>{
    private cache: Map<K, T>
    private maxCacheSize: number
    private ttl?: number
    private timeouts: Map<K, number>
    constructor({ ttl, maxCacheSize = 255 }: { ttl?: number, maxCacheSize?: number } = {}) {
        this.ttl = ttl
        this.maxCacheSize = maxCacheSize
        this.cache = new Map()
        this.timeouts = new Map()
    }

    private setTimeout(key: K) {
        if (this.ttl) {
            this.timeouts.set(key, Date.now() + this.ttl)
            // this.timeouts[JSON.stringify(key)] = Date.now() + this.ttl
        } else {
            this.timeouts.set(key, Infinity)
            // this.timeouts[JSON.stringify(key)] = Infinity
        }
    }

    private validate() {
        if (this.cache.size >= this.maxCacheSize) {
            var half = Math.floor(this.cache.size / 2)

            for (var i = 0; i < half; i++) {
                const nextKey = this.cache.keys().next().value
                this.cache.delete(nextKey)
            }
        }


    }

    public get size() {
        return this.cache.size
    }
    public clear() {

        this.cache.clear()
        return this
    }

    public keys() {
        return [...this.cache.keys()] as K[]
    }
    public forEach(callbackfn: (value: T, key: K, map: Map<K, T>) => void, thisArg: any) {
        return this.cache.forEach(callbackfn, thisArg)
    }
    public entries() {
        return this.cache.entries()
    }
    public delete(key: K) {
        return this.cache.delete(key)
    }
    public set(key: K, value: T) {
        this.validate()
        this.setTimeout(key)

        this.cache.set(key, value)
        return this
    }
    public has(key: K) {
        return this.cache.has(key)
    }
    public get(key: K) {
        // const tm = this.timeouts[JSON.stringify(key)]
        const tm = this.timeouts.get(key) || Infinity
        const keyInTimeRange = (!this.ttl || tm > Date.now())

        if (this.cache.has(key) && keyInTimeRange) {
            return this.cache.get(key)
        }
        if (this.cache.has(key) && !keyInTimeRange) {
            this.cache.delete(key)
        }
        this.validate()
    }
}