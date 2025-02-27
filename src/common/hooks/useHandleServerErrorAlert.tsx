import { setAlert } from '../../features/app/appSlice';
import { NodecosmosDispatch } from '../../store';
import { HttpErrorCodes, NodecosmosError } from '../../types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

// we need to update thunk to return error object from server
export default function useHandleServerErrorAlert(isModal = false) {
    const dispatch: NodecosmosDispatch = useDispatch();

    return useCallback((error: NodecosmosError) => {
        let message;

        switch (error.status) {
        case HttpErrorCodes.BadRequest:
            message = 'Bad request!';
            if (error.message) {
                message += ` ${error.message}`;
            }
            break;
        case HttpErrorCodes.Unauthorized:
            message = 'Unauthorized!';
            if (error.message) {
                message += ` ${error.message}`;
            }
            break;
        case HttpErrorCodes.Forbidden:
            message = 'Forbidden';

            if (typeof error.message === 'string') {
                message += `: ${error.message}`;
            } else {
                message += '!';
            }

            break;
        case HttpErrorCodes.NotFound:
            message = 'Resource not found!';
            break;
        case HttpErrorCodes.Conflict:
            message = `Conflict: ${error.message}`;
            break;
        case HttpErrorCodes.PreconditionFailed:
            message = `Precondition Failed: ${error.message}`;
            break;
        case HttpErrorCodes.ResourceLocked:
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
            isModal,
        }));
    }, [dispatch, isModal]);
}
