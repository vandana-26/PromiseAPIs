/**
 * @param {Array} iterable
 * @return {Promise<Array<{status: 'fulfilled', value: *}|{status: 'rejected', reason: *}>>}
 */
export default function promiseAllSettled(iterable) {
    return new Promise((resolve, reject) => {
        let res = new Array(iterable.length);
        let unresolvedIterables = iterable.length;

        if (unresolvedIterables === 0) {
            resolve(res);
            return;
        }

        iterable.forEach(async (value, index) => {

            try {
                const val = await value;
                console.log("value", val);
                res[index] = {
                    status: 'fulfilled',
                    value: val
                }
            } catch (err) {
                res[index] = {
                    status: 'rejected',
                    reason: err
                }
            }
            unresolvedIterables--;
            if (unresolvedIterables === 0)
                resolve(res);
        })

    })
}