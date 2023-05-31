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
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION, TRANSITION_ANIMATION_DURATION,
  WORKFLOW_BUTTON_HEIGHT,
} from '../../trees/trees.constants';
import {
  EDGE_LENGTH, MARGIN_LEFT, MARGIN_TOP, OUTPUT_EDGE_LENGTH,
} from '../workflows.constants';
import { selectWorkflowDiagram } from '../workflows.selectors';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faPlay} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function Start({ workflowId }) {
  const theme = useTheme();
  const workflowDiagram = useSelector(selectWorkflowDiagram(workflowId));
  const inputsLength = workflowDiagram.initialInputs.length || 0;
  const x = EDGE_LENGTH;
  const y = EDGE_LENGTH;
  const yEnd = y + (OUTPUT_EDGE_LENGTH + MARGIN_TOP) * inputsLength;

  return (
    <g>
      <path
        stroke={theme.palette.tree.default}
        fill="transparent"
        strokeWidth={3.5}
        d={`M ${x + MARGIN_LEFT} ${y} L ${x + MARGIN_LEFT} ${yEnd}`}
        style={{
          opacity: 0,
          animation: `node-path-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
          transition: `d ${TRANSITION_ANIMATION_DURATION / 2}ms`,
        }}
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
        </div>
      </foreignObject>
    </g>
  );
}

Start.propTypes = {
  workflowId: PropTypes.string.isRequired,
};
