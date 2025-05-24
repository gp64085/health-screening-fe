/**
 * A utility function to replace traditional loops with a more functional
 * approach.
 * This should be used instead of forEach, for...of, or traditional for loops.
 *
 * @param array The array to iterate over
 * @param callback The function to execute for each element
 */
export function forNext<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => void,
): void {
  if (!array || !Array.isArray(array)) {
    return;
  }

  const length = array.length;
  for (let i = 0; i < length; i++) {
    callback(array[i], i, array);
  }
}

/**
 * A utility function similar to forNext but returns a new array with the
 * results of calling the provided function on every element in the array.
 *
 * @param array The array to iterate over
 * @param callback The function to execute for each element, which should
 * return a value
 * @returns A new array with each element being the result of the callback
 * function
 */
export function mapNext<T, U>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => U,
): U[] {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  const result: U[] = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
}

/**
 * A utility function similar to forNext but returns a new array containing
 * all elements that pass the test implemented by the provided function.
 *
 * @param array The array to iterate over
 * @param callback The function to test each element, which should return
 * a boolean
 * @returns A new array with all elements that pass the test
 */
export function filterNext<T>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => boolean,
): T[] {
  if (!array || !Array.isArray(array)) {
    return [];
  }

  const result: T[] = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
