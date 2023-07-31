import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { faClose } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CloseModalButton({ onClose }) {
  return (
    <IconButton
      disableRipple
      color="button"
      onClick={onClose}
      sx={{
        backgroundColor: 'button.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        borderRadius: '50%',
        top: 16,
        right: 24,
        width: 30,
        height: 30,
        p: 0,
        svg: {
          color: 'button.contrastText',
          fontSize: 18,
        },
      }}
    >
      <FontAwesomeIcon icon={faClose} />
    </IconButton>
  );
}

CloseModalButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};
