import React from 'react';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodePositionCalculator from '../../hooks/landing-page-tree/useNodePositionCalculator';
import useNodeUnmountService from '../../hooks/landing-page-tree/useNodeUnmountService';
import NodeButton from './NodeButton';
import NodeLink from './NodeLink';
import NonAnimatedNodeButton from './NonAnimatedNodeButton';
import NonAnimatedNodeLink from './NonAnimatedNodeLink';

export default function Node(props) {
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

  // use non animated buttons and link if user agent is safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  if (isSafari) {
    return (
      <g>
        <NonAnimatedNodeLink
          id={id}
          upperSiblingID={upperSiblingID}
          nestedLevel={nestedLevel}
          isRoot={isRoot}
        />
        <NonAnimatedNodeButton
          id={id}
          nestedLevel={nestedLevel}
          isRoot={isRoot}
        />
        {nodeExpanded && children}
      </g>
    );
  }

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
