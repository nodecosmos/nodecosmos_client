/* eslint-disable react-hooks/rules-of-hooks */
import * as PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { SET_CURRENT_NODE, UPDATE_NODE } from '../../../../actions/types';
import NodeButton from './components/NodeButton';
import NodeLink from './components/NodeLink';
import useNodeButtonBackground from './services/useNodeButtonBackground';
import useNodePositionCalculator from './services/useNodePositionCalculator';

function Node(props) {
  const {
    node,
    parent,
    upperSibling,
    isRoot,
    currentNodeID,
    children,
    nestedLevel,
    expandNode,
    collapseNode,
    setCurrentNode,
  } = props;

  const isCurrentNode = !!node.expanded && node.id === currentNodeID;

  const { backgroundColor, parentBackgroundColor } = useNodeButtonBackground({ node, nestedLevel, parent });

  useNodePositionCalculator(props);

  useLayoutEffect(() => () => collapseNode(node), []);

  const onNodeClick = () => {
    if (node.expanded) {
      setTimeout(() => collapseNode(node), 100);
    } else {
      expandNode(node);
      setCurrentNode(node);
    }
  };

  return (
    <g>
      <NodeLink
        node={node}
        parent={parent}
        upperSibling={upperSibling}
        isRoot={isRoot}
        parentColor={parentBackgroundColor}
      />
      <NodeButton
        node={node}
        parent={parent}
        onNodeClick={onNodeClick}
        isRoot={isRoot}
        isCurrentNode={isCurrentNode}
        backgroundColor={backgroundColor}
      />

      {node.expanded && children}
    </g>
  );
}

Node.defaultProps = {
  isRoot: false,
  children: null,
  upperSibling: null,
  parent: {
    x: 0,
    y: 0,
    yEnds: 0,
    xEnds: 0,
  },
  currentNodeID: null,
};

Node.propTypes = {
  isRoot: PropTypes.bool,
  children: PropTypes.array,
  node: PropTypes.object.isRequired,
  parent: PropTypes.object,
  upperSibling: PropTypes.object,
  parentChainIDs: PropTypes.array.isRequired,
  nestedLevel: PropTypes.number.isRequired,
  currentNodeID: PropTypes.string,
  expandNode: PropTypes.func.isRequired,
  collapseNode: PropTypes.func.isRequired,
  setCurrentNode: PropTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  const node = state.nodes[ownProps.id];
  const { currentNodeID } = state.app;
  const parent = state.nodes[ownProps.parentID];
  const upperSibling = state.nodes[ownProps.upperSiblingID];

  return {
    node, parent, upperSibling, currentNodeID,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    expandNode: (node) => dispatch({ type: UPDATE_NODE, payload: { ...node, expanded: true } }),
    collapseNode: (node) => dispatch({ type: UPDATE_NODE, payload: { ...node, expanded: false } }),
    setCurrentNode: (node) => dispatch({ type: SET_CURRENT_NODE, payload: node.id }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Node);
