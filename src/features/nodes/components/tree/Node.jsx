import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeMountService from '../../hooks/tree/useNodeMountService';
import NestedNodesBranch from './NestedNodesBranch';
import NodeButton from './NodeButton';
import NodeLink from './NodeLink';

export default function Node(props) {
  const {
    id,
    upperSiblingId,
    nestedLevel,
    isRoot,
    lastChildId,
  } = props;

  // useCalculateInitialPosition({ id, isRoot, upperSiblingId });
  useNodeMountService({ id });

  const isMounted = useSelector((state) => isRoot || state.nodes.byId[id].isMounted);
  if (!isMounted) return null;

  return (
    <g>
      <NestedNodesBranch id={id} lastChildId={lastChildId} />
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
  lastChildId: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool,
  nestedLevel: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  upperSiblingId: PropTypes.string,
  lastChildId: PropTypes.string,
  allTreeNodeIds: PropTypes.array.isRequired,
  allTreeNodesIndex: PropTypes.number.isRequired,
};
