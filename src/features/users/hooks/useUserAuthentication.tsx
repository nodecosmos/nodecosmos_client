import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { REDIRECT_Q } from '../components/LoginForm';
import {
    create, logIn, LoginForm, logOut,
} from '../users.thunks';
import { UserCreateForm } from '../users.types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function useUserAuthentication() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get(REDIRECT_Q);

    const handleLogin = useCallback(async (formValues: LoginForm) => {
        const response = await dispatch(logIn(formValues));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

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

        if (redirect) {
            const url = new URL(atob(redirect));
            const path = url.pathname + url.search;
            navigate(path);

            setTimeout(() => dispatch(setAlert({
                isOpen: true,
                severity: 'success',
                message: 'Logged in successfully',
            })), 250);

            return null;
        } else {
            navigate(-1);
        }

        return null;
    }, [dispatch, navigate, redirect]);

    const handleLogout = useCallback(() => {
        dispatch(logOut());
    }, [dispatch]);

    const handleUserCreation = useCallback(async (formValues: UserCreateForm) => {
        const response = await dispatch(create(formValues));

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            return error.message; // maps error object to final-form submitError
        }

        dispatch(setAlert({
            isOpen: true,
            severity: 'success',
            message: 'Activation link sent! Please check your email to activate your account.',
            duration: 5000,
        }));

        let redirectPath = '/auth/login';

        if (redirect) {
            redirectPath = `/auth/login?${REDIRECT_Q}=${redirect}`;
        }

        navigate(redirectPath);
    }, [dispatch, navigate, redirect]);

    return {
        redirect,
        handleLogin,
        handleLogout,
        handleUserCreation,
    };
}
