import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import nodecosmos from '../../../apis/nodecosmos-server';
import history from '../../../history';
import { login, logout } from '../authenticationSlice';

export default function useUserAuthentication(props) {
  const dispatch = useDispatch();

  const handleAuthentication = (response) => {
    const { user, token } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    dispatch(login({ user, token }));

    history.push('/');
  };

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
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');

    dispatch(logout());
  };

  const handleUserCreation = async (formValues) => {
    try {
      const response = await nodecosmos.post('/users', { user: formValues });
      handleAuthentication(response);
    } catch (response) {
      console.error(response);

      if (response.data) return response.data.error; // maps error object to final-form submitError
    }

    return null;
  };

  const syncUpCurrentUser = useCallback(async () => {
    try {
      await nodecosmos.get('/sync_current_user');
    } catch (error) {
      switch (error.response.data.error) {
        case 'session_expired':
          dispatch(logout());
          history.push('/login');
          localStorage.removeItem('token');
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
