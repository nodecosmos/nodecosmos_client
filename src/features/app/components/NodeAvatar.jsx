import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Avatar } from '@mui/material';

export default function NodeAvatar({ user, onClick, backgroundColor }) {
  const letter = user && user.username.charAt(0).toUpperCase();

  return (
    <Avatar
      onClick={onClick}
      sx={{
        height: 32,
        width: 32,
        fontSize: 15,
        backgroundColor,
        color: 'text.primary',
        cursor: 'pointer',
      }}
    >
      {letter}
    </Avatar>
  );
}

NodeAvatar.defaultProps = {
  onClick: null,
  backgroundColor: 'background.4',
};

NodeAvatar.propTypes = {
  backgroundColor: PropTypes.string,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
