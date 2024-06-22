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

    const handleTouchStart = useCallback((event: TouchEvent) => {
        const yStart = event.touches[0].clientY;
        const currentHeight = 64;

        const handleTouchMove = (touchEvent: TouchEvent) => {
            touchEvent.preventDefault();
            const yMove = touchEvent.touches[0].clientY;

            const diff = Math.floor(yStart - yMove);
            let newHeight = currentHeight + diff;

            if ((newHeight < 64) || ((newHeight < currentHeight) && ((currentHeight - newHeight) > 64))) {
                newHeight = 64;
            }

            setMobilePaneHeight(newHeight);
        };

        const handleTouchEnd = () => {
            setMobilePaneHeight((prevHeight: string | number) => {
                const isNumber = typeof prevHeight === 'number';

                if (isNumber && (prevHeight > (window.innerHeight / 4))) {
                    return MOBILE_PANE_HEIGHT;
                } else if (isNumber) {
                    return DRAWER_HEIGHT;
                } else {
                    return prevHeight;
                }
            });

            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };

        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });
    }, [setMobilePaneHeight]);

    useEffect(() => {
        if (clickableRef.current && !addedEventListener) {
            clickableRef.current.addEventListener('touchstart', handleTouchStart);
            setAddedEventListener(true);
        }
    }, [addedEventListener, handleTouchStart]);

    return clickableRef;
}
