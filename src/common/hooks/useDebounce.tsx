import {
    useCallback,
    useEffect, useRef, useState,
} from 'react';

type Callback<T> = (value: T) => void;

export default function useDebounce<T>(callback: Callback<T>, timeout = 500): [Callback<T>, boolean] {
    const timeoutRef = useRef<number| null>(null);
    const [inProgress, setInProgress] = useState(false);

    const debounce = useCallback((value: T) => {
        setInProgress(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            callback(value);
            setInProgress(false);
        }, timeout);
    }, [callback, timeout]);

    useEffect(() => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    return [
        debounce,
        inProgress,
    ];
}
