import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
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

async function validateCaptcha(): Promise<string> {
    return new Promise((res) => {
        grecaptcha.ready(() => {
            grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' })
                .then((token: string) => res(token))
                .catch((error: Error) => {
                    console.error('Error executing reCAPTCHA:', error);
                    throw error;
                });
        });
    });
}

export default function useUserAuthentication() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get(REDIRECT_Q);
    const token = searchParams.get('token');
    const [loading, setLoading, unsetLoading] = useBooleanStateValue(false);

    const handleLogin = useCallback(async (formValues: LoginForm) => {
        setLoading();

        let response;
        if (import.meta.env.VITE_RECAPTCHA_ENABLED) {
            try {
                const rToken = await validateCaptcha();

                // Dispatch the login action with the token
                response = await dispatch(logIn({
                    ...formValues,
                    rToken,
                }));
            } catch (error) {
                unsetLoading();

                console.error('Error retrieving reCAPTCHA token:', error);
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'error',
                    message: 'Something went wrong. Please try again later.',
                    duration: 5000,
                }));
                return;
            }
        } else {
            response = await dispatch(logIn(formValues));
        }

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;

            unsetLoading();

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
        } else {
            navigate('/');
        }

        setTimeout(() => dispatch(setAlert({
            isOpen: true,
            severity: 'success',
            message: 'Logged in successfully',
        })), 250);

        unsetLoading();
        return null;
    }, [dispatch, navigate, redirect, setLoading, unsetLoading]);

    const handleLogout = useCallback(() => {
        dispatch(logOut());
    }, [dispatch]);

    const handleUserCreation = useCallback(async (formValues: UserCreateForm) => {
        setLoading();

        let response;
        if (import.meta.env.VITE_RECAPTCHA_ENABLED) {
            try {
                const rToken = await validateCaptcha();

                // Dispatch the login action with the token
                response = await dispatch(create({
                    token,
                    rToken,
                    ...formValues,
                }));
            } catch (error) {
                unsetLoading();

                console.error('Error retrieving reCAPTCHA token:', error);
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'error',
                    message: 'Something went wrong. Please try again later.',
                    duration: 5000,
                }));
                return;
            }
        } else {
            response = await dispatch(create({
                token,
                ...formValues,
            }));
        }

        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            unsetLoading();

            return error.message; // maps error object to final-form submitError
        }

        // current user is set from token
        if (response.payload) {
            if (redirect) {
                const url = new URL(atob(redirect));
                const path = url.pathname + url.search;
                navigate(path);
            }
        } else {
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
            unsetLoading();
        }
    }, [dispatch, navigate, redirect, setLoading, token, unsetLoading]);

    return {
        loading,
        redirect,
        handleLogin,
        handleLogout,
        handleUserCreation,
    };
}
