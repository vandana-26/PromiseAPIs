# PromiseAPIs

There are major 4 Promise API's:

1. Promise.all() -> Mostly used when we have to make parallel API calls and get the results. It takes an array of Promises/Iterables as input.
Consider we have three Promises P1, P2, P3 where P1 takes 3seconds, P2 takes 1 seconds and P3 takes 2 seconds.
Promise.all([P1, P2, P3]) 
Success Case -> If all API calls are success (fulfilled), it will return an array with all results. e.g [val1, val2, val3] in 3 seconds (Max time taken by API. It waits for all of them to finish).

Failure Case -> If any one of Promise gets rejected. In above example consider P2 gets rejected after 1 second or P3 gets rejected. As soon as any of the promises gets rejected, Promise.all() returns error, it will throw error which is returned by failed Promise, P2 in this case or P3 in another case. Doesn't wait for other Promises. For P1 and P3, whenever promises are executed we can't cancel the promise as its not possible in JS. But Promise.all() doesnt wait for them.
We can call it Fail Fast. UseCase -> Suppose we have 5 API calls and to show a web page we need these 5 calls to be fulfilled in this scenario we can use Promise.all().

2. Promise.allSettled() -> Take above example of P1, P2 and P3.
Sucess Case  -> Its same Promise.all() in case when all Promises are fulfilled.

Failure Case -> If P2 gets rejected in 1 second, this will wait for all the promises to settled. It will Wait for 3 seconds in this case, and gives us all the result -> [val1, err, val3]
Use Case -> We have 5 API calls for each card to be shown in UI each card is populated by each API call, if one of them fails then dont show that card and show other 4. In this case we can use Promise.allSettled().

3. Promise.race() -> Same as Above, takes iterables as input.
Success Case -> P2 gets sucess after 1 second -> It will return the value of the first settled Promise. -> (val2).
If P1 -> 3secs, P2 -> 5secs, P3 -> 2secs. In this case, P3 gets settled in 2secs. So output will be val3.
Whatever Promise settled first we will get its result.

Failure Case -> Suppose for the example : P1 -> 3secs, P2 -> 5secs, P3 -> 2secs. P3 fails after 2 secs then it will return ERROR which will come from P3. It returns result of first settled Promise. It doesn't wait for other Promises to finish. Eventually other will also get settled but this doesnt wait for them it immediately returns.

4. Promise.any() -> It again takes array of Promises as input. It will wait for first fulfilled Promise.
Success Case -> P1 -> 3secs, P2 -> 1 sec, P3-> 2secs. It will return val2.

Failure Case ->  If P2 gets rejected, it will wait for success. If after 2 secs, suppose P3 gets successful then it will return P3. Another scenario consider P1, P2 and P3 all promises got rejected, the result will be aggregated Error.
Aggregate error will be array of three errors. [err1, err2, err3].


Terms:
Fulfilled -> Sucess
Settled -> Either fulfilled or rejected but not pending (operation is completed).
