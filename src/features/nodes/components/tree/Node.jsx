import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NestedNodesBranch from './NestedNodesBranch';
import NodeContainer from './NodeContainer';
import NodeBranch from './NodeBranch';

export default function Node(props) {
  const {
    id,
    upperSiblingId,
    nestedLevel,
    isRoot,
    lastChildId,
  } = props;

  const isMounted = useSelector((state) => isRoot || state.nodes.mountedTreeNodesById[id]);
  if (!isMounted) return null;

  return (
    <g>
      <NestedNodesBranch id={id} lastChildId={lastChildId} />
      <NodeBranch id={id} upperSiblingId={upperSiblingId} isRoot={isRoot} nestedLevel={nestedLevel} />
      <NodeContainer id={id} isRoot={isRoot} nestedLevel={nestedLevel} />
    </g>
  );
}

Node.defaultProps = {
  upperSiblingId: null,
  lastChildId: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  upperSiblingId: PropTypes.string,
  lastChildId: PropTypes.string,
};
