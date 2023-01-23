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
} from './constants';

export default function NestedNodesBranch(props) {
  const { id } = props;

  const isExpanded = useSelector((state) => state.nodes[id].isExpanded);
  const xEnds = useSelector((state) => state.nodes[id].position.xEnds);
  const y = useSelector((state) => state.nodes[id].position.y);
  const yEnds = useSelector((state) => state.nodes[id].position.yEnds);

  const theme = useTheme();

  const x = xEnds + MARGIN_LEFT;
  const linkY = y + MARGIN_TOP;

  const pathY = yEnds || linkY;

  if (!isExpanded || !yEnds) return null;

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

NestedNodesBranch.propTypes = {
  id: PropTypes.string.isRequired,
};
