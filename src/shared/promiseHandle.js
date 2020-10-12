/**
 * try/catch helper
 * @param {Promise} promise
 */
export async function promiseHandle(promise) {
  try {
    const result = await promise;
    return [null, result];
  } catch (err) {
    return [err, null];
  }
}
