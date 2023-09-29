/* mui */
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectChildIdsByParentId } from '../../nodes/nodes.selectors';
import useTreeNodeVirtualizer from '../hooks/useTreeNodesVirtualizer';
import useTreePositionCalculator from '../hooks/useTreePositionCalculator';
import { buildTreeFromRootNode, setCurrentTempNodeId, setTreeNodesPositions } from '../treesSlice';
import { TREES_TYPES } from '../trees.constants';
import Node from './node/Node';
import DraggableNodePoints from './DraggableNodePoints';

export default function TreeNodes({
  rootNodeId, type,
}) {
  const childIdsByParentId = useSelector(selectChildIdsByParentId);
  const positionsById = useTreePositionCalculator(rootNodeId);
  const treeNodeIdsToView = useTreeNodeVirtualizer(rootNodeId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildTreeFromRootNode({ rootId: rootNodeId, childIdsByParentId, type }));
  }, [dispatch, rootNodeId, childIdsByParentId, type]);

  useEffect(() => {
    dispatch(setTreeNodesPositions({ rootNodeId, positionsById }));
  }, [dispatch, positionsById, rootNodeId]);

  useEffect(() => () => dispatch(setCurrentTempNodeId(null)), [dispatch]);

  return (
    <g>
      <g>
        {treeNodeIdsToView.map(([treeNodeId, alreadyMounted]) => (
          <Node
            key={treeNodeId}
            treeNodeId={treeNodeId}
            alreadyMounted={alreadyMounted}
          />
        ))}
      </g>
      <DraggableNodePoints rootNodeId={rootNodeId} />
    </g>

  );
}

TreeNodes.defaultProps = {
  type: TREES_TYPES.default,
};

TreeNodes.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
  type: PropTypes.string,
};
