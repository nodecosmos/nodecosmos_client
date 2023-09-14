import React, { memo, useContext } from 'react';
import PropTypes from 'prop-types';
import { ButtonBase } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
/* nodecosmos */
import { selectIOAttribute } from '../../../../input-outputs/inputOutputs.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../../../trees/trees.constants';
import useWorkflowOutputButtonBg from '../../../hooks/diagram/useWorkflowOutputButtonBg';
import {
  MARGIN_TOP,
  NODE_BUTTON_HEIGHT,
  WORKFLOW_DIAGRAM_CONTEXT,
  WORKFLOW_DIAGRAM_OBJECTS,
} from '../../../workflows.constants';
import { WorkflowsContext } from '../../../workflows.context';
import { selectWorkflowDiagramPosition } from '../../../workflows.selectors';
import { setSelectedWorkflowDiagramObject } from '../../../workflowsSlice';
import WorkflowOutputBranch from './WorkflowOutputBranch';

const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowOutputButton({ id, nodeId }) {
  const title = useSelector(selectIOAttribute(id, 'title'));
  const workflowId = useSelector(selectIOAttribute(id, 'workflowId'));

  const { xEnd, y } = useSelector(selectWorkflowDiagramPosition(id));

  const dispatch = useDispatch();
  const workflowContext = useContext(WorkflowsContext);

  const handleClick = () => {
    if (workflowContext === WORKFLOW_DIAGRAM_CONTEXT.workflowPage) {
      dispatch(setSelectedWorkflowDiagramObject({
        id,
        diagramId: id,
        workflowId,
        type: WORKFLOW_DIAGRAM_OBJECTS.output,
      }));
    }
  };

  const {
    backgroundColor,
    outlineColor,
    color,
  } = useWorkflowOutputButtonBg({ id, nodeId });

  if (!xEnd) return null;

  return (
    <g>
      <WorkflowOutputBranch id={id} />
      <g style={{
        opacity: 0,
        animation: `node-button-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
      }}
      >
        <foreignObject
          width="700"
          height={NODE_BUTTON_HEIGHT + 3}
          x={xEnd - 10}
          y={y - MARGIN_TOP}
          style={{ transition: `y ${TRANSITION_ANIMATION_DURATION}ms` }}
        >
          <MemoizedButtonBase
            type="button"
            className="WorkflowOutputButton"
            onClick={handleClick}
            onKeyUp={(event) => event.preventDefault()}
            style={{
              background: backgroundColor,
              border: `2px solid ${outlineColor}`,
              color,
            }}
          >
            <div className="IOButtonText">
              {title}
            </div>
          </MemoizedButtonBase>
        </foreignObject>
      </g>
    </g>
  );
}

WorkflowOutputButton.defaultProps = {
  nodeId: null,
};

WorkflowOutputButton.propTypes = {
  id: PropTypes.string.isRequired,
  nodeId: PropTypes.string,
};
