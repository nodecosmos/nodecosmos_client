import { selectAlert } from '../../features/app/app.selectors';
import { setAlert } from '../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../features/app/constants';
import {
    Alert as MuiAlert, Typography, Box,
} from '@mui/material';
import React, {
    useCallback, useEffect, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface AlertProps {
    position?: string;
    mb?: number;
    right?: number | string;
    width?: number | string | {xs: number | string, md: number | string};
    maxWidth?: number | string;
}

export default function Alert(props: AlertProps) {
    const {
        position = 'fixed', mb = 0, right = 'auto', width = '100%', maxWidth = '100%',
    } = props;
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

    const sx = useMemo(() => ({
        position,
        mb,
        right,
    }), [position, mb, right]);

    const alertHTML = useMemo(() => ({ __html: message }), [message]);

    if (!isOpen) return null;

    return (
        <Box
            display={isOpen ? 'flex' : 'none'}
            minHeight={HEADER_HEIGHT}
            width={width}
            maxWidth={maxWidth}
            zIndex={3}
            sx={sx}
        >
            <MuiAlert
                className={severity}
                onClose={handleClose}
                severity={severity}
                variant="outlined"
            >
                <Typography
                    variant="body2"
                    color={`texts.${severity}`}
                    dangerouslySetInnerHTML={alertHTML}
                />
            </MuiAlert>
        </Box>
    );
}
