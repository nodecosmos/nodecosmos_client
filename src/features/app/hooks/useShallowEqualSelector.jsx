import { useSelector } from 'react-redux';

function shallowEqual(objA, objB) {
  if (typeof objA !== 'object' || typeof objB !== 'object' || objA === null || objB === null) return objA === objB;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i])) {
      return false;
    }
  }

  return true;
}

export default function useShallowEqualSelector(selector) {
  return useSelector(selector, shallowEqual);
}
