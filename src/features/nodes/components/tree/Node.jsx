import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNestedNodesMount from '../../hooks/tree/useNestedNodesMount';
import useNodePositionCalculator from '../../hooks/tree/useNodePositionCalculator';
import NestedNodesBranch from './NestedNodesBranch';
import NodeButton from './NodeButton';
import NodeLink from './NodeLink';

export default function Node(props) {
  const {
    id,
    upperSiblingId,
    nestedLevel,
    isRoot,
  } = props;

  useNestedNodesMount(id);
  useNodePositionCalculator({ id, upperSiblingId, isRoot });

  const isMounted = useSelector((state) => isRoot || state.nodes[id].isMounted);
  if (!isMounted) return null;

  return (
    <g>
      <NestedNodesBranch id={id} />
      <NodeLink
        id={id}
        upperSiblingId={upperSiblingId}
        isRoot={isRoot}
        nestedLevel={nestedLevel}
      />
      <NodeButton
        id={id}
        isRoot={isRoot}
        nestedLevel={nestedLevel}
      />
    </g>
  );
}

Node.defaultProps = {
  isRoot: false,
  upperSiblingId: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool,
  id: PropTypes.string.isRequired,
  upperSiblingId: PropTypes.string,
  nestedLevel: PropTypes.number.isRequired,
};
