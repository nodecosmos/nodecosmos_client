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
  MARGIN_LEFT, WORKFLOW_START_MARGIN_TOP, NODE_BUTTON_HEIGHT, OUTPUT_EDGE_LENGTH, WORKFLOW_STEP_WIDTH, SHADOW_OFFSET,
} from '../../workflows.constants';
import {
  selectWorkflowDiagram,
  selectWorkflowDiagramPosition,
  selectWorkflowScale,
} from '../../workflows.selectors';
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
  const clientHeight = useSelector(selectTransformablePositionAttribute('workflow', 'clientHeight'));

  const wfStepHeight = Math.max(clientHeight || 0, workflowDiagramYEnd || 0) * (1 / scale);
  if (!wfStepHeight) return null;

  return (
    <g onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <rect
        onMouseEnter={() => setHovered(true)}
        x={0}
        y={-1}
        height={wfStepHeight}
        width={WORKFLOW_STEP_WIDTH}
        fill={hovered ? theme.palette.background[6] : 'transparent'}
        stroke={hovered ? theme.palette.borders[1]
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
              backgroundColor: theme.palette.tree.default,
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
          stroke={theme.palette.tree.default}
          fill="transparent"
          strokeWidth={3.5}
          d={`M ${x + MARGIN_LEFT} ${y + NODE_BUTTON_HEIGHT} L ${x + MARGIN_LEFT} ${yEnd}`}
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
