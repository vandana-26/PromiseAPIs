# Promise APIs

There are four major Promise APIs:

1. **Promise.all()**: It  takes an iterable of elements (usually Promises) as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's             promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error. This is mostly used when we need to make parallel API calls and obtain the results. It takes an array of Promises/Iterables as input. For instance, we have three Promises      P1, P2, P3; P1 takes 3 seconds, P2 takes 1 second, and P3 takes 2 seconds. `Promise.all([P1, P2, P3])`
    - Success Case: If all API calls are successful (fulfilled), it will return an array with all results, e.g., [val1, val2, val3] in 3 seconds (the maximum time taken by API. It waits for all of them to finish).
    - Failure Case: If any one of the Promises gets rejected, `Promise.all()` returns an error. It throws the error which is returned by the failed Promise. It doesn't wait for other Promises to be completed. For example, if P2 gets rejected after 1 second, it doesn't wait for P1 and P3 to finish.
2. **Promise.allSettled()**: The Promise.allSettled() method returns a promise that resolves after all of the given   promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

However, if and only if an empty iterable is passed as an argument, Promise.allSettled() returns a Promise object that has already been resolved as an empty array.

For each outcome object, a status string is present. If the status is 'fulfilled', then a value is present. If the status is 'rejected', then a reason is present. The value (or reason) reflects what value each promise was fulfilled (or rejected) with.
    Consider the same example of P1, P2, and P3.
    - Success Case: It's the same as `Promise.all()` when all Promises are fulfilled.
    - Failure Case: If P2 gets rejected in 1 second, `Promise.allSettled()` waits for all promises to be settled. It waits for 3 seconds in this case and gives us all the results, e.g., [val1, err, val3].
    
3. **Promise.race()**: The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

If the iterable passed is empty, the promise returned will be forever pending.

If the iterable contains one or more non-promise value and/or an already settled promise, then Promise.race() will resolve to the first of these values found in the iterable.This also takes iterables as input.
    - Success Case: It returns the value of the first settled Promise, if its rejected or success.
    - Failure Case: If a Promise fails, `Promise.race()` returns the error from the first settled Promise. It doesn't wait for other Promises to finish.
4. **Promise.any()**: Promise.any() takes an iterable of elements (usually Promises). It returns a single promise that resolves as soon as any of the elements in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given elements are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.

If an empty iterable is passed, then the promise returned by this method is rejected synchronously. The rejected reason is an AggregateError object whose errors property is an empty array. This again takes an array of Promises as input. It waits for the first fulfilled Promise.
    - Success Case: It returns the value of the first fulfilled Promise.
    - Failure Case: If all Promises get rejected, the result will be an AggregateError. This error will be an array of all the errors.

**Terms**:

- Fulfilled: Success
- Settled: Either fulfilled or rejected but not pending (operation is completed).
