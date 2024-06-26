import useHandleServerErrorAlert from '../../../common/hooks/useHandleServerErrorAlert';
import { NodecosmosDispatch } from '../../../store';
import { NodecosmosError } from '../../../types';
import { setAlert } from '../../app/appSlice';
import { selectCurrentUser } from '../users.selectors';
import { confirmEmail, resendConfirmationEmail } from '../users.thunks';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function useProfileConfirmation() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const handleServerError = useHandleServerErrorAlert();
    const [loading, setLoading] = React.useState(false);
    const [searchParams] = useSearchParams();
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const handleResendConfirmationEmail = useCallback(async () => {
        setLoading(true);
        const response = await dispatch(resendConfirmationEmail());
        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);
            setLoading(false);
            return;
        }

        dispatch(setAlert({
            message: 'Confirmation email has been sent.',
            severity: 'success',
        }));
        setLoading(false);
    }, [dispatch, handleServerError]);

    const handleConfirmEmail = useCallback(async () => {
        const token = searchParams.get('token');

        if (!token) return;
        setLoading(true);

        const response = await dispatch(confirmEmail(token));
        if (response.meta.requestStatus === 'rejected') {
            const error: NodecosmosError = response.payload as NodecosmosError;
            handleServerError(error);
            console.error(error);
            setLoading(false);
            return;
        } else if (response.meta.requestStatus === 'fulfilled') {
            const data = response.payload as { id: string, email: string };

            if (currentUser) {
                dispatch(setAlert({
                    isOpen: true,
                    message: 'Email confirmed.',
                    severity: 'success',
                }));
                setLoading(false);
            } else {
                navigate(`/auth/login?email=${data.email}`);
                setLoading(false);
                setTimeout(() => {
                    dispatch(setAlert({
                        isOpen: true,
                        message: 'Email confirmed. Please login to continue.',
                        severity: 'success',
                    }));
                }, 250);
            }
        }

        setLoading(false);
    }, [currentUser, dispatch, handleServerError, navigate, searchParams]);

    return useMemo(() => ({
        loading,
        handleResendConfirmationEmail,
        handleConfirmEmail,
    }), [loading, handleResendConfirmationEmail, handleConfirmEmail]);
}
