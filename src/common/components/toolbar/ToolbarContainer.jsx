import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup } from '@mui/material';
import { HEADER_HEIGHT } from '../../../features/app/constants';

export default function ToolbarContainer({
  children, round, size, ml, mr, fontSize, hasText, borderRadius, showIndicator, hoverColor, activeColor,
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
        span: {
          ml: 1,
          mr: 1.5,
          fontWeight: 500,
        },
        '.MuiButtonGroup-grouped': {
          '&:not(:last-of-type), &:not(:first-of-type)': {
            borderBottom: showIndicator ? 3 : 0,
            borderColor: 'transparent',
            ml,
            mr,
            width: 'auto',
            height: size,
            minWidth: size,
            p: 0,
            backgroundColor: 'transparent',
            borderRight: 'none',
            transition: 'none',
            borderRadius,
            '&:hover': {
              borderRadius: round ? '50%' : borderRadius,
              backgroundColor: hoverColor,
              borderColor: 'transparent',
            },
            '&.active': {
              backgroundColor: activeColor,
              borderColor: 'inherit',
              borderRadius,
            },
          },
        },
        svg: {
          ml: hasText ? 1.5 : 0,
          fontSize,
        },
      }}
    >
      {children}
    </ButtonGroup>
  );
}

ToolbarContainer.defaultProps = {
  round: true,
  size: HEADER_HEIGHT,
  ml: 0,
  mr: 0.15,
  fontSize: '1rem',
  hasText: false,
  borderRadius: 0,
  showIndicator: true,
  hoverColor: 'toolbar.hover',
  activeColor: 'toolbar.active',
};

ToolbarContainer.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  round: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ml: PropTypes.number,
  mr: PropTypes.number,
  fontSize: PropTypes.string,
  hasText: PropTypes.bool,
  borderRadius: PropTypes.number,
  showIndicator: PropTypes.bool,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
};
