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

  const nodeExpanded = useSelector((state) => state.nodes.byId[id].isExpanded);

  const isEditing = useSelector((state) => state.nodes.byId[id].isEditing);
  const isCurrent = useSelector((state) => state.nodes.byId[id].isCurrent);
  const replaceTempNode = useSelector((state) => state.nodes.byId[id].replaceTempNode);

  const { onNodeClick } = useNodeTreeEvents(id);
  const { backgroundColor, color } = useNodeButtonBackground({ id, nestedLevel, isRoot });

  const showActions = nodeExpanded && isCurrent;

  const x = useSelector((state) => state.nodes.positionsById[id]?.xEnds);
  const y = useSelector((state) => state.nodes.positionsById[id] && state.nodes.positionsById[id].y - MARGIN_TOP);

  if (!x) {
    return null;
  }

  const initialAnimationDuration = isRoot || replaceTempNode ? 0 : INITIAL_ANIMATION_DURATION;
  const initialAnimationDelay = isRoot || replaceTempNode ? 0 : INITIAL_ANIMATION_DELAY;

  return (
    <g
      style={{
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
          transition: `y ${TRANSITION_ANIMATION_DURATION}ms`,
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box
            type="button"
            component={isEditing ? 'div' : Button}
            onClick={onNodeClick}
            onKeyUp={(event) => event.preventDefault()}
            display="inline-flex"
            alignItems="center"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor,
              height: NODE_BUTTON_HEIGHT,
              color,
            }}
            sx={{
              borderRadius: 1.5,
              py: 0,
              px: 2,
              cursor: 'pointer',
              boxShadow: '2px 2px 0px rgb(0 0 0 / 0.15)',
              input: {
                color,
              },
            }}
          >
            <TagRounded fontSize="small" ml="-2px" />
            <NodeButtonText id={id} />
          </Box>
          <div>
            {showActions && <Box sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
          </div>
        </Box>
      </foreignObject>
    </g>
  );
}

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
