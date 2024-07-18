import { NodecosmosDispatch } from '../../../store';
import { selectCurrentUser } from '../../users/users.selectors';
import { setAlert } from '../appSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useConfirmEmailAlert() {
    const dispatch: NodecosmosDispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const token = searchParams.get('token');

        if (currentUser && !currentUser.isConfirmed && !token) {
            setTimeout(() => {
                dispatch(setAlert({
                    isOpen: true,
                    severity: 'warning',
                    message: `Please confirm your email address to access all features.
                if you didn't receive the email, please check your spam folder or request a new one from profile 
                options. If you still have issues, please write us at <b>support@nodecosmos.com</b>`,
                    duration: 100000000,
                }));
            }, 10);
        }
        // eslint-disable-next-line
    }, []);
}
