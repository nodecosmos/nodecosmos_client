import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../appSlice';

export default function Alert() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.alert.isOpen);
  const message = useSelector((state) => state.app.alert.message);
  const severity = useSelector((state) => state.app.alert.severity);

  const handleClose = () => dispatch(setAlert({ isOpen: false }));
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          '.MuiAlert-icon, .MuiAlert-message, .MuiAlert-action': {
            color: 'text.primary',
          },
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
