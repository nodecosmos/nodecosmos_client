import { TransformableContextVal } from '../common/hooks/useTransformableContext';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../features/nodes/nodes.constants';

export function isYInViewport(y: number, transformablePosition: TransformableContextVal, treeScale: number) {
    const {
        scrollTop,
        clientHeight,
    } = transformablePosition;

    const treeScaleFactor = 1 / treeScale;

    const bellowTop = y > (scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR * treeScaleFactor);
    const aboveBottom = y < (scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR * treeScaleFactor);

    return bellowTop && aboveBottom;
}
