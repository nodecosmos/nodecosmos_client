import { TransformablePositions } from '../features/app/app.types';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../features/nodes/nodes.constants';

export function isYInViewport(y: number, transformablePosition: TransformablePositions) {
    const {
        scrollTop,
        clientHeight,
    } = transformablePosition;

    const bellowTop = y > (scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);
    const aboveBottom = y < (scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);

    return bellowTop && aboveBottom;
}
