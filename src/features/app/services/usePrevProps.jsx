import { useEffect, useRef } from 'react';

export default function usePrevProps(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
