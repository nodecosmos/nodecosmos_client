import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectPosition, selectTreeNode } from '../trees.selectors';
/* nodecosmos */
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  MARGIN_TOP,
  NODE_BUTTON_HEIGHT,
  TRANSITION_ANIMATION_DURATION,
} from '../trees.constants';
import NodeButton from './NodeButton';
import NodeInput from './NodeInput';
import NodeToolbar from './NodeToolbar';

export default function NodeButtonContainer(props) {
  const { treeNodeId, alreadyMounted } = props;

  const {
    nodeId,
    isExpanded,
    isRoot,
    isEditing,
  } = useSelector(selectTreeNode(treeNodeId));

  const { xEnd, y } = useSelector(selectPosition(treeNodeId));
  const isSelected = useSelector(selectNodeAttribute(nodeId, 'isSelected'));

  if (!xEnd) return null;

  // we would wrap it in single component, but input is not valid child of button
  const content = isEditing ? <NodeInput treeNodeId={treeNodeId} /> : <NodeButton treeNodeId={treeNodeId} />;

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
        height={NODE_BUTTON_HEIGHT + 3}
        x={xEnd}
        y={y - MARGIN_TOP}
        style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
      >
        <div className="NodeButtonContainer">
          {content}
          <div>
            {isExpanded && isSelected && <Box sx={{ ml: 2 }}><NodeToolbar treeNodeId={treeNodeId} /></Box>}
          </div>
        </div>
      </foreignObject>
    </g>
  );
}

NodeButtonContainer.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
  alreadyMounted: PropTypes.bool.isRequired,
};
