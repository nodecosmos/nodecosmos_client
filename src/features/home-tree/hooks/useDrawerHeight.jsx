import { useState, useRef } from 'react';

function useDrawerHeight() {
    const [height, setHeight] = useState(0);
    const drawerRef = useRef(null);
    const textContainerRef = useRef(null);
    const textRef = useRef(null);
    const lastHeight = useRef(0);

    const handleTouchStart = (event) => {
        const yStart = event.touches[0].clientY;
        const textContainerHeight = textContainerRef.current.clientHeight;

        const handleTouchMove = (touchEvent) => {
            touchEvent.preventDefault();
            const yMove = touchEvent.touches[0].clientY;

            const diff = Math.floor(yStart - yMove);
            let newHeight = textContainerHeight + diff;

            if (newHeight < 0) newHeight = 0;

            if (newHeight > textRef.current.clientHeight) newHeight = textRef.current.clientHeight;

            lastHeight.current = newHeight;
            setHeight(newHeight);
        };

        const handleTouchEnd = () => {
            window.removeEventListener('touchmove', handleTouchMove);

            setHeight((prevHeight) => {
                if (prevHeight < textRef.current.clientHeight / 2) return 0;
                return textRef.current.clientHeight;
            });

            window.removeEventListener('touchend', handleTouchEnd);
        };

        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });
    };

    // add event listener if there is no event listener
    if (drawerRef.current && !drawerRef.current.hasEventListener) {
        drawerRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        drawerRef.current.hasEventListener = true;
    }
    return [height, drawerRef, textContainerRef, textRef, setHeight];
}

export default useDrawerHeight;
