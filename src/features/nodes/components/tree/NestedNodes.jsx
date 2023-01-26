import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useShallowEqualSelector from '../../../app/hooks/useShallowEqualSelector';
import NestedNodesBranch from './NestedNodesBranch';
// eslint-disable-next-line import/no-cycle
import Node from './Node';

export default function NestedNodes(props) {
  const { id, nestedLevel } = props;
  const nodeExpanded = useSelector((state) => state.nodes.byId[id].isExpanded);

  const nodeIds = useShallowEqualSelector((state) => state.nodes.byId[id].node_ids);
  const lastChildId = nodeIds[nodeIds.length - 1];

  if (!nodeExpanded) return null;

  return (
    <>
      <NestedNodesBranch id={id} lastChildId={lastChildId} />
      {nodeIds.map((nestedNodeIdObject, index) => (
        <Node
          key={nestedNodeIdObject.$oid}
          id={nestedNodeIdObject.$oid}
          upperSiblingId={nodeIds[index - 1] && nodeIds[index - 1].$oid}
          nestedLevel={nestedLevel}
        />
      ))}
    </>
  );
}

NestedNodes.propTypes = {
  id: PropTypes.string.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
