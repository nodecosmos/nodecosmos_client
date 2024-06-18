import {
    createContext, useCallback, useContext, useMemo, useState,
} from 'react';

interface ThreadsContextValue {
    searchTerm: string | null;
    setSearchTerm: (searchTerm: string | null) => void;
}

const ThreadsContext = createContext<ThreadsContextValue>({} as ThreadsContextValue);

export function useThreadsContextCreator() {
    const [searchTerm, _setSearchTerm] = useState<string | null>(null);

    const setSearchTerm = useCallback((searchTerm: string | null) => {
        _setSearchTerm(searchTerm);
    }, []);

    return useMemo(() => ({
        ThreadsContext,
        ctxValue: {
            searchTerm,
            setSearchTerm,
        },
    }), [searchTerm, setSearchTerm]);
}

export default function useThreadsContext() {
    return useContext(ThreadsContext);
}
