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
        height: 35,
        width: 35,
        fontSize: 13,
        borderRadius: 1.5,
        bgcolor: bgColor,
        color: '#131416',
        cursor: 'pointer',
      }}
    >
      {letter}
    </Avatar>
  );
}

NodeAvatar.defaultProps = {
  onClick: null,
  bgColor: '#f44336',
};

NodeAvatar.propTypes = {
  bgColor: PropTypes.string,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
