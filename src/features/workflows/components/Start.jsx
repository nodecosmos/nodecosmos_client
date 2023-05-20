import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
import {
  ButtonBase, useTheme,
} from '@mui/material';
/* nodecosmos */
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import { WORKFLOW_BUTTON_HEIGHT } from '../../trees/trees.constants';
import { EDGE_LENGTH } from '../workflows.constants';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faPlay} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function Start() {
  const theme = useTheme();

  return (
    <foreignObject
      width="700"
      height={WORKFLOW_BUTTON_HEIGHT + 3}
      x={EDGE_LENGTH}
      y={EDGE_LENGTH}
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
  );
}
