/* mui */
import React, { useEffect } from 'react';
import * as PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { selectNodeById } from '../../nodes/nodes.selectors';
/* nodecosmos */
import useTreePositionCalculator from '../hooks/useTreePositionCalculator';
import { buildTreeFromRootNode, setTreeNodesPositions } from '../treesSlice';
import Node from './Node';
import Transformable from './Transformable';

export default function Tree(props) {
  const { rootNodeId } = props;
  const { positionsById, nodesToView } = useTreePositionCalculator(rootNodeId);
  const dispatch = useDispatch();

  const rootNode = useSelector(selectNodeById(rootNodeId));

  useEffect(() => { dispatch(buildTreeFromRootNode(rootNode)); }, [dispatch, rootNode]);
  useEffect(() => { dispatch(setTreeNodesPositions(positionsById)); }, [dispatch, positionsById]);

  return (
    <Transformable rootId={rootNodeId}>
      <g>
        {nodesToView.map((treeNodeId) => <Node key={treeNodeId} treeNodeId={treeNodeId} />)}
      </g>
    </Transformable>
  );
}

Tree.propTypes = {
  rootNodeId: PropTypes.string.isRequired,
};
