import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import useNodeButtonBackground from '../../hooks/landing-page-tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/landing-page-tree/useNodeTreeEvents';
import { MARGIN_TOP, NODE_BUTTON_HEIGHT } from './constants';
import NodeToolbar from './NodeToolbar';
import NodeButtonText from './NodeButtonText';

export default function NonAnimatedNodeButton(props) {
  const {
    id,
    isRoot,
    nestedLevel,
  } = props;

  const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const isEditing = useSelector((state) => state.landingPageNodes[id].isEditing);

  const { onNodeClick } = useNodeTreeEvents({ id });
  const { backgroundColor, color } = useNodeButtonBackground({ id, nestedLevel, isRoot });

  const isCurrentNode = nodeExpanded && id === currentNodeID;

  const nodePosition = useSelector((state) => state.landingPageNodes[id].position);

  const x = nodePosition.xEnds;
  const y = nodePosition.y - MARGIN_TOP;

  return (
    <foreignObject className="NodeName" width="500" height={NODE_BUTTON_HEIGHT + 3} x={x} y={y}>
      <Box display="flex" width="100%">
        <Box
          className="DropShadow"
          component={isEditing ? 'div' : Button}
          onClick={onNodeClick}
          onKeyUp={(event) => event.preventDefault()}
          display="inline-flex"
          alignItems="center"
          sx={{
            backgroundColor,
            height: NODE_BUTTON_HEIGHT,
            color,
            input: {
              color,
            },
            '&:hover': {
              backgroundColor,
            },
            borderRadius: 1.5,
            p: 1,
            cursor: 'pointer',
          }}
        >
          <TagRounded fontSize="small" />
          <NodeButtonText id={id} />
        </Box>

        <Box filter="none">
          {isCurrentNode && <Box className="NodeActions" sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
        </Box>
      </Box>
    </foreignObject>
  );
}

NonAnimatedNodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
