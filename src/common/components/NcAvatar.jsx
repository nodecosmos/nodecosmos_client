import React from 'react';
import * as PropTypes from 'prop-types';
/* mui */
import { Avatar } from '@mui/material';

export default function NcAvatar({
  model, onClick, backgroundColor, scale, width, height, fontSize,
}) {
  const letter = model?.name?.charAt(0)?.toUpperCase();

  return (
    <Avatar
      onClick={onClick}
      sx={{
        transform: `scale(${scale})`,
        width,
        height,
        fontSize,
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
  scale: 1,
  width: 40,
  height: 40,
  fontSize: 20,
};

NcAvatar.propTypes = {
  backgroundColor: PropTypes.string,
  model: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  scale: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  fontSize: PropTypes.number,
};
