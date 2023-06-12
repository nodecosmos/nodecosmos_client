import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { ButtonBase, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../../trees/trees.constants';
import { MARGIN_TOP, NODE_BUTTON_HEIGHT, SHADOW_OFFSET } from '../../workflows.constants';
import { selectWorkflowDiagramPosition } from '../../workflows.selectors';
import WorkflowNodeBranch from './WorkflowNodeBranch';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowNodeButton(props) {
  const { id, diagramId } = props;

  const { xEnd, y } = useSelector(selectWorkflowDiagramPosition(diagramId));
  const title = useSelector(selectNodeAttribute(id, 'title'));
  const nestedLevel = useSelector(selectNodeAttribute(id, 'nestedLevel'));

  const theme = useTheme();

  const initialAnimationDelay = INITIAL_ANIMATION_DELAY;
  const initialAnimationDuration = INITIAL_ANIMATION_DURATION;

  if (!xEnd) return null;

  const { backgrounds } = theme.palette.tree;
  const backgroundCount = backgrounds.length;
  const outlineColor = backgrounds[nestedLevel % backgroundCount];

  return (
    <g style={{
      opacity: 0,
      animation: `node-button-appear ${initialAnimationDuration}ms ${initialAnimationDelay}ms forwards`,
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
            style={{
              border: '1px solid',
              borderColor: outlineColor,
              backgroundColor: theme.palette.tree.outlineBackground,
              height: NODE_BUTTON_HEIGHT,
              color: outlineColor,
            }}
          >
            <MemoizedTagRounded />
            <div className="NodeButtonText">
              {title}
            </div>
          </MemoizedButtonBase>
        </div>
      </foreignObject>
    </g>
  );
}

WorkflowNodeButton.propTypes = {
  id: PropTypes.string.isRequired,
  diagramId: PropTypes.string.isRequired,
};
