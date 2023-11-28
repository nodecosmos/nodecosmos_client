import nodecosmos from '../../../apis/nodecosmos-server';
import { setAlert } from '../../app/appSlice';
import { logOut } from '../authentication.thunks';
import { login } from '../authenticationSlice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useUserAuthentication() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAuthentication = useCallback((response) => {
        const { user } = response.data;

        dispatch(login({ user }));

        navigate('/');
    }, [dispatch, navigate]);

    const handleLogin = useCallback(async (formValues) => {
        try {
            const response = await nodecosmos.post('/sessions/login', formValues);
            handleAuthentication(response);
        } catch ({ response }) {
            if (response.status === 404) {
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'error',
                    message: 'Incorrect username or password',
                    duration: 5000,
                }));
            }
        }

        return null;
    }, [dispatch, handleAuthentication]);

    const handleLogout = useCallback(() => {
        dispatch(logOut());
    }, [dispatch]);

    const handleUserCreation = useCallback(async (formValues) => {
        try {
            const response = await nodecosmos.post('/users', formValues);

            handleAuthentication(response);
        } catch (error) {
            const { response } = error;
            if (response.data) return response.data.error; // maps error object to final-form submitError
            // TODO: check if there is way to map error object to final-form and still use thunks
        }

        return null;
    }, [handleAuthentication]);

    return {
        handleLogin,
        handleLogout,
        handleUserCreation,
    };
}
