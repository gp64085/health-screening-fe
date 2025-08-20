/**
 * Takes an object and a list of keys, and returns true if all keys exist on the object.
 * @example
 * hasAllRequired({a: 1, b: 2}, ['a', 'b']) // true
 * hasAllRequired({a: 1}, ['a', 'b']) // false
 * @param obj the object to check
 * @param keys the list of keys to check
 * @returns true if all keys exist on the object, false otherwise
 */
export const hasAllRequired = <T>(obj: Partial<T>, keys: (keyof T)[]): obj is T => {
  return keys.every((k) => k in obj);
};
