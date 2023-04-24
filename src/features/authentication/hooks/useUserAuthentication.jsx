import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import nodecosmos from '../../../apis/nodecosmos-server';
import { logOut } from '../authentication.thunks';
import { login } from '../authenticationSlice';

export default function useUserAuthentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formValues) => {
    try {
      const response = await nodecosmos.post('/sessions/login', formValues);
      handleAuthentication(response);
    } catch ({ response }) {
      if (response.data) return response.data.error; // maps error object to final-form submitError
    }

    return null;
  };

  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleAuthentication = (response) => {
    const { user } = response.data;

    localStorage.setItem('currentUser', JSON.stringify(user));

    dispatch(login({ user }));

    navigate('/');
  };

  const handleUserCreation = async (formValues) => {
    try {
      const response = await nodecosmos.post('/users', formValues);

      handleAuthentication(response);
    } catch (error) {
      const { response } = error;
      if (response.data) return response.data.error; // maps error object to final-form submitError
      // TODO: check if there is way to map error object to final-form and still use thunks
    }

    return null;
  };

  return {
    handleLogin,
    handleLogout,
    handleUserCreation,
  };
}
