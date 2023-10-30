import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function DefaultButton({
    startIcon, endIcon, onClick, type, title, disabled, sx, fontSize,
}) {
    return (
        <Button
            size="small"
            color="button"
            type={type}
            disabled={disabled}
            sx={{
                border: 1,
                borderColor: 'borders.4',
                '.MuiButton-startIcon': {
                    display: 'flex',
                    alignItems: 'center',
                    svg: {
                        fontSize: 16,
                    },
                },
                '.MuiTypography-root': {
                    fontSize,
                },
                ...sx,
            }}
            variant="contained"
            disableElevation
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
        >
            <Typography variant="subtitle1">
                {title}
            </Typography>
        </Button>
    );
}
DefaultButton.defaultProps = {
    onClick: () => {},
    type: 'button',
    startIcon: null,
    endIcon: null,
    disabled: false,
    sx: {},
    fontSize: '0.75rem',
};

DefaultButton.propTypes = {
    type: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    startIcon: PropTypes.object,
    endIcon: PropTypes.object,
    sx: PropTypes.object,
    title: PropTypes.string.isRequired,
    fontSize: PropTypes.string,
};
