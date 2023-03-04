import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectTransformablePositionsById } from '../../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../trees.constants';
import { selectPositionsByNodeId } from '../../trees.selectors';

export default function useIsInsideViewport(rootId) {
  const { clientHeight, scrollTop } = useSelector(selectTransformablePositionsById(rootId));
  const positionsById = useSelector(selectPositionsByNodeId);

  return useCallback((treeNodeId) => {
    const { y } = positionsById[treeNodeId] || {};

    return y > scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR - 1
        && y < scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR;
  }, [clientHeight, positionsById, scrollTop]);
}
