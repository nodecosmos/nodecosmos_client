import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import NodeToolbar from '../../NodeToolbar';
import { NODE_BUTTON_HEIGHT } from '../constants';
import useNodeButtonAnimationStyle from '../services/useNodeButtonAnimationStyle';

export default function NodeButton(props) {
  const {
    id,
    parentID,
    onNodeClick,
    isRoot,
    backgroundColor,
  } = props;

  const nodeTitle = useSelector((state) => state.nodes[id].title);
  const nodeExpanded = useSelector((state) => state.nodes[id].expanded);
  const currentNodeID = useSelector((state) => state.app.currentNodeID);

  const style = useNodeButtonAnimationStyle({ id, parentID, isRoot });
  const isCurrentNode = nodeExpanded && id === currentNodeID;

  const nodeToolbar = isCurrentNode && (
    <Box className="NodeActions" sx={{ ml: 2 }}>
      <NodeToolbar />
    </Box>
  );

  return (
    <foreignObject className="NodeName" width="500" height={NODE_BUTTON_HEIGHT} x={0} y={0} style={style}>
      <Box display="flex" width="100%">
        <Button className={`${nodeExpanded && 'expanded'}`} onClick={onNodeClick} style={{ backgroundColor }}>
          <Box fontWeight="bold" display="flex" alignItems="center">
            <TagRounded fontSize="small" sx={{ mr: '4px' }} />
            {nodeTitle}
          </Box>
        </Button>
        <Box filter="none">
          {nodeToolbar}
        </Box>
      </Box>
    </foreignObject>
  );
}

NodeButton.defaultProps = {
  parentID: null,
};

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  parentID: PropTypes.string,
  onNodeClick: PropTypes.func.isRequired,
  isRoot: PropTypes.bool.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};
