import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import PropTypes from 'prop-types';
import {
  ButtonBase, useTheme,
} from '@mui/material';
/* nodecosmos */
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { WORKFLOW_BUTTON_HEIGHT } from '../../trees/trees.constants';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowNodeButton(props) {
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
            Node 1
          </div>
        </MemoizedButtonBase>
      </div>
    </foreignObject>
  );
}

// NodeButton.propTypes = {
//   treeNodeId: PropTypes.string.isRequired,
// };
