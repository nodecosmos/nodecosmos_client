import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Node from './Node';

export default function NestedNodes(props) {
  const { currentNodeId, nestedLevel } = props;
  const nodeIds = useSelector((state) => state.nodes[currentNodeId].node_ids);

  return (
    nodeIds.map((nestedNodeIdObject, index) => (
      <Node
        key={nestedNodeIdObject.$oid}
        id={nestedNodeIdObject.$oid}
        upperSiblingID={nodeIds[index - 1] && nodeIds[index - 1].$oid}
        nestedLevel={nestedLevel}
      >
        <NestedNodes currentNodeId={nestedNodeIdObject.$oid} nestedLevel={nestedLevel + 1} />
      </Node>
    ))
  );
}

NestedNodes.defaultProps = {
  nestedLevel: 1,
};

NestedNodes.propTypes = {
  currentNodeId: PropTypes.string.isRequired,
  nestedLevel: PropTypes.number,
};
