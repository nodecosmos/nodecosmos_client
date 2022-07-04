import React from 'react';
import * as PropTypes from 'prop-types';
import useShallowEqualSelector from '../../../../../helpers/useShallowEqualSelector';
import Node from './Node';

export default function NestedNodes(props) {
  const { currentNodeId, nestedLevel } = props;
  const currentNode = useShallowEqualSelector((state) => state.nodes[currentNodeId]);

  return (
    currentNode.node_ids.map((nestedNodeIdObject, index) => (
      <Node
        key={nestedNodeIdObject.$oid}
        id={nestedNodeIdObject.$oid}
        parentID={currentNode.id}
        upperSiblingID={currentNode.node_ids[index - 1] && currentNode.node_ids[index - 1].$oid}
        isLastChild={!currentNode.node_ids[index + 1]}
        nestedLevel={nestedLevel}
        index={index}
      >
        <NestedNodes
          currentNodeId={nestedNodeIdObject.$oid}
          nestedLevel={nestedLevel + 1}
        />
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
