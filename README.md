# Promise APIs

There are four major Promise APIs:

1. **Promise.all()**: It  takes an iterable of elements (usually Promises) as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's             promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error. This is mostly used when we need to make parallel API calls and obtain the results. It takes an array of Promises/Iterables as input. For instance, we have three Promises      P1, P2, P3; P1 takes 3 seconds, P2 takes 1 second, and P3 takes 2 seconds. `Promise.all([P1, P2, P3])`
    - Success Case: If all API calls are successful (fulfilled), it will return an array with all results, e.g., [val1, val2, val3] in 3 seconds (the maximum time taken by API. It waits for all of them to finish).
    - Failure Case: If any one of the Promises gets rejected, `Promise.all()` returns an error. It throws the error which is returned by the failed Promise. It doesn't wait for other Promises to be completed. For example, if P2 gets rejected after 1 second, it doesn't wait for P1 and P3 to finish.
2. **Promise.allSettled()**: Consider the same example of P1, P2, and P3.
    - Success Case: It's the same as `Promise.all()` when all Promises are fulfilled.
    - Failure Case: If P2 gets rejected in 1 second, `Promise.allSettled()` waits for all promises to be settled. It waits for 3 seconds in this case and gives us all the results, e.g., [val1, err, val3].
3. **Promise.race()**: This also takes iterables as input.
    - Success Case: It returns the value of the first settled Promise.
    - Failure Case: If a Promise fails, `Promise.race()` returns the error from the first settled Promise. It doesn't wait for other Promises to finish.
4. **Promise.any()**: This again takes an array of Promises as input. It waits for the first fulfilled Promise.
    - Success Case: It returns the value of the first fulfilled Promise.
    - Failure Case: If all Promises get rejected, the result will be an AggregateError. This error will be an array of all the errors.

**Terms**:

- Fulfilled: Success
- Settled: Either fulfilled or rejected but not pending (operation is completed).
