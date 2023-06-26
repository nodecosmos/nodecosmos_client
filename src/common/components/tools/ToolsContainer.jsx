import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

export default function ToolsContainer({ children }) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        ml: 1,
        '.Item': {
          width: 31,
          height: 1,
          mx: 0.5,
          borderRadius: 1,
          '&:hover': { backgroundColor: 'toolbar.hover' },
        },
        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
      }}
    >
      {children}
    </Box>
  );
}

ToolsContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
