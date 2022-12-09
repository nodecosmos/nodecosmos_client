import React, { useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from './landingPageNodeSlice';

export default function NodeButtonText(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const contentEditableRef = React.useRef(null);

  const nodeTitle = useSelector((state) => state.landingPageNodes[id].title);
  const isNew = useSelector((state) => state.landingPageNodes[id].isNew);
  const isEditing = useSelector((state) => state.landingPageNodes[id].isEditing);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('md'));

  const sx = { outline: 'none', minWidth: 30, fontWeight: 500 };
  if (isNew || isEditing) sx.cursor = 'text';

  const handleBlur = (event) => {
    const title = event.currentTarget.textContent;

    dispatch(updateNode({
      id, title, isNew: false, isEditing: false,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.currentTarget.textContent.length >= 35 && event.key !== 'Backspace') {
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      handleBlur(event);
    }
  };

  useEffect(() => {
    if (matchesSm) return;
    if (isNew || isEditing) contentEditableRef.current.focus();
  }, [isNew, isEditing, matchesSm]);

  return (
    <Box
      ref={contentEditableRef}
      contentEditable={isNew || isEditing}
      sx={sx}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      suppressContentEditableWarning
    >
      {nodeTitle}
    </Box>
  );
}

NodeButtonText.propTypes = {
  id: PropTypes.string.isRequired,
};
