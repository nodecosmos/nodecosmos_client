import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateNode } from '../landingPageNodeSlice';

export default function LandingPageNodeButtonText(props) {
  const { id } = props;
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const nodeTitle = useSelector((state) => state.landingPageNodes[id].title);
  const isEditing = useSelector((state) => state.landingPageNodes[id].isEditing);

  const handleChange = (event) => {
    const title = event.currentTarget.value;

    dispatch(updateNode({
      id, title,
    }));
  };

  const handleBlur = () => {
    dispatch(updateNode({
      id, isEditing: false, isNew: false,
    }));
    ref.current.blur();
  };

  useEffect(() => {
    if (isEditing) {
      ref.current.focus();
    }
  }, [isEditing]);

  return (
    <Box
      component={isEditing ? 'input' : 'div'}
      ref={ref}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={(event) => event.key === 'Enter' && handleBlur()}
      value={nodeTitle || ''}
      fontSize={14}
      fontWeight={500}
      p={0}
      disabled={!isEditing}
      maxLength={30}
      size={Math.max((nodeTitle && nodeTitle.length * 0.8) || 0, 3)}
      minWidth={40}
      backgroundColor="transparent"
      // fontFamily="Roboto, sans-serif"
      outline="none!important"
      letterSpacing="0.02857em"
      sx={{
        cursor: isEditing ? 'text' : 'pointer!important',
        pointerEvents: isEditing ? 'auto' : 'none',
        ml: 1,
      }}
    >
      {(!isEditing && nodeTitle) || null}
    </Box>
  );
}

LandingPageNodeButtonText.propTypes = {
  id: PropTypes.string.isRequired,
};
