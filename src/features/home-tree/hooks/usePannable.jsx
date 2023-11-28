/* eslint-disable no-shadow */
import React from 'react';

// pan on mousedown
// animated inertia on mouseup
export default function usePannable() {
    const [pan, setPan] = React.useState({
        x: 6.5,
        y: 0, 
    });
    const [isPanning, setIsPanning] = React.useState(false);

    // handle panning
    const handleMouseDown = (event) => {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            setIsPanning(true);
            const { clientX, clientY } = event;
            const { x, y } = pan;
            const startX = clientX - x;
            const startY = clientY - y;

            const handleMouseMove = (event) => {
                const { clientX, clientY } = event;
                setPan({
                    x: clientX - startX,
                    y: clientY - startY,
                });
            };

            const handleMouseUp = () => {
                setIsPanning(false);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
    };

    return {
        pan,
        isPanning,
        handleMouseDown,
        setPan,
        setIsPanning,
    };
}
