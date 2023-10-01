import React, { memo } from 'react';
import { Box } from '@mui/material';
/* nodecosmos */
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_TOP,
  NODE_BUTTON_HEIGHT,
  TRANSITION_ANIMATION_DURATION,
} from '../../trees.constants';
import useNodeTreeEvents from '../../hooks/useNodeTreeEvents';
import useNodeTitleChangeHandler from '../../../nodes/hooks/useNodeTitleChangeHandler';
import useNodeContext, { useNodePosition } from '../../hooks/useNodeContext';
import NodeButton from './NodeButton';
import NodeInput from './NodeInput';
import NodeToolbar from './NodeToolbar';

// we have different components for text
// because 'input' is not valid child element of 'button'
function NodeContent() {
  const {
    alreadyMounted,
    treeNodeId,
    isExpanded,
    isEditing,
    isRoot,
    isSelected,
  } = useNodeContext();

  const {
    xEnd,
    y,
  } = useNodePosition();

  const { handleTreeNodeBlur } = useNodeTreeEvents();
  const { handleNodeTitleChange, handleTitleChangeFinish } = useNodeTitleChangeHandler();

  if (!xEnd) return null;

  const initialAnimationDelay = isRoot || alreadyMounted ? 0 : INITIAL_ANIMATION_DELAY;
  const initialAnimationDuration = isRoot || alreadyMounted ? 0 : INITIAL_ANIMATION_DURATION;

  return (
    <g style={{
      opacity: 0,
      animation: `node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
    }}
    >
      <foreignObject
        width="700"
        height={NODE_BUTTON_HEIGHT + 8}
        x={xEnd}
        y={y - MARGIN_TOP}
        style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
      >
        <div className="NodeButtonContainer">
          {isEditing ? (
            <NodeInput
              treeNodeId={treeNodeId}
              onChange={(event) => handleNodeTitleChange(event.target.value)}
              onBlur={() => {
                handleTreeNodeBlur();
                handleTitleChangeFinish();
              }}
            />
          ) : <NodeButton treeNodeId={treeNodeId} />}
          <div>
            {isExpanded && isSelected && <Box sx={{ ml: 2 }}><NodeToolbar treeNodeId={treeNodeId} /></Box>}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

export default memo(NodeContent);
