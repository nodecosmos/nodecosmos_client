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
            severity={severity}
            variant="outlined"
            sx={{
                mt: 2,
                px: 1,
                py: 0.35,
                height: 1,
                borderRadius: 0.5,
                width: 'calc(100% - 1px)',
                borderColor: `${severity}.main`,
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
    );
}
