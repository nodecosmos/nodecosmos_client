import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import * as PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function Tree(props) {
  const {
    micron,
  } = props;

  return (
    <Grid item xs={10}>
      <Link to={`/microns/${micron.id}`}>
        <Typography color="textPrimary">{micron.title}</Typography>
      </Link>
    </Grid>
  );
}

// Tree.defaultProps = {
//   defaultValue: null,
// };

Tree.propTypes = {
  micron: PropTypes.object.isRequired,
};

export default Tree;
