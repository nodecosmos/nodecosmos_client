import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearDragAndDrop, setTreeLoading } from '../../treesSlice';
import { selectDragAndDrop } from '../../trees.selectors';
import { reorderNodes } from '../../../nodes/nodesSlice';
import { reorder } from '../../../nodes/nodes.thunks';
import { setAlert } from '../../../app/appSlice';
import useTreeCommands from '../useTreeCommands';
import useHandleServerErrorAlert from '../../../../common/hooks/useHandleServerErrorAlert';
import { selectChildIdsByParentId } from '../../../nodes/nodes.selectors';

export default function useNodeDropCapture() {
  const dispatch = useDispatch();

  const { nodeId } = useSelector(selectDragAndDrop);
  const [reorderInProgress, setReorderInProgress] = useState(false);
  const { rebuildTree } = useTreeCommands();
  const handleServerError = useHandleServerErrorAlert();
  const childIdsByParentId = useSelector(selectChildIdsByParentId);

  return useCallback(async ({
    newParentId,
    newSiblingIndex,
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

      const response = await dispatch(reorder({
        nodeId,
        newParentId,
        newUpperSiblingId,
        newBottomSiblingId,
      }));

      if (response.error) {
        throw response.error;
      }

      await dispatch(reorderNodes({
        nodeId,
        newParentId,
        newSiblingIndex,
      }));

      rebuildTree();

      dispatch(setTreeLoading(false));
      dispatch(clearDragAndDrop());
      setReorderInProgress(false);
    } catch (e) {
      if (e.message) {
        handleServerError(e);
      }
      dispatch(setTreeLoading(false));
      setReorderInProgress(false);
      console.error(e);
    }
  }, [reorderInProgress, dispatch, childIdsByParentId, nodeId, rebuildTree, handleServerError]);
}
