import * as PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentNode } from '../../../../app/appSlice';
import {
  collapseNode, expandNode, nodeIsNotVisible, nodeIsVisible,
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
    parentChainIDs,
    nestedLevel,
    isRoot,
    children,
  } = props;

  const dispatch = useDispatch();
  const nodeExpanded = useSelector((state) => state.nodes[id] && state.nodes[id].expanded);

  const { backgroundColor, parentBackgroundColor } = useNodeButtonBackground({ id, nestedLevel, parentID });

  useNodePositionCalculator({
    id,
    parentID,
    parentChainIDs,
    upperSiblingID,
    isRoot,
  });

  useLayoutEffect(() => {
    dispatch(nodeIsVisible({ id }));
    return () => {
      dispatch(collapseNode({ id }));
      dispatch(nodeIsNotVisible({ id }));
    };
  }, [dispatch, id]);

  const onNodeClick = () => {
    if (nodeExpanded) {
      dispatch(collapseNode({ id }));
    } else {
      dispatch(expandNode({ id }));
      dispatch(setCurrentNode({ id }));
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
  parentChainIDs: PropTypes.array.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
