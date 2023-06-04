import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from '@mui/material';
import { HEADER_HEIGHT } from '../../../features/app/constants';

/**
 *
 * @param children
 * @param round
 * @returns {JSX.Element}
 * @description
 * Looks like It must have two or more children to work properly.
 */
export default function ToolbarContainer({
  children, round, size, ml, fontSize,
}) {
  return (
    <ButtonGroup
      variant="contained"
      disableElevation
      disableRipple
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 1,
        '.MuiButtonGroup-grouped': {
          '&:not(:last-of-type), &:not(:first-of-type)': {
            borderBottom: 3,
            borderColor: 'transparent',
            ml,
            width: size,
            height: size,
            minWidth: size,
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
          fontSize,
        },
      }}
    >
      {children}
    </ButtonGroup>
  );
}

ToolbarContainer.defaultProps = {
  round: false,
  size: HEADER_HEIGHT,
  ml: 0,
  fontSize: '1rem',
};

ToolbarContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  round: PropTypes.bool,
  size: PropTypes.string,
  ml: PropTypes.number,
  fontSize: PropTypes.string,
};
