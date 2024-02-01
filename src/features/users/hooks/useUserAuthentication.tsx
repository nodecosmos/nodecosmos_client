import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import {
    create, logIn, LoginForm, logOut,
} from '../users.thunks';
import { UserCreateForm } from '../users.types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function useUserAuthentication() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = useCallback(async (formValues: LoginForm) => {
        const response = await dispatch(logIn(formValues));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            debugger;
            if (error.status === 404) {
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'error',
                    message: 'Incorrect username or password',
                    duration: 5000,
                }));
            }

            return;
        }

        navigate(-1);

        return null;
    }, [dispatch, navigate]);

    const handleLogout = useCallback(() => {
        dispatch(logOut());
    }, [dispatch]);

    const handleUserCreation = useCallback(async (formValues: UserCreateForm) => {
        const response = await dispatch(create(formValues));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            return error.message; // maps error object to final-form submitError
        }

        navigate(-1);
    }, [dispatch, navigate]);

    return {
        handleLogin,
        handleLogout,
        handleUserCreation,
    };
}
