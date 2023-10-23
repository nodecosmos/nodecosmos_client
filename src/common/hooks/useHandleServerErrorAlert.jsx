import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAlert } from '../../features/app/appSlice';

// we need to update thunk to return error object from server
export default function useHandleServerErrorAlert() {
    const dispatch = useDispatch();

    return useCallback((error) => {
        let message;

        if (error.message.includes('404')) {
            message = 'Resource not found!';
        } else if (error.message.includes('403')) {
            message = 'Forbidden!';
        } else if (error.message.includes('409')) {
            message = 'Conflict!';
        } else if (error.message.includes('423')) {
            message = 'Resource Locked: Reorder in progress. If issue persist contact support.';
        } else {
            message = 'Something went wrong. Please try again later.';
        }

        dispatch(setAlert({ isOpen: true, severity: 'error', message }));
    }, [dispatch]);
}
