import React from 'react';
import Box from '@mui/material/Box';
import * as PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { MARGIN_LEFT, MARGIN_TOP, TRANSITION_ANIMATION_DURATION } from './constants';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NestedNodesBranch(props) {
  const { id, lastChildId } = props;
  const { xEnds, y } = useSelector((state) => state.landingPageNodes[id].position);
  const lastChildY = useSelector((state) => lastChildId && state.landingPageNodes[lastChildId].position.y);

  const x = xEnds + MARGIN_LEFT;
  const linkY = y + MARGIN_TOP;

  const pathY = lastChildY || linkY;

  const animationDuration = isSafari ? 0 : TRANSITION_ANIMATION_DURATION;

  return (
    <Box
      component="path"
      stroke="#414650"
      fill="transparent"
      strokeWidth={3.5}
      d={`M ${x} ${linkY} L ${x} ${pathY}`}
      sx={{
        transition: `d ${animationDuration}s`,
      }}
    />
  );
}

NestedNodesBranch.defaultProps = {
  lastChildId: null,
};
NestedNodesBranch.propTypes = {
  id: PropTypes.string.isRequired,
  lastChildId: PropTypes.string,
};
