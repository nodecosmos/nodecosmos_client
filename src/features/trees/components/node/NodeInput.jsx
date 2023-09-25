import React, { useEffect } from 'react';
import { faHashtag } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectNodeAttribute } from '../../../nodes/nodes.selectors';
import useNodeButtonColors from '../../hooks/useNodeButtonColors';
import useNodeTreeEvents from '../../hooks/useNodeTreeEvents';
import { selectTreeNodeAttribute } from '../../trees.selectors';
import { MAX_NODE_INPUT_SIZE, MIN_NODE_INPUT_SIZE, NODE_BUTTON_HEIGHT } from '../../trees.constants';

export default function NodeInput({ treeNodeId, onChange, onBlur }) {
  const ref = React.useRef(null);
  const nodeId = useSelector(selectTreeNodeAttribute(treeNodeId, 'nodeId'));
  const title = useSelector(selectNodeAttribute(nodeId, 'title'));
  const titleLength = title ? title.length : 0;
  const { backgroundColor, color, hasBg } = useNodeButtonColors(treeNodeId);
  const { onNodeClick } = useNodeTreeEvents(treeNodeId);

  useEffect(() => ref.current.focus(), []);

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
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onBlur();
          }
        }}
        onBlur={onBlur}
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
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
