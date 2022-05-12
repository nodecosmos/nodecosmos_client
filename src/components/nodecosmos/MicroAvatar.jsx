import red from '@mui/material/colors/red';
import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Avatar } from '@mui/material';

export default function MicroAvatar({ user, onClick }) {
  const letter = user && user.username.charAt(0).toUpperCase();

  return (
    <Avatar
      onClick={onClick}
      sx={{
        height: 32,
        width: 32,
        fontSize: 16,
        borderRadius: 2,
        bgcolor: red[500],
        color: 'white',
        cursor: 'pointer',
      }}
    >
      {letter}
    </Avatar>
  );
}

MicroAvatar.defaultProps = {
  onClick: null,
};

MicroAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
