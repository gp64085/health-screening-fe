/**
 * Check if a value is missing (null or undefined)
 * @param value The value to check
 * @returns True if the value is missing, false otherwise
 */
export const isMissing = <T>(value: T) => {
  return value === null || value === undefined;
};

/**
 * Check if a value is present (not null or undefined)
 * @param value The value to check
 * @returns True if the value is present, false otherwise
 */
export const notMissing = <T>(value: T) => {
  return value !== null && value !== undefined;
};
