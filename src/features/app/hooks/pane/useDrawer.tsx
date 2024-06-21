import { MOBILE_PANE_HEIGHT } from '../../components/pane/MobilePane';
import { DRAWER_HEIGHT } from '../../constants';
import {
    useState, useRef, useCallback, Dispatch, SetStateAction, MutableRefObject,
} from 'react';

export default function useDrawer():
    [string | number,
        MutableRefObject<null | HTMLDivElement>,
        MutableRefObject<null | HTMLDivElement>,
        Dispatch<SetStateAction<string | number>>]
{
    const [height, setHeight] = useState<string | number>(DRAWER_HEIGHT);
    const drawerRef = useRef<null | HTMLDivElement>(null);
    const clickableRef = useRef<null | HTMLDivElement>(null);
    const [addedEventListener, setAddedEventListener] = useState(false);

    const handleTouchStart = useCallback((event: TouchEvent) => {
        const yStart = event.touches[0].clientY;
        const currentHeight = drawerRef?.current?.clientHeight || 64;

        const handleTouchMove = (touchEvent: TouchEvent) => {
            if (!drawerRef.current) return;

            touchEvent.preventDefault();
            const yMove = touchEvent.touches[0].clientY;

            const diff = Math.floor(yStart - yMove);
            let newHeight = currentHeight + diff;

            if ((newHeight < 64) || ((newHeight < currentHeight) && ((currentHeight - newHeight) > 64))) {
                newHeight = 64;
            }

            setHeight(newHeight);
        };

        const handleTouchEnd = () => {
            setHeight((prevHeight) => {
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
    }, []);

    // add event listener if there is no event listener
    if (clickableRef.current && !addedEventListener) {
        setAddedEventListener(true);
        clickableRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
    }
    return [height, drawerRef, clickableRef, setHeight];
}
