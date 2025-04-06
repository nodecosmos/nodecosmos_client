import {
    PANE_Q, PaneContent, usePaneContext,
} from './usePaneContext';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useTogglePane() {
    const { setContent } = usePaneContext();

    const [searchParams, setSearchParams] = useSearchParams();

    return useCallback((paneContent: PaneContent | undefined) => {
        if (paneContent !== undefined) {
            setContent(paneContent);

            const newParams = new URLSearchParams(searchParams);
            newParams.set(PANE_Q, paneContent);
            setSearchParams(newParams);
        }
    }, [searchParams, setContent, setSearchParams]);
}
