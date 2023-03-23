import React, { useEffect, useState } from 'react';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeTitleChangeHandler from '../../nodes/hooks/useNodeTitleChangeHandler';
import { selectNodeAttribute } from '../../nodes/nodes.selectors';
import useNodeButtonBackground from '../hooks/useNodeButtonBackground';
import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectTreeNodeAttribute } from '../trees.selectors';
import { MAX_NODE_INPUT_SIZE, MIN_NODE_INPUT_SIZE, NODE_BUTTON_HEIGHT } from '../trees.constants';

export default function NodeInput(props) {
  const { treeNodeId } = props;
  const ref = React.useRef(null);

  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const title = useSelector(selectNodeAttribute(nodeId, 'title'));
  const titleLength = title ? title.length : 0;

  const { backgroundColor, color, hasBg } = useNodeButtonBackground(treeNodeId);

  const [focused, setFocused] = useState(false);

  //--------------------------------------------------------------------------------------------------------------------
  const {
    handleTreeNodeBlur,
    onNodeClick,
  } = useNodeTreeEvents(treeNodeId);

  const { handleNodeTitleChange } = useNodeTitleChangeHandler(nodeId);

  useEffect(() => {
    ref.current.focus();
    setFocused(true);
  }, [focused]);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div
      className={`NodeButton ${hasBg && 'selected'}`}
      style={{
        backgroundColor,
        height: NODE_BUTTON_HEIGHT,
        color,
      }}
    >
      <FontAwesomeIcon icon={faHashtag} />
      <input
        className="NodeButtonText"
        ref={ref}
        onClick={onNodeClick}
        onChange={handleNodeTitleChange}
        onKeyDown={(event) => event.key === 'Enter' && handleTreeNodeBlur()}
        onBlur={() => focused && handleTreeNodeBlur()}
        value={title || ''}
        maxLength={MAX_NODE_INPUT_SIZE}
        size={Math.max(titleLength, MIN_NODE_INPUT_SIZE)}
        style={{ color, fontFamily: 'monospace' }}
      />
    </div>
  );
}

NodeInput.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
