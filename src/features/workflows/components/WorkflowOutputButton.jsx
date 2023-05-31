import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { ButtonBase, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { faArrowProgress } from '@fortawesome/pro-light-svg-icons';
import { selectIOAttribute } from '../../input-outputs/inputOutput.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
  IO_BUTTON_HEIGHT,
} from '../../trees/trees.constants';
import { MARGIN_TOP, NODE_BUTTON_HEIGHT } from '../workflows.constants';
import { selectWorkflowDiagramPosition } from '../workflows.selectors';
import WorkflowNodeBranch from './WorkflowNodeBranch';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon className="fa-hashtag" icon={faArrowProgress} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowOutputButton({ id, diagramId }) {
  const theme = useTheme();
  const title = useSelector(selectIOAttribute(id, 'title'));

  const { x, xEnd, y } = useSelector(selectWorkflowDiagramPosition(diagramId));

  if (!xEnd) return null;

  return (
    <g>
      <WorkflowNodeBranch diagramId={diagramId} />
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
            className="NodeButton"
            onKeyUp={(event) => event.preventDefault()}
            style={{
              backgroundColor: 'transparent',
              height: NODE_BUTTON_HEIGHT,
              marginLeft: 8,
              transform: 'skewX(-30deg)',
              background: theme.palette.workflow.background,
              border: `2px solid ${theme.palette.workflow.default}`,
            }}
          >
            <MemoizedTagRounded />
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
