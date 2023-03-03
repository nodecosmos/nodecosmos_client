/* mui */
import React, { useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
/* nodecosmos */
import { selectChildIdsByParentId } from '../../nodes/nodes.selectors';
import useTreeNodeVirtualizer from '../hooks/useTreeNodesVirtualizer';
import useTreePositionCalculator from '../hooks/useTreePositionCalculator';
import { buildTreeFromRootNode, setTreeNodesPositions } from '../treesSlice';
import Node from './Node';
import Transformable from './Transformable';

export default function Tree(props) {
  const { rootNodeId } = props;
  const containerRef = useRef(null);

  const childIdsByParentId = useSelector(selectChildIdsByParentId(rootNodeId));

  const positionsById = useTreePositionCalculator(rootNodeId);
  const treeNodeIdsToView = useTreeNodeVirtualizer(rootNodeId, containerRef);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildTreeFromRootNode({ rootId: rootNodeId, childIdsByParentId }));
  }, [dispatch, rootNodeId, childIdsByParentId]);

  useEffect(() => {
    dispatch(setTreeNodesPositions(positionsById));
  }, [dispatch, positionsById]);

  return (
    <Transformable containerRef={containerRef} rootId={rootNodeId}>
      <g>
        {treeNodeIdsToView.map(([treeNodeId, alreadyMounted]) => (
          <Node
            key={treeNodeId}
            treeNodeId={treeNodeId}
            alreadyMounted={alreadyMounted}
          />
        ))}
      </g>
    </Transformable>
  );
}

Tree.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
};
