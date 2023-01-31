import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

/* nodecosmos */
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_TOP,
  NODE_BUTTON_HEIGHT,
  TRANSITION_ANIMATION_DURATION,
} from './constants';
import NodeButton from './NodeButton';
import NodeButtonText from './NodeInput';
import NodeToolbar from './NodeToolbar';

export default function NodeContainer(props) {
  const {
    id,
    isRoot,
    nestedLevel,
  } = props;

  const isExpanded = useSelector((state) => state.nodes.expandedTreeNodesById[id]);

  const isEditing = useSelector((state) => state.nodes.byId[id].isEditing);
  const isCurrent = useSelector((state) => state.nodes.byId[id].isCurrent);
  const isReplacingTempNode = useSelector((state) => state.nodes.byId[id].isReplacingTempNode);

  const showActions = isExpanded && isCurrent;

  const x = useSelector((state) => state.nodes.positionsById[id]?.xEnds);
  const y = useSelector((state) => state.nodes.positionsById[id] && state.nodes.positionsById[id].y - MARGIN_TOP);

  if (!x) return null;

  const initialAnimationDuration = isRoot || isReplacingTempNode ? 0 : INITIAL_ANIMATION_DURATION;
  const initialAnimationDelay = isRoot || isReplacingTempNode ? 0 : INITIAL_ANIMATION_DELAY;

  const content = isEditing ? <NodeButtonText id={id} isRoot={isRoot} nestedLevel={nestedLevel} />
    : <NodeButton id={id} isRoot={isRoot} nestedLevel={nestedLevel} />;

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
          {content}
          <div>
            {showActions && <Box sx={{ ml: 2 }}><NodeToolbar id={id} /></Box>}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

NodeContainer.propTypes = {
  id: PropTypes.string.isRequired,
  isRoot: PropTypes.bool.isRequired,
  nestedLevel: PropTypes.number.isRequired,
};
