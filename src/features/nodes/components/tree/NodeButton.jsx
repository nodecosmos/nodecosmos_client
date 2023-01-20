/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import useNodeButtonBackground from '../../hooks/tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/tree/useNodeTreeEvents';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION, MARGIN_TOP, NODE_BUTTON_HEIGHT, TRANSITION_ANIMATION_DURATION,
} from './constants';
import NodeButtonText from './NodeButtonText';
import NodeToolbar from './NodeToolbar';

export default function NodeButton(props) {
  const {
    id,
    isRoot,
    nestedLevel,
  } = props;

  const nodeExpanded = useSelector((state) => state.nodes[id].isExpanded);
  const currentNodeID = useSelector((state) => state.app.currentNodeID);

  const isEditing = useSelector((state) => state.nodes[id].isEditing);
  const isTemp = useSelector((state) => state.nodes[id].isTemp);
  const replaceTempNode = useSelector((state) => state.nodes[id].replaceTempNode);

  const { onNodeClick } = useNodeTreeEvents(id);
  const { backgroundColor, color } = useNodeButtonBackground({ id, nestedLevel, isRoot });

  const isCurrentNode = nodeExpanded && id === currentNodeID;

  const nodePosition = useSelector((state) => state.nodes[id].position);
  const x = nodePosition.xEnds;
  const y = nodePosition.y - MARGIN_TOP;

  if (!x) {
    return null;
  }

  const initialAnimationDuration = isRoot || replaceTempNode ? 0 : INITIAL_ANIMATION_DURATION;
  const initialAnimationDelay = isRoot || replaceTempNode ? 0 : INITIAL_ANIMATION_DELAY;

  return (
    <Box
      component="g"
      sx={{
        opacity: 0,
        animation: `node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
      }}
    >
      <foreignObject
        className="NodeName"
        width="500"
        height={NODE_BUTTON_HEIGHT + 3}
        x={x}
        y={y}
        style={{
          transition: isTemp ? null : `y ${TRANSITION_ANIMATION_DURATION}ms`,
        }}
      >
        <Box display="flex" width="100%">
          <Box
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
              py: 0,
              px: 2,
              cursor: 'pointer',
              boxShadow: '2px 2px 0px rgb(0 0 0 / 0.15)',
            }}
          >
            <TagRounded fontSize="small" ml="-2px" />
            <NodeButtonText id={id} />
          </Box>
          <Box filter="none">
            {isCurrentNode && <Box className="NodeActions" sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
          </Box>
        </Box>
      </foreignObject>
    </Box>
  );
}

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
