import { useEffect, useRef, useState } from 'react';

export default function useDebounce(callback, timeout = 500) {
  const timeoutRef = useRef(null);
  const [inProgress, setInProgress] = useState(false);

  const debounce = (value) => {
    setInProgress(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(value);
      setInProgress(false);
    }, timeout);
  };

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { debounce, inProgress };
}
