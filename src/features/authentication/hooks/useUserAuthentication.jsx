import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import nodecosmos from '../../../apis/nodecosmos-server';
import { setAlert } from '../../app/appSlice';
import { login, logout } from '../authenticationSlice';

export default function useUserAuthentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formValues) => {
    try {
      const response = await nodecosmos.post('/users/sign_in', formValues);
      handleAuthentication(response);
    } catch ({ response }) {
      console.error(response);

      if (response.data) return response.data.error; // maps error object to final-form submitError
    }

    return null;
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');

    dispatch(logout());
  };

  const handleAuthentication = (response) => {
    const { user, token } = response.data;

    localStorage.setItem('currentUser', JSON.stringify(user));

    dispatch(login({ user, token }));

    redirect('/');
  };

  const handleUserCreation = async (formValues) => {
    try {
      await nodecosmos.post('/users', formValues);
      const message = 'Account created successfully. \nYou can now login with your username and password.';

      navigate('/auth/login');

      dispatch(setAlert({ isOpen: true, severity: 'success', message }));
    } catch (error) {
      const { response } = error;
      if (response.data) return response.data.error; // maps error object to final-form submitError
      // TODO: check if there is way to map error object to final-form and still use thunks
    }

    return null;
  };

  const syncUpCurrentUser = useCallback(async () => {
    try {
      await nodecosmos.get('/sync_current_user');
    } catch (error) {
      switch (error.response.data.error) {
        case 'session_expired':
        case 'decode_error':
          dispatch(logout());
          redirect('/auth/login');
          localStorage.removeItem('currentUser');
          break;
        default:
          dispatch(logout());
      }
    }
  }, [dispatch]);

  return {
    handleLogin,
    handleLogout,
    handleUserCreation,
    syncUpCurrentUser,
  };
}
