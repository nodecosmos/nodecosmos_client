import useIsMobile from '../../features/app/hooks/useIsMobile';
import React, {
    useCallback, useMemo, useState,
} from 'react';

interface UsePaneResizableProps {
    aRef: React.RefObject<HTMLDivElement>;
    bRef: React.RefObject<HTMLDivElement>;
    initialWidthA: string;
    initialWidthB: string;
}

export default function usePaneResizable(props: UsePaneResizableProps) {
    const {
        aRef, bRef, initialWidthA, initialWidthB,
    } = props;
    const [paneAWidth, setPaneAWidth] = useState(initialWidthA || '50%');
    const [paneBWidth, setPaneBWidth] = useState(initialWidthB || '50%');
    const [resizeInProgress, setResizeInProgress] = useState(false);
    const isMobile = useIsMobile();

    const handleResize = useCallback((e: React.MouseEvent) => {
        if (!aRef.current || !bRef.current) {
            return;
        }

        e.stopPropagation();
        e.preventDefault();
        const startX = e.pageX;
        const startAWidth = aRef.current.offsetWidth;
        const startPaneWidth = bRef.current.offsetWidth;

        const handleMouseMove = (e2: MouseEvent) => {
            if (!aRef.current || !bRef.current) {
                return;
            }

            e.stopPropagation();
            e.preventDefault();
            setResizeInProgress(true);
            const dx = e2.pageX - startX;
            const newAWidth = startAWidth + dx;
            const newPaneWidth = startPaneWidth - dx;

            const aParentNode = aRef.current.parentNode as HTMLElement;
            const bParentNode = bRef.current.parentNode as HTMLElement;

            let newPaneAWidthPercent = (newAWidth / aParentNode.offsetWidth || 1) * 100;
            let newPaneBWidthPercent = (newPaneWidth / bParentNode.offsetWidth || 1) * 100;

            if (newPaneAWidthPercent < 30) {
                newPaneAWidthPercent = 30;
                newPaneBWidthPercent = 70;
            } else if (newPaneAWidthPercent > 70) {
                newPaneAWidthPercent = 70;
                newPaneBWidthPercent = 30;
            }

            setPaneAWidth(`${newPaneAWidthPercent}%`);
            setPaneBWidth(`${newPaneBWidthPercent}%`);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);

            setResizeInProgress(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [aRef, bRef]);

    return useMemo(() => ({
        paneAWidth: isMobile ? '100%' : paneAWidth,
        paneBWidth: isMobile ? '100%' : paneBWidth,
        handleResize,
        resizeInProgress,
    }), [isMobile, paneAWidth, paneBWidth, handleResize, resizeInProgress]);
}
