import React, { useEffect, useState } from 'react';
import { TagRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
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

  const { backgroundColor, color } = useNodeButtonBackground(treeNodeId);

  const [focused, setFocused] = useState(false);

  //--------------------------------------------------------------------------------------------------------------------
  const {
    handleNodeTitleChange,
    handleNodeBlur,
    saveNode,
    onNodeClick,
  } = useNodeTreeEvents(treeNodeId);

  useEffect(() => {
    ref.current.focus();
    setFocused(true);
  }, [focused]);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <div
      className="NodeButton"
      style={{
        backgroundColor,
        height: NODE_BUTTON_HEIGHT,
        color,
      }}
    >
      <TagRounded fontSize="small" ml="-2px" />
      <input
        className="NodeButtonText"
        ref={ref}
        onClick={onNodeClick}
        onChange={handleNodeTitleChange}
        onKeyDown={(event) => event.key === 'Enter' && handleNodeBlur()}
        onKeyUp={saveNode}
        onBlur={() => focused && handleNodeBlur()}
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
