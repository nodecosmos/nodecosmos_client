/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TagRounded from '@mui/icons-material/TagRounded';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import useNodeButtonBackground from '../../hooks/landing-page-tree/useNodeButtonBackground';
import useNodeTreeEvents from '../../hooks/landing-page-tree/useNodeTreeEvents';
import {
  INITIAL_ANIMATION_DURATION, MARGIN_TOP, NODE_BUTTON_HEIGHT, TRANSITION_ANIMATION_DURATION,
} from './constants';
import NodeButtonText from './NodeButtonText';
import NodeToolbar from './NodeToolbar';

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default function NodeButton(props) {
  const {
    id,
    isRoot,
    nestedLevel,
  } = props;

  const nodeExpanded = useSelector((state) => state.landingPageNodes[id].expanded);
  const currentNodeID = useSelector((state) => state.app.currentNodeID);
  const isEditing = useSelector((state) => state.landingPageNodes[id].isEditing);
  const isNew = useSelector((state) => state.landingPageNodes[id].isNew);
  const animateTransition = useSelector((state) => state.landingPageNodes[id].animateTransition);

  const { onNodeClick } = useNodeTreeEvents({ id });
  const { backgroundColor, color } = useNodeButtonBackground({ id, nestedLevel, isRoot });

  const isCurrentNode = nodeExpanded && id === currentNodeID;

  const nodePosition = useSelector((state) => state.landingPageNodes[id].position);
  const x = nodePosition.xEnds;
  const y = nodePosition.y - MARGIN_TOP;

  const animationDuration = isSafari || !animateTransition ? 0 : TRANSITION_ANIMATION_DURATION;

  return (
    <Box
      component="g"
      sx={{
        animation: `node-button-appear ${INITIAL_ANIMATION_DURATION}ms forwards`,
      }}
    >
      <foreignObject
        className="NodeName"
        width="500"
        height={NODE_BUTTON_HEIGHT + 3}
        x={x}
        y={y}
        style={{
          transition: isNew ? null : `y ${animationDuration}ms`,
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
              p: '0px 12px',
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
