import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { selectPosition, selectTreeNodeAttribute } from '../../trees.selectors';
/* nodecosmos */
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_TOP,
  NODE_BUTTON_HEIGHT,
  TRANSITION_ANIMATION_DURATION,
} from '../../trees.constants';
import { useTreeRootNodeId } from '../../hooks/useTreeContext';
import useNodeTreeEvents from '../../hooks/useNodeTreeEvents';
import useNodeTitleChangeHandler from '../../../nodes/hooks/useNodeTitleChangeHandler';
import NodeButton from './NodeButton';
import NodeInput from './NodeInput';
import NodeToolbar from './NodeToolbar';

// we have different components for text
// because 'input' is not valid child element of 'button'
export default function NodeContent(props) {
  const { treeNodeId, alreadyMounted } = props;
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const isExpanded = useSelector(selectTreeNodeAttribute(treeNodeId, 'isExpanded'));
  const isRoot = useSelector(selectNodeAttribute(nodeId, 'isRoot'));
  const isEditing = useSelector(selectTreeNodeAttribute(treeNodeId, 'isEditing'));
  const rootNodeId = useTreeRootNodeId();
  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));
  const { xEnd, y } = useSelector(selectPosition(rootNodeId, treeNodeId));
  const { handleTreeNodeBlur } = useNodeTreeEvents(treeNodeId);
  const { handleNodeTitleChange, handleTitleChangeFinish } = useNodeTitleChangeHandler({ nodeId, treeNodeId });

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

NodeContent.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  alreadyMounted: PropTypes.bool.isRequired,
};
