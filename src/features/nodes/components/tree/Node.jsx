import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodePositionCalculator from '../../hooks/tree/useNodePositionCalculator';
import NestedNodesBranch from './NestedNodesBranch';
import NodeButton from './NodeButton';
import NodeLink from './NodeLink';

export default function Node(props) {
  const {
    id,
    upperSiblingID,
    nestedLevel,
    isRoot,
  } = props;

  const nodeExpanded = useSelector((state) => state.nodes[id].isExpanded);

  const nodeIds = useSelector((state) => state.nodes[id].node_ids);
  const lastChildId = nodeIds[nodeIds.length - 1] && nodeIds[nodeIds.length - 1].$oid;

  useNodePositionCalculator({ id, upperSiblingID, isRoot });

  if (id === '63cd5925690cc4d54a6b00c4') {
    console.log('hit');
  }

  return (
    <g>
      <NodeLink
        id={id}
        upperSiblingID={upperSiblingID}
        isRoot={isRoot}
        nestedLevel={nestedLevel}
      />
      <NodeButton
        id={id}
        isRoot={isRoot}
        nestedLevel={nestedLevel}
      />
      {nodeExpanded && (
        <>
          <NestedNodesBranch id={id} lastChildId={lastChildId} />
          {nodeIds.map((nestedNodeIdObject, index) => (
            <Node
              key={nestedNodeIdObject.$oid}
              id={nestedNodeIdObject.$oid}
              upperSiblingID={nodeIds[index - 1] && nodeIds[index - 1].$oid}
              nestedLevel={nestedLevel + 1}
            />
          ))}
        </>
      )}
    </g>
  );
}

Node.defaultProps = {
  isRoot: false,
  upperSiblingID: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool,
  id: PropTypes.string.isRequired,
  upperSiblingID: PropTypes.string,
  nestedLevel: PropTypes.number.isRequired,
};
