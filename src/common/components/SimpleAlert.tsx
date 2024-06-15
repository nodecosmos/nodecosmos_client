import { Alert as MuiAlert, Typography } from '@mui/material';
import React from 'react';

interface Props {
    severity: 'warning' | 'error' | 'info' | 'success';
    message: string;
}

export default function SimpleAlert(props: Props) {
    const { severity, message } = props;

    return (
        <MuiAlert
            className={`SimpleAlert ${severity}`}
            severity={severity}
            variant="outlined"
        >
            <Typography
                variant="body2"
                color={`text.${severity}`}
                dangerouslySetInnerHTML={{ __html: message }}
            />
        </MuiAlert>
    );
}
