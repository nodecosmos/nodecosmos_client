import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Avatar } from '@mui/material';
import { orange } from '@mui/material/colors';

export default function MicroAvatar({ user }) {
  const letter = user && user.username.charAt(0).toUpperCase();

  return (
    <Avatar
      sx={{
        bgcolor: orange[600],
        color: 'white',
        height: 35,
        width: 35,
        fontSize: '1.15rem',
        borderRadius: 2,
      }}
    >
      {letter}
    </Avatar>
  );
}

MicroAvatar.propTypes = {
  user: PropTypes.object.isRequired,
};
