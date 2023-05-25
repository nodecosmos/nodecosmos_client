import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from '@mui/material';

/**
 *
 * @param children
 * @param round
 * @returns {JSX.Element}
 * @description
 * Looks like It must have two or more children to work properly.
 */
export default function ToolbarContainer({ children, round }) {
  return (
    <ButtonGroup
      variant="contained"
      disableElevation
      disableRipple
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: 128,
        height: 1,
        '.MuiButtonGroup-grouped': {
          '&:not(:last-of-type), &:not(:first-of-type)': {
            borderBottom: 2,
            borderColor: 'transparent',
            width: 40,
            height: 40,
            minWidth: 38,
            p: 0,
            backgroundColor: 'transparent',
            borderRight: 'none',
            transition: 'none',
            borderRadius: round ? '50%' : 0,

            '&:hover': {
              backgroundColor: 'toolbar.hover',
              borderColor: round ? 'transparent' : 'inherit',
            },
            '&.active': {
              backgroundColor: 'toolbar.active',
              borderColor: 'inherit',
              borderRadius: 0,
            },
          },
        },
        svg: {
          fontSize: '1rem',
        },
      }}
    >
      {children}
    </ButtonGroup>
  );
}

ToolbarContainer.defaultProps = {
  round: false,
};

ToolbarContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  round: PropTypes.bool,
};
