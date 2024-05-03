import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    maxWidth?: string | number;
    to?: string;
}

export default function NcLink(props: Props) {
    const {
        title, maxWidth = '100%', to = '',
    } = props;

    return (
        <Typography
            component={to ? Link : 'span'}
            to={to}
            variant="body2"
            color="text.link"
            fontWeight="bold"
            p={0.5}
            px={2}
            borderRadius={1}
            key="2"
            sx={{
                maxWidth,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
                '&:hover': {
                    backgroundColor: 'toolbar.hover',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    color: 'text.link',
                },
                backgroundColor: 'toolbar.active',
            }}
        >
            {title}

        </Typography>
    );
}
