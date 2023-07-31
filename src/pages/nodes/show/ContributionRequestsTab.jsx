import React from 'react';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
/* mui */
import {
  Grid,
} from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ContributionRequestsTab(props) {
  const { id } = useParams();

  return (
    <Grid container spacing={3} mt={1} justifyContent="center" />
  );
}

ContributionRequestsTab.propTypes = {
  node: PropTypes.object.isRequired,
};
