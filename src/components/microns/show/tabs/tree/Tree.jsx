import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.micron = props.micron;
  }

  render() {
    return (
      <Box className="Tree" sx={{ p: 4, width: 1, height: 1 }} />
    );
  }
}

Tree.propTypes = {
  micron: PropTypes.object.isRequired,
};

export default Tree;
