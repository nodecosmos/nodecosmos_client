import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NestedNodesBranch from './NestedNodesBranch';
import Node from './Node';

export default function NestedNodes(props) {
  const { currentNodeId, nestedLevel } = props;
  const nodeIds = useSelector((state) => state.landingPageNodes[currentNodeId].node_ids);
  const lastChildId = nodeIds[nodeIds.length - 1] && nodeIds[nodeIds.length - 1].$oid;

  return (
    <>
      <NestedNodesBranch id={currentNodeId} lastChildId={lastChildId} />
      {
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

      }
    </>
  );
}

NestedNodes.defaultProps = {
  nestedLevel: 1,
};

NestedNodes.propTypes = {
  currentNodeId: PropTypes.string.isRequired,
  nestedLevel: PropTypes.number,
};
