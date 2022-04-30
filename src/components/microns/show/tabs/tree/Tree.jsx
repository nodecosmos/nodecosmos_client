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

  nestedMicrons = (micron) => micron.micron_ids.map((micronIdObject) => this.props.microns[micronIdObject.$oid])

  renderNestedMicrons = (micron, nestedLevel = 1, parentChainIDs = []) => {
    const nestedMicrons = this.nestedMicrons(micron);
    const parentIDs = [...parentChainIDs, micron.id];

    return nestedMicrons.map((nestedMicron, index) => (
      <>
        <Node
          key={nestedMicron.id}
          id={nestedMicron.id}
          parentChainIDs={parentIDs}
          parentID={micron.id}
          upperSiblingID={nestedMicrons[index - 1] && nestedMicrons[index - 1].id}
          isLastChild={!nestedMicrons[index + 1]}
          nestedLevel={nestedLevel}
          index={index}
          appendTopLevelComponent={this.appendTopLevelComponent}
        >
          {this.renderNestedMicrons(nestedMicron, nestedLevel + 1, [...parentChainIDs, nestedMicron.id])}
        </Node>
      </>
    ));
  }

  render() {
    const { micron } = this.props;

    return (
      <Box className="Tree" sx={{ p: 4, width: 1, height: 1 }}>
        <Transformable>
          <Node
            id={micron.id}
            nestedLevel={0}
            orderNumber={1}
            parentChainIDs={[]}
            index={0}
            isRoot
            appendTopLevelComponent={this.appendTopLevelComponent}
          >
            {this.renderNestedMicrons(micron)}
            {this.state.topLevelComponents}
          </Node>
        </Transformable>
      </Box>
    );
  }
}

Tree.propTypes = {
  micron: PropTypes.object.isRequired,
  microns: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { microns } = state;
  return { microns };
}

export default connect(mapStateToProps)(Tree);
