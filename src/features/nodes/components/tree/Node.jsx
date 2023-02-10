import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsNodeMountedById } from '../../nodes.selectors';
import NestedNodesBranch from './NestedNodesBranch';
import NodeContainer from './NodeContainer';
import NodeBranch from './NodeBranch';

export default function Node(props) {
  const {
    id,
    nestedLevel,
    isRoot,
    lastChildId,
  } = props;

  const isMounted = useSelector(selectIsNodeMountedById(id));
  if (!isMounted) return null;

  return (
    <g>
      <NestedNodesBranch id={id} lastChildId={lastChildId} />
      <NodeBranch id={id} isRoot={isRoot} nestedLevel={nestedLevel} />
      <NodeContainer id={id} isRoot={isRoot} nestedLevel={nestedLevel} />
    </g>
  );
}

Node.defaultProps = {
  lastChildId: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  lastChildId: PropTypes.string,
};
