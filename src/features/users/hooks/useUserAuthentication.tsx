import useBooleanStateValue from '../../../common/hooks/useBooleanStateValue';
import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { REDIRECT_Q } from '../components/LoginForm';
import { selectCurrentUser } from '../users.selectors';
import {
    create, googleLogin, GoogleLoginResponse, logIn, LoginForm, logOut, updateUsername,
} from '../users.thunks';
import { UserCreateForm } from '../users.types';
import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

async function validateCaptcha(): Promise<string> {
    return new Promise((res) => {
        grecaptcha.ready(() => {
            grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY, { action: 'submit' })
                .then((token: string) => res(token))
                // @ts-ignore
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
    const currentUser = useSelector(selectCurrentUser);

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

            if (error.status === 404 || error.status === 403) {
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
                    redirect,
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
                redirect,
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

    const handleServerError = useHandleServerErrorAlert();

    const handleGoogleLogin = useCallback(async (
        tokenResponse: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>,
    ) => {
        try {
            setLoading();

            const response = await dispatch(googleLogin(tokenResponse));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                unsetLoading();

                handleServerError(error);

                return;
            } else if (response.meta.requestStatus === 'fulfilled') {
                const payload = response.payload as GoogleLoginResponse;

                if (payload.isExistingUser) {
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
                        duration: 5000,
                    })), 250);
                } else {
                    // new user
                    let redirectPath = '/auth/update_username';

                    if (redirect) {
                        redirectPath = `/auth/update_username?${REDIRECT_Q}=${redirect}`;
                    }

                    navigate(redirectPath);
                }
            }
        } catch (error) {
            console.error('Failed to get user info', error);

            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to login with Google. Please try again later.',
                duration: 5000,
            }));
        }
    }, [dispatch, handleServerError, navigate, redirect, setLoading, unsetLoading]);

    const handleUpdateUsername = useCallback(async (formValues: { username: string }) => {
        try {
            setLoading();

            if (!currentUser) {
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'error',
                    message: 'Current user not set!',
                    duration: 5000,
                }));

                console.error('Current user not set!');

                return;
            }

            const payload = {
                id: currentUser.id,
                username: formValues.username,
            };

            const response = await dispatch(updateUsername(payload));

            if (response.meta.requestStatus === 'rejected') {
                const error: NodecosmosError = response.payload as NodecosmosError;

                unsetLoading();

                handleServerError(error);

                return error.message; // maps error object to final-form submitError
            } else if (response.meta.requestStatus === 'fulfilled') {
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
                    message: 'Account created successfully',
                })), 250);
            }
        } catch (error) {
            console.error('Failed to get user info', error);

            dispatch(setAlert({
                isOpen: true,
                severity: 'error',
                message: 'Failed to login with Google. Please try again later.',
                duration: 5000,
            }));
        }
    }, [currentUser, dispatch, handleServerError, navigate, redirect, setLoading, unsetLoading]);

    const handleGoogleLoginError = useCallback((
        errorResponse: Pick<CodeResponse, 'error' | 'error_description' | 'error_uri'>,
    ) => {
        dispatch(setAlert({
            isOpen: true,
            severity: 'error',
            message: errorResponse.error,
            duration: 5000,
        }));
    }, [dispatch]);

    const continueWithGoogle = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: handleGoogleLogin,
        onError: handleGoogleLoginError,
    });

    return useMemo(() => ({
        loading,
        redirect,
        handleLogin,
        handleLogout,
        handleUserCreation,
        handleUpdateUsername,
        continueWithGoogle,
    }),
    [handleLogin, continueWithGoogle, handleLogout, handleUpdateUsername, handleUserCreation, loading, redirect]);
}
