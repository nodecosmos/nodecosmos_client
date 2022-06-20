import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* mui */
import { Box } from '@mui/material';
import Transformable from './components/Transformable';
import Node from './Node';

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topLevelComponents: [],
    };
  }

  appendTopLevelComponent = (component) => {
    this.setState((prevState) => this.setState({ topLevelComponents: [...prevState.topLevelComponents, component] }));
  };

  nestedNodes = (node) => node.node_ids.map((nodeIdObject) => this.props.nodes[nodeIdObject.$oid])

  renderNestedNodes = (node, nestedLevel = 1, parentChainIDs = []) => {
    const nestedNodes = this.nestedNodes(node);
    const parentIDs = [...parentChainIDs, node.id];

    return nestedNodes.map((nestedNode, index) => (
      <Node
        key={nestedNode.id}
        id={nestedNode.id}
        parentChainIDs={parentIDs}
        parentID={node.id}
        upperSiblingID={nestedNodes[index - 1] && nestedNodes[index - 1].id}
        isLastChild={!nestedNodes[index + 1]}
        nestedLevel={nestedLevel}
        index={index}
        appendTopLevelComponent={this.appendTopLevelComponent}
      >
        {this.renderNestedNodes(nestedNode, nestedLevel + 1, [...parentChainIDs, nestedNode.id])}
      </Node>
    ));
  }

  render() {
    const { node } = this.props;

    return (
      <Box className="Tree" sx={{ width: 1, height: 1 }}>
        <Transformable>
          <Node
            id={node.id}
            nestedLevel={0}
            orderNumber={1}
            parentChainIDs={[]}
            index={0}
            isRoot
            appendTopLevelComponent={this.appendTopLevelComponent}
          >
            {this.renderNestedNodes(node)}
            {this.state.topLevelComponents}
          </Node>
        </Transformable>
      </Box>
    );
  }
}

Tree.propTypes = {
  node: PropTypes.object.isRequired,
  nodes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { nodes } = state;
  return { nodes };
}

export default connect(mapStateToProps)(Tree);
