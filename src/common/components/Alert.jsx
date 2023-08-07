import React, { useCallback, useEffect } from 'react';
import {
  Alert as MuiAlert, Typography, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../features/app/constants';

export default function Alert() {
  const dispatch = useDispatch();
  const {
    isOpen, message, severity, anchorOrigin,
  } = useSelector((state) => state.app.alert);

  const handleClose = useCallback(() => dispatch(
    setAlert({ isOpen: false, message, severity }),
  ), [dispatch, message, severity]);

  useEffect(() => () => {
    if (isOpen) {
      handleClose();
    }
  }, [isOpen, handleClose]);

  return (
    <Box
      display={isOpen ? 'flex' : 'none'}
      onClose={handleClose}
      anchororigin={anchorOrigin}
      height={HEADER_HEIGHT}
      width={1}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        sx={{
          height: 1,
          borderRadius: 0.5,
          width: 'calc(100% - 1px)',
          borderColor: `${severity}.main`,
          backgroundColor: 'background.5',
          '.MuiTypography-root, .MuiAlert-icon, .MuiAlert-message, .MuiAlert-action': {
            color: `${severity}.main`,
          },
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </MuiAlert>
    </Box>
  );
}
