import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Avatar } from '@mui/material';

export default function UserAvatar({ user, onClick, backgroundColor }) {
  const letter = user && user.username.charAt(0).toUpperCase();

  return (
    <Avatar
      onClick={onClick}
      sx={{
        height: 30,
        width: 30,
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

UserAvatar.defaultProps = {
  onClick: null,
  backgroundColor: 'background.4',
};

UserAvatar.propTypes = {
  backgroundColor: PropTypes.string,
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
