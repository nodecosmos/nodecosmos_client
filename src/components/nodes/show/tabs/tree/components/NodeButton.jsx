import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { MARGIN_LEFT, MARGIN_TOP, NODE_BUTTON_HEIGHT } from '../constants';

export default function NodeButton(props) {
  const {
    node,
    parent,
    onNodeClick,
    isRoot,
    backgroundColor,
  } = props;

  let style = null;

  let x = node.x + MARGIN_LEFT;
  let y = node.y - MARGIN_TOP;

  const className = props.node.expanded ? 'expanded' : '';

  if (!false) {
    const animationXStarts = parent.xEnds + MARGIN_LEFT;
    const animationYStarts = parent.y + MARGIN_TOP;
    const pathString = `M ${animationXStarts} ${animationYStarts}
                        L ${animationXStarts} ${node.y - MARGIN_TOP}
                        C ${animationXStarts} ${node.y - MARGIN_TOP}
                          ${animationXStarts} ${node.y - MARGIN_TOP}
                          ${animationXStarts + 10} ${node.y - MARGIN_TOP}
                        L ${node.xEnds} ${node.y - MARGIN_TOP}`.replace(/\n/g, '');

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
      className="NodeName"
      width="500"
      height={NODE_BUTTON_HEIGHT}
      x={x}
      y={y}
      style={style}
    >
      <Box alignItems="center" display="flex" width="100%">
        <Button
          className={className}
          onClick={onNodeClick}
          style={{ backgroundColor }}
        >
          <Box fontWeight="bold" display="flex" alignItems="center">
            <TagRounded fontSize="small" sx={{ mr: '4px' }} />
            {node.title}
          </Box>
        </Button>
      </Box>
    </foreignObject>
  );
}

NodeButton.propTypes = {
  node: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
  onNodeClick: PropTypes.func.isRequired,
  isRoot: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
