import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { ButtonBase } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { NODE_BUTTON_HEIGHT } from '../workflows.constants';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function WorkflowNodeButton(props) {
  const {
    id,
  } = props;
  const title = useSelector(selectNodeAttribute(id, 'title'));

  return (
    <MemoizedButtonBase
      type="button"
      className="NodeButton"
      onKeyUp={(event) => event.preventDefault()}
      style={{
        height: NODE_BUTTON_HEIGHT,
      }}
    >
      <MemoizedTagRounded />
      <div className="NodeButtonText">
        {title}
      </div>
    </MemoizedButtonBase>
  );
}

WorkflowNodeButton.propTypes = {
  id: PropTypes.string.isRequired,
};
