import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
import {
  ButtonBase, useTheme,
} from '@mui/material';
/* nodecosmos */
import { faPlay } from '@fortawesome/pro-regular-svg-icons';
import { WORKFLOW_BUTTON_HEIGHT } from '../../trees/trees.constants';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faPlay} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function Start(props) {
  const theme = useTheme();

  return (
    <foreignObject
      width="700"
      height={WORKFLOW_BUTTON_HEIGHT + 3}
      x={50}
      y={50}
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

// NodeButton.propTypes = {
//   treeNodeId: PropTypes.string.isRequired,
// };
