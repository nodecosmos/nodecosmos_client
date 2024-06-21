import React, { MouseEvent as ReactMouseEvent, useCallback } from 'react';

export default function usePannable(containerRef: React.RefObject<HTMLElement>) {
    return useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const { clientX: initialClientX, clientY: initialClientY } = event;
        const { scrollLeft: initialScrollLeft, scrollTop: initialScrollTop } = containerRef.current;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const { clientX, clientY } = moveEvent;

            const scrollLeft = initialScrollLeft + initialClientX - clientX;
            const scrollTop = initialScrollTop + initialClientY - clientY;

            if (containerRef.current) {
                containerRef.current.scrollLeft = scrollLeft;
                containerRef.current.scrollTop = scrollTop;
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [containerRef]);
}
