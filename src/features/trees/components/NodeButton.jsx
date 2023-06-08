import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { ButtonBase } from '@mui/material';
import { useSelector } from 'react-redux';
/* nodecosmos */
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import useNodeButtonBackground from '../hooks/useNodeButtonBackground';
import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import { selectTreeNodeAttribute } from '../trees.selectors';

const MemoizedTagRounded = memo(() => <FontAwesomeIcon icon={faHashtag} />);
const MemoizedButtonBase = memo(ButtonBase);

export default function NodeButton(props) {
  const {
    treeNodeId,
  } = props;
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const title = useSelector(selectNodeAttribute(nodeId, 'title'));

  const { handleTreeNodeClick } = useNodeTreeEvents(treeNodeId);
  const {
    backgroundColor, outlineColor, color, hasBg, outlinedColored,
  } = useNodeButtonBackground(treeNodeId);

  return (
    <MemoizedButtonBase
      type="button"
      className={`NodeButton ${hasBg && 'selected'} ${outlinedColored && 'outlined'}`}
      onClick={handleTreeNodeClick}
      onKeyUp={(event) => event.preventDefault()}
      style={{
        border: '1px solid',
        borderColor: outlineColor,
        backgroundColor,
        color,
      }}
    >
      <MemoizedTagRounded />
      <div className="NodeButtonText" style={{ color }}>
        {title}
      </div>
    </MemoizedButtonBase>
  );
}

NodeButton.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
