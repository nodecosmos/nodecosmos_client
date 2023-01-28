import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useNodeTreeEvents from '../../hooks/tree/useNodeTreeEvents';

export default function NodeButtonText(props) {
  const { id } = props;
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
      component={isEditing ? 'input' : 'div'}
      ref={ref}
      onChange={handleNodeTitleChange}
      onKeyDown={(event) => event.key === 'Enter' && handleNodeBlur()}
      onKeyUp={saveNode}
      onBlur={() => focused && handleNodeBlur()}
      value={nodeTitle || ''}
      fontSize={14}
      fontWeight={500}
      disabled={!isEditing}
      maxLength={30}
      size={Math.max((nodeTitle && nodeTitle.length * 0.8) || 0, 3)}
      p={0}
      minWidth={40}
      backgroundColor="transparent"
      fontFamily="Roboto, sans-serif"
      outline="none!important"
      letterSpacing="0.02857em"
      style={{
        cursor: isEditing ? 'text' : 'pointer!important',
        pointerEvents: isEditing ? 'auto' : 'none',
      }}
      sx={{
        ml: 1,
      }}
    >
      {(!isEditing && nodeTitle) || null}
    </Box>
  );
}

NodeButtonText.propTypes = {
  id: PropTypes.string.isRequired,
};
