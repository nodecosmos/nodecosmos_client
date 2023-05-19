import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
} from '../../trees/trees.constants';
import { MARGIN_TOP, NODE_BUTTON_HEIGHT } from '../workflows.constants';
import { selectWorkflowDiagramPosition } from '../workflows.selectors';
import WorkflowNodeButton from './WorkflowNodeButton';
/* nodecosmos */

export default function WorkflowNodeButtonContainer(props) {
  const { id, diagramId } = props;

  // we have different components because 'input' is not valid child element of 'button'

  const { x, xEnd, y } = useSelector(selectWorkflowDiagramPosition(diagramId));

  const content = <WorkflowNodeButton id={id} />;

  const initialAnimationDelay = INITIAL_ANIMATION_DELAY;
  const initialAnimationDuration = INITIAL_ANIMATION_DURATION;

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
        </div>
      </foreignObject>
    </g>
  );
}

WorkflowNodeButtonContainer.propTypes = {
  id: PropTypes.string.isRequired,
  diagramId: PropTypes.string.isRequired,
};
