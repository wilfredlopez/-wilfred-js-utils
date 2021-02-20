import { getProp } from './getProp'

describe('keyprop', () => {
    test('should return proper value', () => {
        const obj = {
            name: 'John',
            age: 42,
            friends: {
                bestFriend: "Wilfred"
            },
            cars: [
                { make: 'Ford', age: 10 },
                { make: 'Trabant', age: 35 }
            ]
        } as const

        let make = getProp(obj, 'cars.1.make')  // 'Trabant'
        let bestFriend = getProp(obj, 'friends.bestFriend')  // 'Trabant'
        expect(make).toBe("Trabant")
        expect(bestFriend).toBe("Wilfred")
    })

})
