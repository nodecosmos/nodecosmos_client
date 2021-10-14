import React from 'react';
import * as PropTypes from 'prop-types';

/* material ui */
import Avatar from '@mui/material/Avatar';
import { orange } from '@mui/material/colors';

export default function MicroAvatar({ letter }) {
  return (
    <Avatar
      sx={{
        bgcolor: orange[600],
        color: 'white',
        marginRight: 2,
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
  letter: PropTypes.string.isRequired,
};
