import { Alert as MuiAlert, Typography } from '@mui/material';
import React from 'react';

interface Props {
    className?: string;
    severity: 'warning' | 'error' | 'info' | 'success';
    message: string;
}

export default function SimpleAlert(props: Props) {
    const {
        className = null, severity, message,
    } = props;

    return (
        <MuiAlert
            className={`SimpleAlert ${severity} ${className}`}
            severity={severity}
            variant="outlined"
        >
            <Typography
                variant="body2"
                color={`texts.${severity}`}
                dangerouslySetInnerHTML={{ __html: message }}
            />
        </MuiAlert>
    );
}
