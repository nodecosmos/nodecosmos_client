import React from 'react';
import { Snackbar, Alert as MuiAlert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../appSlice';

export default function Alert() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.alert.isOpen);
  const message = useSelector((state) => state.app.alert.message);
  const severity = useSelector((state) => state.app.alert.severity);

  const handleClose = () => dispatch(setAlert({ isOpen: false, message, severity }));
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        sx={{
          borderColor: 'error.main',
          backgroundColor: 'background.paper',
          '.MuiAlert-icon, .MuiAlert-message, .MuiAlert-action': {
            color: 'error.main',
          },
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
