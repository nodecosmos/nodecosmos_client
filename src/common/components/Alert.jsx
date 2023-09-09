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

  if (!isOpen) return null;

  return (
    <Box
      display={isOpen ? 'flex' : 'none'}
      onClose={handleClose}
      anchororigin={anchorOrigin}
      minHeight={HEADER_HEIGHT}
      position="relative"
      zIndex={3}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        sx={{
          px: 1,
          py: 0.35,
          height: 1,
          borderRadius: 0.5,
          width: 'calc(100% - 1px)',
          borderColor: `${severity}.main`,
          backgroundColor: 'background.5',
          '.MuiTypography-root, .MuiAlert-icon, .MuiAlert-message, .MuiAlert-action': {
            color: `${severity}.main`,
          },
          '.MuiAlert-action': {
            p: 0,
            mr: 0,
          },
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body2"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </MuiAlert>
    </Box>
  );
}
