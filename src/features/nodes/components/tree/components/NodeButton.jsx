import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import NodeToolbar from '../../NodeToolbar';
import { NODE_BUTTON_HEIGHT } from '../constants';
import useNodeButtonAnimationStyle from '../services/useNodeButtonAnimationStyle';

export default function NodeButton(props) {
  const {
    node,
    parent,
    onNodeClick,
    isRoot,
    backgroundColor,
    isCurrentNode,
  } = props;

  const style = useNodeButtonAnimationStyle({ node, parent, isRoot });
  const nodeToolbar = isCurrentNode && (
    <Box className="NodeActions" sx={{ ml: 2 }}>
      <NodeToolbar addNode={console.log} />
    </Box>
  );

  return (
    <foreignObject className="NodeName" width="500" height={NODE_BUTTON_HEIGHT} x={0} y={0} style={style}>
      <Box display="flex" width="100%">
        <Button className={`${props.node.expanded && 'expanded'}`} onClick={onNodeClick} style={{ backgroundColor }}>
          <Box fontWeight="bold" display="flex" alignItems="center">
            <TagRounded fontSize="small" sx={{ mr: '4px' }} />
            {node.title}
          </Box>
        </Button>
        <Box filter="none">
          {nodeToolbar}
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
