import React, { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export default function UseTypeEffect(props) {
  const ref = useRef(null);
  const inView = useInView(ref);

  const { text, delay } = props;
  const [textIterator, setTextIterator] = React.useState(0);
  const [currentText, setCurrentText] = React.useState(null);
  const [waiting, setWaiting] = React.useState(true);

  setTimeout(() => setWaiting(false), delay);

  useEffect(() => {
    if (ref.current && inView && !waiting) {
      if (textIterator === 0) setCurrentText('');
      setCurrentText((prev) => prev + text.charAt(textIterator));
      if (textIterator < text.length) setTimeout(() => setTextIterator(textIterator + 1), 20);
    }
  }, [ref, inView, textIterator, text, waiting]);

  return currentText;
}
