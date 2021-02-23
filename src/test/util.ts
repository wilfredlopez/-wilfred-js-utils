export const wait = (cb: () => void, { timeout = 1000 }: { timeout?: number }) => {
    return new Promise((res) => setTimeout(() => {
        cb()
        res(timeout)
    }, timeout))
}