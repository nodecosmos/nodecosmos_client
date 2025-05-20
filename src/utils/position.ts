import { TransformableContextVal } from '../common/hooks/useTransformableContext';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../features/nodes/nodes.constants';

export function isYInViewport(y: number, transformablePosition: TransformableContextVal, treeScale: number) {
    const {
        scrollTop,
        clientHeight,
    } = transformablePosition;

    const fixedY = y * treeScale;

    const belowTop = fixedY > (scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);
    const aboveBottom = fixedY < (scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);

    return belowTop && aboveBottom;
}
