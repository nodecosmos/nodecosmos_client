import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectIsNodeExpandedById, selectNodeAttributeById, selectNodePositionById } from '../../nodes.selectors';

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

  const isExpanded = useSelector(selectIsNodeExpandedById(id));

  const isEditing = useSelector(selectNodeAttributeById(id, 'isEditing'));
  const isCurrent = useSelector(selectNodeAttributeById(id, 'isCurrent'));

  const showActions = isExpanded && isCurrent;

  const { xEnds, y } = useSelector(selectNodePositionById(id));

  if (!xEnds) return null;

  const initialAnimationDuration = isRoot ? 0 : INITIAL_ANIMATION_DURATION;
  const initialAnimationDelay = isRoot ? 0 : INITIAL_ANIMATION_DELAY;

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
        x={xEnds}
        y={y - MARGIN_TOP}
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
