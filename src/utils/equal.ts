export const eqArrSet = <T>(xs: Array<T>, ys: Set<T>) => xs.length === ys.size && xs.every((x) => ys.has(x));
