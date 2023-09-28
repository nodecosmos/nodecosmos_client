import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import { CLIENT_VIEWPORT_BUFFER_FACTOR } from '../../trees.constants';
import { selectPositions } from '../../trees.selectors';

export default function useIsInsideViewport(rootId) {
  const scrollTop = useSelector(selectTransformablePositionAttribute(rootId, 'scrollTop'));
  const clientHeight = useSelector(selectTransformablePositionAttribute(rootId, 'clientHeight'));
  const positionsById = useSelector(selectPositions(rootId));

  return useCallback((treeNodeId) => {
    const { y } = positionsById[treeNodeId] || {};

    return y > scrollTop - clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR
      && y < scrollTop + clientHeight * CLIENT_VIEWPORT_BUFFER_FACTOR;
  }, [clientHeight, positionsById, scrollTop]);
}
