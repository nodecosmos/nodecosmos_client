/* mui */
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectChildIdsByParentId, selectNode } from '../../nodes/nodes.selectors';
import useTreeNodeVirtualization from '../hooks/useTreeNodesVirtualization';
import useTreePositionCalculator from '../hooks/useTreePositionCalculator';
import { buildTreeFromRootNode, setTreeNodesPositions } from '../treesSlice';
import Node from './Node';
import Transformable from './Transformable';

export default function Tree(props) {
  const { rootNodeId } = props;

  const childIdsByParentId = useSelector(selectChildIdsByParentId(rootNodeId));

  const positionsById = useTreePositionCalculator(rootNodeId);
  const treeNodeIdsToView = useTreeNodeVirtualization(rootNodeId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildTreeFromRootNode({ rootId: rootNodeId, childIdsByParentId }));
  }, [dispatch, rootNodeId, childIdsByParentId]);

  useEffect(() => {
    dispatch(setTreeNodesPositions(positionsById));
  }, [dispatch, positionsById]);

  return (
    <Transformable rootId={rootNodeId}>
      <g>
        {treeNodeIdsToView.map((treeNodeId) => <Node key={treeNodeId} treeNodeId={treeNodeId} />)}
      </g>
    </Transformable>
  );
}

Tree.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
};
