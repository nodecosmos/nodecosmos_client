import React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
/* mui */
import { Box } from '@mui/material';
/* node-lib */
import { indexNodes, setCurrentToolbar, setSubtitle } from '../../actions';
import NodeCard from '../../features/nodes/components/NodeCard';

class NodeContainer extends React.Component {
  componentDidMount = () => {
    this.props.indexNodes();
    this.props.setCurrentToolbar('NodeIndexToolbar');
  }

  renderNodes = () => Object.keys(this.props.nodes).map((nodeId) => {
    const node = this.props.nodes[nodeId];
    return (
      <Box width="60%" p={2} key={nodeId}>
        <NodeCard node={node} />
      </Box>
    );
  })

  render() {
    return (
      <Box height={1}>
        <Box p={2} mt="2px" height={0.95}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            spacing={3}
            mt={-2}
            height={1}
            overflow="auto"
          >
            {this.renderNodes()}
          </Box>
        </Box>
      </Box>
    );
  }
}

NodeContainer.propTypes = {
  nodes: PropTypes.object.isRequired,
  indexNodes: PropTypes.func.isRequired,
  setCurrentToolbar: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { nodes } = state;
  return { nodes };
}

export default connect(mapStateToProps, { indexNodes, setCurrentToolbar, setSubtitle })(NodeContainer);
