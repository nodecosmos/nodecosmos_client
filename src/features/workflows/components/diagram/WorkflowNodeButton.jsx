import React, { memo, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import { setSelectedNode } from '../../../nodes/nodesSlice';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../../trees/trees.constants';
import useWorkflowNodeButtonBg from '../../hooks/diagram/useWorkflowNodeButtonBg';
import {
  MARGIN_TOP, NODE_BUTTON_HEIGHT, SHADOW_OFFSET, WORKFLOW_DIAGRAM_CONTEXT, WORKFLOW_DIAGRAM_OBJECTS,
} from '../../workflows.constants';
import { WorkflowsContext } from '../../workflows.context';
import { selectWorkflowDiagramPosition } from '../../workflows.selectors';
import { setSelectedWorkflowDiagramObject } from '../../workflowsSlice';
import WorkflowNodeBranch from './WorkflowNodeBranch';
import WorkflowNodeButtonToolbar from './WorkflowNodeButtonToolbar';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowNodeButton({
  id, diagramId, workflowId, flowStepId, workflowStepIndex,
}) {
  const workflowContext = useContext(WorkflowsContext);
  const { xEnd, y } = useSelector(selectWorkflowDiagramPosition(diagramId));

  const dispatch = useDispatch();
  const title = useSelector(selectNodeAttribute(id, 'title'));

  const initialAnimationDelay = INITIAL_ANIMATION_DELAY;
  const initialAnimationDuration = INITIAL_ANIMATION_DURATION;

  const handleClick = () => {
    dispatch(setSelectedWorkflowDiagramObject({
      id,
      diagramId,
      workflowId,
      type: WORKFLOW_DIAGRAM_OBJECTS.node,
    }));

    if (workflowContext === WORKFLOW_DIAGRAM_CONTEXT.workflowPage) {
      dispatch(setSelectedNode(id));
    }
  };

  const {
    backgroundColor,
    outlineColor,
    color,
  } = useWorkflowNodeButtonBg({ id, diagramId });

  if (!xEnd) return null;

  return (
    <g style={{
      opacity: 0,
      animation: `workflow-node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
    }}
    >
      <WorkflowNodeBranch diagramId={diagramId} />
      <foreignObject
        width="700"
        height={NODE_BUTTON_HEIGHT + SHADOW_OFFSET}
        x={xEnd}
        y={y - MARGIN_TOP}
        style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
      >
        <div className="NodeButtonContainer">
          <MemoizedButtonBase
            type="button"
            className="NodeButton"
            onKeyUp={(event) => event.preventDefault()}
            onClick={handleClick}
            style={{
              border: '1px solid',
              borderColor: outlineColor,
              backgroundColor,
              height: NODE_BUTTON_HEIGHT,
              color,
            }}
          >
            <MemoizedTagRounded />
            <div className="NodeButtonText">
              {title}
            </div>
          </MemoizedButtonBase>
          <WorkflowNodeButtonToolbar
            diagramId={diagramId}
            nodeId={id}
            flowStepId={flowStepId}
            workflowId={workflowId}
            workflowStepIndex={workflowStepIndex}
          />
        </div>
      </foreignObject>
    </g>
  );
}

WorkflowNodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  diagramId: PropTypes.string.isRequired,
  workflowId: PropTypes.string.isRequired,
  flowStepId: PropTypes.string.isRequired,
  workflowStepIndex: PropTypes.number.isRequired,
};
