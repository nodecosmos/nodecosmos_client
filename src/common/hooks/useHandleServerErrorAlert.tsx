import { setAlert } from '../../features/app/appSlice';
import { NodecosmosDispatch } from '../../store';
import { NodecosmosError } from '../../types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// we need to update thunk to return error object from server
export default function useHandleServerErrorAlert() {
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback((error: NodecosmosError) => {
        let message;

        switch (error.status) {
        case 400:
            message = 'Bad request!';
            break;
        case 401:
            message = 'Unauthorized!';
            break;
        case 403:
            message = 'Forbidden!';
            break;
        case 404:
            message = 'Resource not found!';
            break;
        case 409:
            message = `Conflict: ${error.message}`;
            break;
        case 412:
            message = `Precondition Failed: ${error.message}`;
            break;
        case 423:
            message = `Resource Locked: ${error.message}`;
            break;
        default:
            message = 'Something went wrong. Please try again later.';
            break;
        }

        dispatch(setAlert({
            isOpen: true,
            severity: 'error',
            message,
        }));
    }, [dispatch]);
}
