import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeTreeEvents from '../../hooks/tree/useNodeTreeEvents';

export default function NodeButtonText(props) {
  const { id, color } = props;
  const ref = React.useRef(null);

  const [focused, setFocused] = React.useState(false);

  const nodeTitle = useSelector((state) => state.nodes.byId[id].title);
  const isEditing = useSelector((state) => state.nodes.byId[id].isEditing);

  //--------------------------------------------------------------------------------------------------------------------
  const {
    handleNodeTitleChange,
    handleNodeBlur,
    saveNode,
  } = useNodeTreeEvents(id);

  useEffect(() => {
    if (isEditing) {
      ref.current.focus();
      setFocused(true);
    }
  }, [isEditing]);

  //--------------------------------------------------------------------------------------------------------------------
  return (
    <Box
      ref={ref}
      component={isEditing ? 'input' : 'div'}
      onChange={handleNodeTitleChange}
      onKeyDown={(event) => event.key === 'Enter' && handleNodeBlur()}
      onKeyUp={saveNode}
      onBlur={() => focused && handleNodeBlur()}
      value={nodeTitle || ''}
      className="NodeButtonText"
      disabled={!isEditing}
      maxLength={30}
      size={Math.max((nodeTitle && nodeTitle.length * 0.8) || 0, 3)}
      style={{
        cursor: isEditing ? 'text' : 'pointer!important',
        pointerEvents: isEditing ? 'auto' : 'none',
        color,
      }}
    >
      {(!isEditing && nodeTitle) || null}
    </Box>
  );
}

NodeButtonText.propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
