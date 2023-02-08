import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader(props) {
  const { backgroundColor, color } = props;

  return (
    <Box
      height={1}
      width={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor={backgroundColor}
    >
      <CircularProgress
        size={100}
        sx={{ color }}
      />
    </Box>
  );
}

Loader.defaultProps = {
  backgroundColor: null,
  color: 'background.4',
};

Loader.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};
