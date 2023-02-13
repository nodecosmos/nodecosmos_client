import React, { useEffect } from 'react';
import { TagRounded } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectNodeAttributeById } from '../../nodes/nodes.selectors';
import useNodeButtonBackground from '../hooks/useNodeButtonBackground';
import useNodeTreeEvents from '../hooks/useNodeTreeEvents';
import { selectTreeNodeAttributeById } from '../trees.selectors';
import { NODE_BUTTON_HEIGHT } from '../trees.constants';

export default function NodeInput(props) {
  const { treeNodeId } = props;
  const ref = React.useRef(null);

  const { backgroundColor, color } = useNodeButtonBackground(treeNodeId);

  const [focused, setFocused] = React.useState(false);

  const nodeId = useSelector(selectTreeNodeAttributeById(treeNodeId, 'nodeId'));
  const title = useSelector(selectNodeAttributeById(nodeId, 'title'));

  //--------------------------------------------------------------------------------------------------------------------
  const {
    handleNodeTitleChange,
    handleNodeBlur,
    saveNode,
  } = useNodeTreeEvents(treeNodeId);

  useEffect(() => {
    ref.current.focus();
    setFocused(true);
  }, [focused, handleNodeBlur]);

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
        ref={ref}
        onChange={handleNodeTitleChange}
        onKeyDown={(event) => event.key === 'Enter' && handleNodeBlur()}
        onKeyUp={saveNode}
        onBlur={() => focused && handleNodeBlur()}
        value={title || ''}
        className="NodeButtonText"
        maxLength={50}
        size={Math.max((title && title.length) || 0, 3)}
        style={{ color, fontFamily: 'monospace' }}
      />
    </div>
  );
}

NodeInput.propTypes = {
  treeNodeId: PropTypes.string.isRequired,
};
