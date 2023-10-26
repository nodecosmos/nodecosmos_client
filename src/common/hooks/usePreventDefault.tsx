import { UIEvent, useCallback } from 'react';

export default function usePreventDefault() {
    return useCallback((e: UIEvent) => {
        e.preventDefault();
    }, []);
}
