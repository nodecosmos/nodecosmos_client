import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { ButtonBase, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { selectIOAttribute } from '../../input-outputs/inputOutput.selectors';
import {
  INITIAL_ANIMATION_DELAY,
  INITIAL_ANIMATION_DURATION,
  TRANSITION_ANIMATION_DURATION,
  IO_BUTTON_HEIGHT,
} from '../../trees/trees.constants';
import { MARGIN_TOP, NODE_BUTTON_HEIGHT } from '../workflows.constants';
import { selectWorkflowDiagramPosition } from '../workflows.selectors';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowOutputButton(props) {
  const theme = useTheme();

  const {
    id,
    diagramId,
  } = props;
  const title = useSelector(selectIOAttribute(id, 'title'));

  console.log(title);

  const { x, xEnd, y } = useSelector(selectWorkflowDiagramPosition(diagramId));

  return (
    <g style={{
      opacity: 0,
      animation: `node-button-appear ${INITIAL_ANIMATION_DURATION}ms ${INITIAL_ANIMATION_DELAY}ms forwards`,
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
          <MemoizedButtonBase
            type="button"
            className="NodeButton"
            onKeyUp={(event) => event.preventDefault()}
            style={{
              backgroundColor: theme.palette.tree.default,
              height: IO_BUTTON_HEIGHT,
              marginTop: 8,
              marginLeft: 6,
              transform: 'skewX(-20deg)',
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

WorkflowOutputButton.propTypes = {
  id: PropTypes.string.isRequired,
  diagramId: PropTypes.string.isRequired,
};
