import {
    useEffect, useRef, useState,
} from 'react';

export default function useDebounce<T>(callback: (value: T) => void, timeout = 500) {
    const timeoutRef = useRef<number| null>(null);
    const [inProgress, setInProgress] = useState(false);

    const debounce = (value: T) => {
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

    return {
        debounce,
        inProgress, 
    };
}
