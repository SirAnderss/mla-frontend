/**
 *
 * @param index number - index of the current iteration
 * @param length number - length of the array
 * @description This function is used to compare the current index with the length of the array
 * @returns boolean
 */
const isMiddleComparison = (index: number, length: number) =>
  index < length - 1;

export { isMiddleComparison };
