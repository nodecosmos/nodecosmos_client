import {
    useCallback,
    useEffect, useMemo, useRef, useState,
} from 'react';

type Callback<T> = (value: T) => Promise<void> | void;

export default function useDebounce<T>(callback: Callback<T>, timeout = 500): [Callback<T>, boolean] {
    const timeoutRef = useRef<number| null>(null);
    const [inProgress, setInProgress] = useState(false);

    const debounce = useCallback((value: T) => {
        setInProgress(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            await callback(value);
            setInProgress(false);
        }, timeout);
    }, [callback, timeout]);

    useEffect(() => () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    return useMemo(() => [debounce, inProgress], [debounce, inProgress]);
}
