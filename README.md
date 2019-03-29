# Fucktion
Allows you to operate promise and non-promise values directly as arguments to a function that accepts only non-promise values.

  * Do you have a synchronous function which operates only on scalar values and doesn't understand about promises?
  * Do you want to operate promises or mix
promises with other scalar values thought it?

**Fuck it!!!**

    const myFuncSync = fucktion.sync(myFunc);
    const result = myFuncSync("foo", Promise.resolve("bar"), ...);


## How does it work?
### Installation
```bash
npm install --save fucktion
# or
yarn add fucktion
```

### Usage
```js
const { promise, callback, sync } = require("fucktion");

// Returns promisory.
const funcPromise = fucktion.promise(func);
funcPromise(1, 2).then(result => ...);

// Returns async function (adds callback parameter).
const funcCallback = fucktion.cbk(func);
funcCallback(1, 2, (error, result) => ...);

// Returns "deasync"ed function..
const funcSync = fucktion.sync(func);
const result = funcSync(1, 2);
```

### Example
```js
const { promise, callback, sync} = require("fucktion");
const max = fucktion.sync(Math.max);

setTimeout(() => {
  console.log("...note that Event Loop was not stopped...");
}, 2000);

console.log("And the maximum increased by 5 is....");
const m = max(
  10,                    // Scalar value.
  Promise.resolve(23),   // Resolved promise.
  44,                    // Another scalar value.
  Promise.resolve(7),    // Another resolved promise.
  new Promise(           // Pending promise.
    resolve => setTimeout(() => resolve(37), 3000)
  )
);

console.log(m + 5);
console.log ("Done!!");
```

**Output:**
```
And the maximum increased by 5 is....
...note that Event Loop was not stopped...
49
Done!!
```

