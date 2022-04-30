import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { MARGIN_LEFT, MARGIN_TOP, MICRON_BUTTON_HEIGHT } from '../constants';

export default function NodeButton(props) {
  const {
    micron,
    parent,
    onMicronClick,
    isRoot,
    color,
  } = props;

  let style = null;
  let x = micron.x + MARGIN_LEFT;
  let y = micron.y - MARGIN_TOP;

  if (!isRoot) {
    const animationXStarts = parent.xEnds + MARGIN_LEFT;
    const animationYStarts = parent.y + MARGIN_TOP;
    const pathString = `M ${animationXStarts} ${animationYStarts}
                        L ${animationXStarts} ${micron.y - MARGIN_TOP}
                        C ${animationXStarts} ${micron.y - MARGIN_TOP}
                          ${animationXStarts} ${micron.y - MARGIN_TOP}
                          ${animationXStarts + 10} ${micron.y - MARGIN_TOP}
                        L ${micron.xEnds} ${micron.y - MARGIN_TOP}`.replace(/\n/g, '');

    // const animationDirection = parent.initHide ? 'move-reverse' : 'move';
    const opacity = parent.initHide ? 0 : 1;

    style = {
      offsetPath: `path("${pathString}")`,
      animation: 'move .25s forwards',
      transition: 'all .25s',
      opacity,
    };

    x = 0;
    y = 0;
  }

  return (
    <foreignObject
      className="MicronName"
      width="500"
      height={MICRON_BUTTON_HEIGHT}
      x={x}
      y={y}
      style={style}
    >
      <Box alignItems="center" display="flex" width="100%">
        <Button
          onClick={onMicronClick}
          style={{ backgroundColor: color }}
        >
          <Box fontWeight="bold" display="flex" alignItems="center">
            <TagRounded fontSize="small" />
            {micron.title}
          </Box>
        </Button>
      </Box>
    </foreignObject>
  );
}

NodeButton.propTypes = {
  micron: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  onMicronClick: PropTypes.func.isRequired,
  isRoot: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};
