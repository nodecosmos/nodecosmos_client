import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { MARGIN_LEFT, MARGIN_TOP, NODE_BUTTON_HEIGHT } from '../constants';
import NodeItemToolbar from './NodeItemToolbar';

export default function NodeButton(props) {
  const {
    node,
    parent,
    onNodeClick,
    isRoot,
    backgroundColor,
    isCurrentNode,
  } = props;

  const animationXStarts = parent.xEnds + MARGIN_LEFT;
  const animationYStarts = parent.y + MARGIN_TOP;
  const pathString = `M ${animationXStarts} ${animationYStarts}
                        L ${animationXStarts} ${node.y - MARGIN_TOP}
                        C ${animationXStarts} ${node.y - MARGIN_TOP}
                          ${animationXStarts} ${node.y - MARGIN_TOP}
                          ${animationXStarts + 10} ${node.y - MARGIN_TOP}
                        L ${node.xEnds} ${node.y - MARGIN_TOP}`.replace(/\n/g, '');
  const animationDuration = isRoot ? 0 : 0.25;

  return (
    <foreignObject
      className="NodeName"
      width="500"
      height={NODE_BUTTON_HEIGHT}
      x={0}
      y={0}
      style={{
        offsetPath: `path("${pathString}")`,
        animation: `move ${animationDuration}s forwards`,
        transition: `all ${animationDuration}s`,
      }}
    >
      <Box display="flex" width="100%">
        <Button
          className={`${props.node.expanded && 'expanded'}`}
          onClick={onNodeClick}
          style={{ backgroundColor }}
        >
          <Box fontWeight="bold" display="flex" alignItems="center">
            <TagRounded fontSize="small" sx={{ mr: '4px' }} />
            {node.title}
          </Box>
        </Button>
        <Box filter="none">
          {isCurrentNode && <NodeItemToolbar node={node} />}
        </Box>
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
  isCurrentNode: PropTypes.bool.isRequired,
};
