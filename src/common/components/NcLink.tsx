import { Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
    title: string;
    to: string;
}

function NcLink(props: Props) {
    const { title, to = '' } = props;

    return (
        <Typography
            className="NcLink"
            component={to ? Link : 'span'}
            to={to}
            variant="body2"
            color="texts.link"
            fontWeight="bold"
            p={0.5}
            px={2}
            borderRadius={1}
            key="2"
        >
            {title}
        </Typography>
    );
}

export default React.memo(NcLink);
