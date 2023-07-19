import React from 'react';
import {
  Snackbar, Alert as MuiAlert, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../features/app/appSlice';

export default function Alert() {
  const dispatch = useDispatch();
  const {
    isOpen, message, severity, anchorOrigin,
  } = useSelector((state) => state.app.alert);

  const handleClose = () => dispatch(setAlert({ isOpen: false, message, severity }));

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={1500000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        sx={{
          borderColor: `${severity}.main`,
          backgroundColor: 'background.paper',
          '.MuiAlert-icon, .MuiAlert-message, .MuiAlert-action': {
            color: `${severity}.main`,
          },
          alignItems: 'center',
        }}
      >
        <Typography
          color="error"
          variant="body1"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </MuiAlert>
    </Snackbar>
  );
}
