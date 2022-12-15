import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Avatar } from '@mui/material';

export default function NodeAvatar({ user, onClick, bgColor }) {
  const letter = user && user.username.charAt(0).toUpperCase();

  return (
    <Avatar
      onClick={onClick}
      sx={{
        height: 32,
        width: 32,
        fontSize: 13,
        bgcolor: bgColor,
        color: '#fff',
        cursor: 'pointer',
      }}
    >
      {letter}
    </Avatar>
  );
}

NodeAvatar.defaultProps = {
  onClick: null,
  bgColor: '#545a64',
};

NodeAvatar.propTypes = {
  bgColor: PropTypes.string,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
