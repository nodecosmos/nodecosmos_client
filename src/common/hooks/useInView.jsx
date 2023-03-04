import React from 'react';

export default function useInView(ref, options) {
  const [inView, setInView] = React.useState(false);

  const observer = React.useRef(null);

  const callback = React.useCallback((entries) => {
    const [entry] = entries;
    setInView(entry.isIntersecting);
  }, []);

  React.useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(callback, options);
    observer.current.observe(ref.current);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [ref, options, callback]);

  return inView;
}
