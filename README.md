# Javascript Utility Functions

<!-- [![npm version](https://badge.fury.io/js/%40wilfredlopez%2Fjs-utils.svg)](https://badge.fury.io/js/%40wilfredlopez%2Fjs-utils) -->
<div style="display:grid;grid-gap:1rem;grid-auto-flow:column;width:100%;justify-content:space-between; align-items:center;">
<div>
<a style="display:block;z-index:1;" href="https://badge.fury.io/js/%40wilfredlopez%2Fjs-utils"><img style="background:transparent;" src="https://badge.fury.io/js/%40wilfredlopez%2Fjs-utils.svg" alt="npm version" height="18"></a>
</div>
<div>

<a  href="https://twitter.com/intent/follow?screen_name=wilfreddonaldlo"><img style="background:transparent;" align="right" src="https://img.shields.io/twitter/follow/wilfreddonaldlo?style=social&label=Follow%20@wilfreddonaldlo" alt="Follow on Twitter"></a>

  </div>

</div>
<!-- A spacer -->
<p>&nbsp;</p>

#### Install

###### NPM

```
npm install @wilfredlopez/js-utils
```

###### Script Tag

```html
<script src="https://unpkg.com/@wilfredlopez/js-utils@latest/dist/index.umd.js"></script>
<script type="text/javascript">
  console.log(JsUtils.Cipher)
</script>
```

###### ES6

## Validator

```ts
import { Validator } from "@wilfredlopez/js-utils"

Validator.isEmail('bad@notemail'); //false
Validator.isEmail('test@gmail.com'); //true
Validator.isNotEmptyString(""); //false
Validator.isNotEmptyString("some data")); //true
Validator.isDate("10/20/2020", "MM/DD/YYYY") //true
Validator.isDate("2020/01/01") //true;
Validator.isDate("anyInvalidDate") //false;
Validator.isInt("2.1") //false
Validator.isPort(5000) //true
Validator.isPort(10.1) //false
Validator.isPort(80000000) //false
Validator.isURL("https://www.wilfredlopez.net") //true
Validator.isURL("www.test.com")//true
Validator.isURL("www.test.") //false
```

## memoize

```ts
import { memoize } from '@wilfredlopez/js-utils'

const fibMemo = memoize(function (n: number): number {
  if (n <= 2) return 1
  return fibMemo(n - 1) + fibMemo(n - 2)
})

console.log(fibMemo(20)) //6765
console.log(fibMemo(30)) //832040
console.log(fibMemo(20)) //6765;
console.log(fibMemo(100)) //354224848179262000000
console.log(
  fibMemo.cache.size //100
)
```

## Mapper

```ts
import { Mapper } from '@wilfredlopez/js-utils'

const initialData = {
  test1: 1,
  test2: 2,
}
const dataMap = new Mapper<number, string>(initialData)
console.log(dataMap.length) //2
console.log(dataMap.set('test3', 3).delete('test1')) //1
console.log(dataMap.has('test1')) //false
console.log(dataMap.get('test2')) //2
console.log(dataMap.isEmpty()) //false
dataMap.map(val => {
  console.log(val) // 2, 3
})
```

## StringHelper & NumberHelper

```ts
import { StringHelper, NumberHelper } from '@wilfredlopez/js-utils'
StringHelper.slogify('hello world') //"hello-world";
StringHelper.toProperCase(' hello world 2') //" Hello World 2";
const pg = new PatternGenerator("'WL'-XXXXX")

const codes = []
console.log(pg.next) //WL-H2QDD
while (codes.length < 50) {
  codes.push(pg.next)
}
console.log(codes) //[ 'WL-H2QDD', 'WL-LHCO7', 'WL-0EFK6', 'WL-SQU7W',...,'WL-9NYHX' ]

NumberHelper.formatDuration(10000) //"02:46:40";
const arr = [...NumberHelper.range({ start: 0, end: 10 })]
console.log(arr) // [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

const iter = ArrayHelper.createReverseArrayIterator([1, 2, 3, 4])
for (let i of iter) {
  console.log(i) // 4,3,2,1
}
console.log(NumberHelper.isPrime(7)) //true
console.log(NumberHelper.isPrime(20)) //false
```

# DeepCopy

```ts
import { deepCopy } from '@wilfredlopez/js-utils'

const originalUser = { name: 'SOMEONE' }
const original = { api: { db: { users: [{ user: originalUser }] } } }

const copy = deepCopy(original)
const regularCopy = Object.assign({}, data)
originalUser.name = 'FULANO'
console.log(copy.api.db.users[0].user.name) // SOMEONE (DEEP COPY)
console.log(original.api.db.users[0].user.name) // FULANO (MUTATED)
console.log(regularCopy.api.db.users[0].user.name) // FULANO (MUTATED)
```

### Assertions

```ts
import {
  AssertionError,
  assert,
  assertIsString,
  forceString,
} from '@wilfredlopez/js-utils'

const error = new AssertionError('message')

const n = 1
function doSomething(value) {
  assert(typeof n === 'number')
  return n + 20
}
doSomething('string') //throws error

function sendMessage(message: any) {
  assertIsString(message) //throws error if not string
  message.trim() //will give you auto-complete for string type
}
```

## assertNever

```ts
import { assertNever } from '@wilfredlopez/js-utils'
enum AppActions {
  'SET_STATE',
  'ADD',
  'REMOVE',
}
interface Actions {
  type: AppActions
  payload: any
}

export function myReducer(state = {}, action: Actions): {} {
  switch (action.type) {
    case AppActions.SET_STATE:
      return { ...state, ...action.payload }
    case AppActions.ADD:
      return { ...state }
    case AppActions.REMOVE:
      return {
        ...state,
      }
    default:
      assertNever(action.type, 'Not all actions are being handled.')
      return state
  }
}
```

### Random Generator (for test data)

```ts
import { RandomGenerator } from '@wilfredlopez/js-utils'

const dg = new RandomGenerator({
  animals: ['dog', 'panda', 'cat'],
})

console.log(dg.from('animals')) //cat
console.log(dg.from('animals')) //dog
```

### Other Utilities

- [`pick`] - pick properties from an object.

```ts
import { pick } from '@wilfredlopez/js-utils'

const user = {
  name: 'name',
  email: 'string',
  other: 'other',
}
const properUser = pick(user, ['name', 'email'])

console.log(properUser.email)
```

- [`RoutePathGetter`] - Class to orginize the router paths of an application.

```ts
import { RoutePathGetter } from '@wilfredlopez/js-utils'
//Creating Instance
const appRoutes = new RoutePathGetter({
  home: {
    value: '/',
  },
  profile: {
    value: '/profile/:id',
    params: {
      id: '',
    },
  },
})
//Using Instance with Type Safety
appRoutes.path('profile', {
  params: {
    id: '1',
  },
}) // returns '/profile/1
// appRoutes.path('profile', { params:  {ss:''}}) // TypeError: Object literal may only specify known properties, and 'ss' does not exist in type '{ id: string; }'
appRoutes.path('home') // returns '/'
// appRoutes.path('other'); // Argument of type '"other"' is not assignable to parameter of type 'RouteKeys'.
```

- [`debounce`] - Debounce function

- [`throttle`] - Throttle function

- [`dropRightWhile`] - Creates a slice of array excluding elements dropped from the end. Elements are dropped until predicate returns falsey.
