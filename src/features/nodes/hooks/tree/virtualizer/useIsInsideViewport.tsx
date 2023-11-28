import { UUID } from '../../../../../types';
import { selectTransformablePositionAttribute } from '../../../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../../nodes.constants';
import { selectBranchNodes } from '../../../nodes.selectors';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function useIsInsideViewport(branchId: UUID) {
    const scrollTop = useSelector(selectTransformablePositionAttribute(branchId, 'scrollTop'));
    const clientHeight = useSelector(selectTransformablePositionAttribute(branchId, 'clientHeight'));
    const branchNodes = useSelector(selectBranchNodes(branchId));

    return useCallback((id: UUID) => {
        const { y } = branchNodes[id];
        const bellowTop = y > (scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);
        const aboveBottom = y < (scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR);

        return bellowTop && aboveBottom;
    }, [clientHeight, branchNodes, scrollTop]);
}
