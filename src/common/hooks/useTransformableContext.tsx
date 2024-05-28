import React, { useCallback, useContext } from 'react';

interface TransformableContextVal {
    clientHeight: number;
    clientWidth: number;
    scrollTop: number;
    scrollLeft: number;
}

const TransformableContext = React.createContext<TransformableContextVal>({} as TransformableContextVal);

export function useTransformableContextCreator() {
    const [transformablePositions, _setTransformablePositions] = React.useState<TransformableContextVal>({
        clientHeight: 0,
        clientWidth: 0,
        scrollTop: 0,
        scrollLeft: 0,
    });

    const setTransformablePositions = useCallback((pos: Partial<TransformableContextVal>) => {
        _setTransformablePositions((prev: TransformableContextVal) => ({
            ...prev,
            ...pos,
        }));
    }, []);

    return {
        TransformableContext,
        ctxValue: transformablePositions,
        setTransformablePositions,
    };
}

export function useTransformableContext() {
    return useContext(TransformableContext);
}
