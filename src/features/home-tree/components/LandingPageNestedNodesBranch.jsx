import React from 'react';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_LEFT,
  MARGIN_TOP,
  TRANSITION_ANIMATION_DURATION,
} from '../constants';

export default function LandingPageNestedNodesBranch(props) {
  const { id, lastChildId } = props;
  const { xEnds, y } = useSelector((state) => state.landingPageNodes[id].position);
  const lastChildY = useSelector((state) => lastChildId && state.landingPageNodes[lastChildId].position.y);
  const theme = useTheme();

  const x = xEnds + MARGIN_LEFT;
  const linkY = y + MARGIN_TOP;

  const pathY = lastChildY || linkY;

  if (!lastChildId) return null;

  return (
    <Box
      component="path"
      stroke={theme.palette.tree.default}
      fill="transparent"
      strokeWidth={3.5}
      d={`M ${x} ${linkY} 
         L ${x} ${pathY}`}
      sx={{
        opacity: 0,
        animation: `node-path-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
        transition: `d ${TRANSITION_ANIMATION_DURATION}ms`,
      }}
    />
  );
}

LandingPageNestedNodesBranch.defaultProps = {
  lastChildId: null,
};
LandingPageNestedNodesBranch.propTypes = {
  id: PropTypes.string.isRequired,
  lastChildId: PropTypes.string,
};
