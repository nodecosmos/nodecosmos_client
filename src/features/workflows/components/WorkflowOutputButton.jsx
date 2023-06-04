import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { ButtonBase, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { faFlute } from '@fortawesome/pro-light-svg-icons';
import { selectIOAttribute } from '../../input-outputs/inputOutput.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../trees/trees.constants';
import { MARGIN_TOP, NODE_BUTTON_HEIGHT } from '../workflows.constants';
import { selectWorkflowDiagramPosition } from '../workflows.selectors';
import WorkflowNodeBranch from './WorkflowNodeBranch';
import WorkflowOutputBranch from './WorkflowOutputBranch';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon className="fa-hashtag" icon={faFlute} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowOutputButton({ id, diagramId }) {
  const theme = useTheme();
  const title = useSelector(selectIOAttribute(id, 'title'));

  const { xEnd, y } = useSelector(selectWorkflowDiagramPosition(diagramId));

  if (!xEnd) return null;

  return (
    <g>
      <WorkflowNodeBranch diagramId={diagramId} />
      <WorkflowOutputBranch diagramId={diagramId} />
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
            onKeyUp={(event) => event.preventDefault()}
            style={{
              background: theme.palette.workflow.background,
              border: `2px solid ${theme.palette.workflow.default}`,
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

WorkflowOutputButton.propTypes = {
  id: PropTypes.string.isRequired,
  diagramId: PropTypes.string.isRequired,
};
