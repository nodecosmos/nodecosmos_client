import { setAlert } from '../../features/app/appSlice';
import { HEADER_HEIGHT } from '../../features/app/constants';
import {
    Alert as MuiAlert, Typography, Box,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Alert({ position }) {
    const dispatch = useDispatch();
    const {
        isOpen, message, severity, anchorOrigin, 
    } = useSelector((state) => state.app.alert);

    const handleClose = useCallback(() => dispatch(
        setAlert({ isOpen: false, message, severity }),
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
            onClose={handleClose}
            anchororigin={anchorOrigin}
            minHeight={HEADER_HEIGHT}
            position={position}
            width={1}
            zIndex={3}
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

Alert.defaultProps = {
    position: 'fixed',
};

Alert.propTypes = {
    position: PropTypes.string,
};
