import { selectAlert } from '../../features/app/app.selectors';
import { setAlert } from '../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../features/app/constants';
import {
    Alert as MuiAlert, Typography, Box,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AlertProps {
    position?: string;
    mb?: number;
}

export default function Alert(props: AlertProps) {
    const { position = 'fixed', mb = 0 } = props;
    const dispatch = useDispatch();
    const {
        isOpen, message, severity,
    } = useSelector(selectAlert);

    const handleClose = useCallback(() => dispatch(
        setAlert({
            isOpen: false,
            message,
            severity,
        }),
    ), [dispatch, message, severity]);

    useEffect(() => () => {
        if (isOpen) {
            handleClose();
        }
    }, [isOpen, handleClose]);

    if (!isOpen) return null;

    return (
        <Box
            display={isOpen ? 'flex' : 'none'}
            minHeight={HEADER_HEIGHT}
            width={1}
            zIndex={3}
            sx={{
                position,
                mb, 
            }}
        >
            <MuiAlert
                onClose={handleClose}
                severity={severity}
                variant="outlined"
                sx={{
                    px: 1,
                    py: 0.35,
                    height: 1,
                    borderRadius: 0.5,
                    width: 'calc(100% - 1px)',
                    borderColor: `${severity}.main`,
                    backgroundColor: 'background.5',
                    '.MuiTypography-root, .MuiAlert-icon, .MuiAlert-message, .MuiAlert-action': {
                        color: `${severity}.main`,
                        // eslint-disable-next-line object-curly-newline
                    },
                    '.MuiAlert-action': {
                        p: 0,
                        mr: 0,
                    },
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            </MuiAlert>
        </Box>
    );
}
