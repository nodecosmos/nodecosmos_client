/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setTreeLoading } from '../../treeActions';
import { selectDragAndDrop } from '../../trees.selectors';
import { reorder } from '../../../nodes/nodes.thunks';
import { setAlert } from '../../../app/appSlice';
import useTreeCommands from '../useTreeCommands';
import useHandleServerErrorAlert from '../../../../common/hooks/useHandleServerErrorAlert';
import { selectChildIdsByParentId } from '../../../nodes/nodes.selectors';
import { reorderNodes } from '../../../nodes/nodeActions';

export default function useNodeDropCapture() {
    const dispatch = useDispatch();

    const { nodeId } = useSelector(selectDragAndDrop);
    const [reorderInProgress, setReorderInProgress] = useState(false);
    const { rebuildTree } = useTreeCommands();
    const handleServerError = useHandleServerErrorAlert();
    const childIdsByParentId = useSelector(selectChildIdsByParentId);

    // @ts-ignore
    return useCallback(async ({
        newParentId, newSiblingIndex, newSiblingIndexAfterMove, 
    }) => {
        if (reorderInProgress) {
            dispatch(setAlert({
                isOpen: true,
                severity: 'warning',
                message: 'Another reorder in progress. Please wait!',
            }));

            return;
        }

        try {
            const newUpperSiblingId = childIdsByParentId[newParentId][newSiblingIndex - 1];
            const newBottomSiblingId = childIdsByParentId[newParentId][newSiblingIndex];

            // @ts-ignore
            const response = await dispatch(reorder({
                nodeId,
                newParentId,
                newUpperSiblingId,
                newBottomSiblingId,
            }));

            // @ts-ignore
            if (response.error) {
                // @ts-ignore
                throw response.error;
            }

            // @ts-ignore
            await dispatch(reorderNodes({
                nodeId,
                newParentId,
                newSiblingIndexAfterMove,
            }));

            rebuildTree();

            dispatch(setTreeLoading(false));
            dispatch(clearDragAndDrop());
            setReorderInProgress(false);
        } catch (e) {
            // @ts-ignore
            if (e.message) {
                handleServerError(e);
            }
            dispatch(setTreeLoading(false));
            setReorderInProgress(false);
            console.error(e);
        }
    }, [reorderInProgress, dispatch, childIdsByParentId, nodeId, rebuildTree, handleServerError]);
}
