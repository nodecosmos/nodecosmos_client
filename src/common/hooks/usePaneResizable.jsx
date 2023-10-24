import { useState } from 'react';

export default function usePaneResizable({
    aRef, bRef, initialWidthA, initialWidthB, 
}) {
    const [paneAWidth, setPaneAWidth] = useState(initialWidthA || '50%');
    const [paneBWidth, setPaneBWidth] = useState(initialWidthB || '50%');

    const [resizeInProgress, setResizeInProgress] = useState(false);

    const handleResize = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const startX = e.pageX;
        const startAWidth = aRef.current.offsetWidth;
        const startPaneWidth = bRef.current.offsetWidth;

        const handleMouseMove = (e2) => {
            e.stopPropagation();
            e.preventDefault();
            setResizeInProgress(true);
            const dx = e2.pageX - startX;
            const newAWidth = startAWidth + dx;
            const newPaneWidth = startPaneWidth - dx;

            let newPaneAWidthPercent = (newAWidth / aRef.current.parentNode.offsetWidth) * 100;
            let newPaneBWidthPercent = (newPaneWidth / bRef.current.parentNode.offsetWidth) * 100;

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
    };

    return {
        paneAWidth,
        paneBWidth,
        handleResize,
        resizeInProgress,
    };
}
