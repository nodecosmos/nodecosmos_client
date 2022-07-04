import * as PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNode } from '../../../../app/appSlice';
import {
  collapseNode, expandNode,
} from '../../../nodeSlice';
import useNodeButtonBackground from '../services/useNodeButtonBackground';
import useNodePositionCalculator from '../services/useNodePositionCalculator';
import NodeButton from './NodeButton';
import NodeLink from './NodeLink';

export default function Node(props) {
  const {
    id,
    parentID,
    upperSiblingID,
    nestedLevel,
    isRoot,
    children,
  } = props;

  const dispatch = useDispatch();
  const nodeExpanded = useSelector((state) => state.nodes[id].expanded);

  const { backgroundColor, parentBackgroundColor } = useNodeButtonBackground({
    id,
    nestedLevel,
    parentID,
    isRoot,
  });

  useNodePositionCalculator({
    id,
    parentID,
    upperSiblingID,
    isRoot,
  });

  useLayoutEffect(() => () => {
    dispatch(collapseNode({ id }));
  }, [dispatch, id]);

  const onNodeClick = () => {
    if (nodeExpanded) {
      dispatch(collapseNode({ id }));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setCurrentNode(id));
    }
  };

  return (
    <g>
      <NodeLink
        id={id}
        parentID={parentID}
        upperSiblingID={upperSiblingID}
        isRoot={isRoot}
        parentColor={parentBackgroundColor}
      />
      <NodeButton
        id={id}
        parentID={parentID}
        onNodeClick={onNodeClick}
        isRoot={isRoot}
        backgroundColor={backgroundColor}
      />
      {nodeExpanded && children}
    </g>
  );
}

Node.defaultProps = {
  isRoot: false,
  children: null,
  upperSiblingID: null,
  parentID: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool,
  children: PropTypes.object,
  id: PropTypes.string.isRequired,
  parentID: PropTypes.string,
  upperSiblingID: PropTypes.string,
  nestedLevel: PropTypes.number.isRequired,
};
