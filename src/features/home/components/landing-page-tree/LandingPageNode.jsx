import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodePositionCalculator from '../../hooks/landing-page-tree/useNodePositionCalculator';
import useNodeUnmountService from '../../hooks/landing-page-tree/useNodeUnmountService';
import LandingPageNodeButton from './LandingPageNodeButton';
import NodeLink from './LandingPageNodeLink';

export default function LandingPageNode(props) {
  const {
    id,
    upperSiblingID,
    nestedLevel,
    isRoot,
    children,
  } = props;

  const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);

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
      <LandingPageNodeButton
        id={id}
        isRoot={isRoot}
        nestedLevel={nestedLevel}
      />
      {nodeExpanded && children}
    </g>
  );
}

LandingPageNode.defaultProps = {
  isRoot: false,
  children: null,
  upperSiblingID: null,
};

LandingPageNode.propTypes = {
  isRoot: PropTypes.bool,
  children: PropTypes.object,
  id: PropTypes.string.isRequired,
  upperSiblingID: PropTypes.string,
  nestedLevel: PropTypes.number.isRequired,
};
