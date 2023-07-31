import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Avatar } from '@mui/material';

export default function NcAvatar({ model, onClick, backgroundColor }) {
  const letter = model?.name?.charAt(0)?.toUpperCase();

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

NcAvatar.defaultProps = {
  onClick: null,
  backgroundColor: 'background.8',
};

NcAvatar.propTypes = {
  backgroundColor: PropTypes.string,
  model: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};
