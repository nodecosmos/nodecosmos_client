import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NcLink({
    title, maxWidth, to, onClick, 
}) {
    return (
        <Typography
            onClick={onClick}
            component={to ? Link : 'span'}
            to={to}
            variant="body2"
            color="text.link"
            fontWeight="bold"
            p={0.5}
            px={2}
            borderRadius={1}
            backgroundColor="toolbar.active"
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
            }}
        >
            {title}

        </Typography>
    );
}

NcLink.defaultProps = {
    onClick: null,
    to: null,
    maxWidth: '100%',
};

NcLink.propTypes = {
    title: PropTypes.string.isRequired,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    to: PropTypes.string,
    onClick: PropTypes.func,
};
