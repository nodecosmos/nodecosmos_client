import React from 'react';
import PropTypes from 'prop-types';
/* mui */
import {
  Tabs,
  Tab,
  Typography,
  Box,
} from '@mui/material';
import { Favorite } from '@mui/icons-material';

export default function Micron(props) {
  const { micron } = props;

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box py={4} px={5} width={1}>
      <Typography variant="h5" textAlign="center" mb={2}>
        {micron.title}
      </Typography>
      <Typography variant="body2" fontWeight="normal">
        {micron.description}
      </Typography>
    </Box>

  );
}

Micron.propTypes = {
  micron: PropTypes.object.isRequired,
};
