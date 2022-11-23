import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import { NODE_BUTTON_HEIGHT } from './constants';
import NodeToolbar from './NodeToolbar';
import useNodeButtonAnimationStyle from '../../hooks/landing-page-tree/useNodeButtonAnimationStyle';
import useNodeButtonBackground from '../../hooks/landing-page-tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/landing-page-tree/useNodeTreeEvents';
import NodeButtonText from './NodeButtonText';

export default function NodeButton(props) {
  const {
    id,
    isRoot,
    nestedLevel,
  } = props;

  const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const isNew = useSelector((state) => state.landingPageNodes[id].isNew);

  const { onNodeClick } = useNodeTreeEvents({ id });
  const { backgroundColor } = useNodeButtonBackground({ id, nestedLevel, isRoot });
  const style = useNodeButtonAnimationStyle({ id, isRoot });

  const isCurrentNode = nodeExpanded && id === currentNodeID;
  const hasNestedNodes = useSelector((state) => state.landingPageNodes[id].node_ids.length > 0);

  const buttonClassName = nodeExpanded && isCurrentNode
    || nodeExpanded && hasNestedNodes ? 'expanded' : null;

  return (
    <foreignObject className="NodeName" width="500" height={NODE_BUTTON_HEIGHT} x={0} y={0} style={style}>
      <Box display="flex" width="100%">
        <Button
          className={buttonClassName}
          onClick={onNodeClick}
          onMouseDown={(e) => e.stopPropagation()}
          style={{ backgroundColor }}
          disableRipple={isNew}
        >
          <Box fontWeight="bold" display="flex" alignItems="center">
            <TagRounded fontSize="small" sx={{ mr: 2 }} />
            <NodeButtonText id={id} />
          </Box>
        </Button>
        <Box filter="none">
          {isCurrentNode && <Box className="NodeActions" sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
        </Box>
      </Box>
    </foreignObject>
  );
}

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
