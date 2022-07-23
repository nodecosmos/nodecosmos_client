import * as PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import useNodePositionCalculator from '../../services/tree/useNodePositionCalculator';
import useNodeUnmountService from '../../services/tree/useNodeUnmountService';
import NodeButton from './NodeButton';
import NodeLink from './NodeLink';

export default function Node(props) {
  const {
    id,
    upperSiblingID,
    nestedLevel,
    isRoot,
    children,
  } = props;

  const nodeExpanded = useSelector((state) => state.nodes[id].expanded);

  useNodePositionCalculator({ id, upperSiblingID, isRoot });

  useNodeUnmountService({ id });

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
      {nodeExpanded && children}
    </g>
  );
}

Node.defaultProps = {
  isRoot: false,
  children: null,
  upperSiblingID: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool,
  children: PropTypes.object,
  id: PropTypes.string.isRequired,
  upperSiblingID: PropTypes.string,
  nestedLevel: PropTypes.number.isRequired,
};
