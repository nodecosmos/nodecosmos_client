import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from '@mui/material';

/**
 *
 * @param children
 * @returns {JSX.Element}
 * @description
 * Looks like It must have two or more children to work properly.
 */
export default function ToolbarContainer({ children }) {
  return (
    <ButtonGroup
      variant="contained"
      disableElevation
      disableRipple
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 1,
        '.MuiButtonGroup-grouped': {
          '&:not(:last-of-type), &:not(:first-of-type)': {
            width: 45,
            height: 45,
            ml: '5.5px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRight: 'none',
            transition: 'none',
            borderRadius: 1,
            '&.active': {
              backgroundColor: 'toolbar.active',
            },
            '&:hover': {
              backgroundColor: 'toolbar.hover',
            },
          },
        },
        svg: {
          fontSize: '1.25rem',
        },
      }}
    >
      {children}
    </ButtonGroup>
  );
}

ToolbarContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};
