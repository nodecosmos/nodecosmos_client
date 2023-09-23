/* mui */
import React, {
  useEffect, useRef,
} from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectChildIdsByParentId } from '../../nodes/nodes.selectors';
import useTreeNodeVirtualizer from '../hooks/useTreeNodesVirtualizer';
import useTreePositionCalculator from '../hooks/useTreePositionCalculator';
import { buildTreeFromRootNode, setTreeNodesPositions } from '../treesSlice';
import Transformable from '../../../common/components/Transformable';
import { TREES_TYPES } from '../trees.constants';
import useTreeContext from '../hooks/useTreeContext';
import Node from './Node';
import DraggableNodePoints from './DraggableNodePoints';

// TODO: update positions -> order by rootId
export default function Tree({
  rootNodeId, type, onChange, value,
}) {
  const containerRef = useRef(null);
  const childIdsByParentId = useSelector(selectChildIdsByParentId);
  const positionsById = useTreePositionCalculator(rootNodeId);
  const treeNodeIdsToView = useTreeNodeVirtualizer(rootNodeId, containerRef);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(buildTreeFromRootNode({ rootId: rootNodeId, childIdsByParentId, type }));
  }, [dispatch, rootNodeId, childIdsByParentId, type]);

  useEffect(() => {
    dispatch(setTreeNodesPositions({ rootNodeId, positionsById }));
  }, [dispatch, positionsById, rootNodeId]);

  const { TreeContext, contextProviderValue } = useTreeContext({
    type, onChange, value, rootNodeId,
  });

  return (
    <TreeContext.Provider value={contextProviderValue}>
      <Transformable containerRef={containerRef} transformableId={rootNodeId}>
        <g>
          {treeNodeIdsToView.map(([treeNodeId, alreadyMounted]) => (
            <Node
              key={treeNodeId}
              treeNodeId={treeNodeId}
              alreadyMounted={alreadyMounted}
            />
          ))}
        </g>
        <g>
          {treeNodeIdsToView.map(([treeNodeId]) => (
            <DraggableNodePoints key={treeNodeId} treeNodeId={treeNodeId} />
          ))}
        </g>
      </Transformable>
    </TreeContext.Provider>
  );
}

Tree.defaultProps = {
  type: TREES_TYPES.default,
  onChange: null,
  value: null,
};

Tree.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.array,
};
