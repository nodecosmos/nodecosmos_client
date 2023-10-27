import { UIEvent, useCallback } from 'react';

export default function useStopPropagation() {
    return useCallback((e: UIEvent) => {
        e.stopPropagation();
    }, []);
}
