const getShortHand = (style: string, ...values) => {
  if (values.length === 1) {
    return { [style]: values[0] }
  }
  const _genCss = (...values) => ({
    [style + 'Top']: values[0],
    [style + 'Right']: values[1],
    [style + 'Bottom']: values[2],
    [style + 'Left']: values[3],
  })
  if (values.length === 2) {
    return _genCss(values[0], values[1], values[0], values[1])
  }
  if (values.length === 3) {
    return _genCss(values[0], values[1], values[2], values[1])
  }
  return _genCss(values[0], values[1], values[2], values[3])
}

'use strict';
const isFunction = input => typeof input === 'function';
export const renderIf = predicate => elemOrThunk =>
  predicate ? (isFunction(elemOrThunk) ? elemOrThunk() : elemOrThunk) : null;

export const padding = (...values: Array<number | string>) => getShortHand('padding', ...values)
export const margin = (...values: Array<number | string>) => getShortHand('margin', ...values)