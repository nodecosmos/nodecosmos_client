import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
import {
  ButtonBase, useTheme,
} from '@mui/material';
/* nodecosmos */
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import { useSelector } from 'react-redux';
import { selectTransformablePositionAttribute } from '../../../app/app.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
  WORKFLOW_BUTTON_HEIGHT,
} from '../../../trees/trees.constants';
import {
  MARGIN_LEFT, WORKFLOW_START_MARGIN_TOP, NODE_BUTTON_HEIGHT, OUTPUT_EDGE_LENGTH, WORKFLOW_STEP_WIDTH,
} from '../../workflows.constants';
import {
  selectWorkflowDiagram,
  selectWorkflowDiagramPosition,
  selectWorkflowScale,
} from '../../workflows.selectors';
import useWorkflowTransformableId from '../../hooks/diagram/useWorkflowTransformableId';
import StartToolbar from './StartToolbar';
import WorkflowOutputButton from './io/WorkflowOutputButton';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faPlay} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function StartStep({ workflowId }) {
  const theme = useTheme();
  const workflowDiagram = useSelector(selectWorkflowDiagram(workflowId));
  const inputsLength = workflowDiagram.initialInputIds.length || 0;
  const x = OUTPUT_EDGE_LENGTH;
  const y = OUTPUT_EDGE_LENGTH;
  const yEnd = y + (OUTPUT_EDGE_LENGTH) * inputsLength + WORKFLOW_START_MARGIN_TOP;
  const { yEnd: workflowDiagramYEnd } = useSelector(selectWorkflowDiagramPosition(workflowId));
  const scale = useSelector(selectWorkflowScale);

  const [hovered, setHovered] = React.useState(false);
  const transformableId = useWorkflowTransformableId();

  const clientHeight = useSelector(selectTransformablePositionAttribute(transformableId, 'clientHeight'));

  const wfStepHeight = Math.max(clientHeight || 0, workflowDiagramYEnd || 0) * (1 / scale) - 8;
  const rectHeight = wfStepHeight && wfStepHeight > 0 ? wfStepHeight : 0;

  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <rect
        onMouseEnter={() => setHovered(true)}
        x={0}
        y={0}
        height={rectHeight}
        width={WORKFLOW_STEP_WIDTH - 1}
        fill={theme.palette.background[5]}
        fillOpacity={0.3}
        stroke={hovered ? theme.palette.borders[4]
          : 'transparent'}
        strokeWidth={2}
      />
      <foreignObject
        width="700"
        height={WORKFLOW_BUTTON_HEIGHT + 3}
        x={x}
        y={y}
      >
        <div className="NodeButtonContainer">
          <MemoizedButtonBase
            type="button"
            className="NodeButton"
            style={{
              backgroundColor: theme.palette.workflow.default,
              height: WORKFLOW_BUTTON_HEIGHT,
            }}
          >
            <MemoizedTagRounded />
            <div className="NodeButtonText">
              Start
            </div>
          </MemoizedButtonBase>

          {hovered && (<StartToolbar workflowId={workflowId} />)}
        </div>
      </foreignObject>
      {
        workflowDiagram.initialInputIds.length > 0
        && (
        <path
          stroke={theme.palette.workflow.default}
          fill="transparent"
          strokeWidth={3.5}
          d={`M ${x + MARGIN_LEFT} ${y + NODE_BUTTON_HEIGHT + 3} L ${x + MARGIN_LEFT} ${yEnd}`}
          style={{
            opacity: 0,
            animation: `appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
            transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
          }}
        />
        )
      }
      {
        workflowDiagram.initialInputIds.map((id) => (
          <WorkflowOutputButton id={id} key={id} />
        ))
      }
    </g>
  );
}

StartStep.propTypes = {
  workflowId: PropTypes.string.isRequired,
};
