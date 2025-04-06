import { usePaneContext } from './usePaneContext';
import { MOBILE_PANE_HEIGHT } from '../../components/pane/MobilePane';
import { DRAWER_HEIGHT } from '../../constants';
import {
    useState, useRef, useCallback, MutableRefObject, useEffect,
} from 'react';

export default function useDrawer(): MutableRefObject<null | HTMLDivElement> {
    const { setMobilePaneHeight } = usePaneContext();
    const clickableRef = useRef<null | HTMLDivElement>(null);
    const [addedEventListener, setAddedEventListener] = useState(false);
    const [addedClickEventListener, setClickEventListener] = useState(false);

    const handleTouchStart = useCallback((event: TouchEvent) => {
        const yStart = event.touches[0].clientY;
        const currentHeight = document.getElementById('MobilePane')?.clientHeight || 64;
        const startTime = new Date().getTime();

        const handleTouchMove = (touchEvent: TouchEvent) => {
            touchEvent.preventDefault();
            const yMove = touchEvent.touches[0].clientY;

            const diff = Math.floor(yStart - yMove);
            let newHeight = currentHeight + diff;

            if (newHeight < 64) {
                newHeight = 64;
            }

            if (newHeight > window.innerHeight - 64) {
                setMobilePaneHeight(MOBILE_PANE_HEIGHT);
                return;
            }

            setMobilePaneHeight(newHeight);
        };

        const handleTouchEnd = () => {
            const endTime = new Date().getTime();
            const totalTime = endTime - startTime;
            // if totalTime is less than 300ms then it's a swipe
            if (totalTime < 300) {
                setMobilePaneHeight((prevHeight: string | number) => {
                    const isNumber = typeof prevHeight === 'number';

                    // if diff is more then 64 move up or down
                    if (isNumber) {
                        const diff = currentHeight - prevHeight;
                        if (diff > 64) {
                            return DRAWER_HEIGHT;
                        } else if (diff < -64) {
                            return MOBILE_PANE_HEIGHT;
                        }
                    }

                    return prevHeight;
                });
            }

            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };

        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });
    }, [setMobilePaneHeight]);

    const handleDragStart = useCallback((event: DragEvent) => {
        console.log('dragstart');
        event.preventDefault();
        const yStart = event.clientY;
        const currentHeight = document.getElementById('MobilePane')?.clientHeight || 64;
        const startTime = new Date().getTime();

        const onMouseMove = (dragEvent: MouseEvent) => {
            dragEvent.preventDefault();
            const yMove = dragEvent.clientY;

            const diff = Math.floor(yStart - yMove);
            let newHeight = currentHeight + diff;

            if (newHeight < 64) {
                newHeight = 64;
            }

            if (newHeight > window.innerHeight - 64) {
                setMobilePaneHeight(MOBILE_PANE_HEIGHT);
                return;
            }

            setMobilePaneHeight(newHeight);
        };

        const handleMouseUp = () => {
            const endTime = new Date().getTime();
            const totalTime = endTime - startTime;
            // if totalTime is less than 300ms then it's a swipe
            if (totalTime < 300) {
                setMobilePaneHeight((prevHeight: string | number) => {
                    const isNumber = typeof prevHeight === 'number';

                    // if diff is more then 64 move up or down
                    if (isNumber) {
                        const diff = currentHeight - prevHeight;
                        if (diff > 64) {
                            return DRAWER_HEIGHT;
                        } else if (diff < -64) {
                            return MOBILE_PANE_HEIGHT;
                        }
                    }

                    return prevHeight;
                });
            }

            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [setMobilePaneHeight]);

    useEffect(() => {
        if (clickableRef.current && !addedEventListener) {
            clickableRef.current.addEventListener('touchstart', handleTouchStart);
            setAddedEventListener(true);
        }

        if (clickableRef.current && !addedClickEventListener) {
            clickableRef.current.addEventListener('dragstart', handleDragStart);
            setClickEventListener(true);
        }
    }, [addedClickEventListener, addedEventListener, handleDragStart, handleTouchStart]);

    return clickableRef;
}
