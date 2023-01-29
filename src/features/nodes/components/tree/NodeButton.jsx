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
  INITIAL_ANIMATION_DURATION,
  MARGIN_TOP,
  NODE_BUTTON_HEIGHT,
  TRANSITION_ANIMATION_DURATION,
} from './constants';
import NodeButtonText from './NodeButtonText';
import NodeToolbar from './NodeToolbar';

export default function NodeButton(props) {
  const {
    id,
    isRoot,
    nestedLevel,
  } = props;

  const isExpanded = useSelector((state) => state.nodes.expandedTreeNodesById[id]);

  const isEditing = useSelector((state) => state.nodes.byId[id].isEditing);
  const isCurrent = useSelector((state) => state.nodes.byId[id].isCurrent);
  const isReplacingTempNode = useSelector((state) => state.nodes.byId[id].isReplacingTempNode);

  const { onNodeClick } = useNodeTreeEvents(id);
  const {
    backgroundColor,
    color,
  } = useNodeButtonBackground({
    id,
    nestedLevel,
    isRoot,
  });

  const showActions = isExpanded && isCurrent;

  const x = useSelector((state) => state.nodes.positionsById[id]?.xEnds);
  const y = useSelector((state) => state.nodes.positionsById[id] && state.nodes.positionsById[id].y - MARGIN_TOP);

  if (!x) return null;

  const initialAnimationDuration = isRoot || isReplacingTempNode ? 0 : INITIAL_ANIMATION_DURATION;
  const initialAnimationDelay = isRoot || isReplacingTempNode ? 0 : INITIAL_ANIMATION_DELAY;

  return (
    <g style={{
      opacity: 0,
      animation: `node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
    }}
    >
      <foreignObject
        width="700"
        height={NODE_BUTTON_HEIGHT + 3}
        x={x}
        y={y}
        style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
      >
        <div className="NodeButtonContainer">
          {
            // TODO: Get rid of Box & component attribute.
            // Instead, return different components according to isEditing.
          }
          <Box
            className="NodeButton"
            type="button"
            component={isEditing ? 'div' : Button}
            onClick={onNodeClick}
            onKeyUp={(event) => event.preventDefault()}
            style={{
              backgroundColor,
              height: NODE_BUTTON_HEIGHT,
              color,
            }}
          >
            <TagRounded fontSize="small" ml="-2px" />
            <NodeButtonText id={id} color={color} />
          </Box>
          <div>
            {showActions && <Box sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

NodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
