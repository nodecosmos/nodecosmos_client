import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useMemo } from 'react';

interface DefaultButtonProps {
    startIcon?: IconProp;
    endIcon?: IconProp;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    title: string;
    disabled?: boolean;
    sx?: object;
    fontSize?: string;
    variant?: 'contained' | 'outlined' | 'text';
    loading?: boolean;
    color?: 'info' | 'warning' | 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'button' | 'toggle';
    width?: string | number;
    height?: string | number;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}
function DefaultButton(props: DefaultButtonProps) {
    const {
        startIcon,
        endIcon,
        onClick,
        title,
        className,
        type = 'button',
        disabled = false,
        sx = {},
        fontSize = '0.75rem',
        variant = 'contained',
        loading = false,
        color = 'button',
        width = 'auto',
        height = '32px',
        size = 'small',
    } = props;

    const buttonSx = useMemo(() => ({
        width,
        height,
        '.MuiButton-startIcon': {
            display: 'flex',
            alignItems: 'center',
            svg: { fontSize: 16 },
        },
        '.MuiTypography-root': { fontSize },
        ...sx,
    }), [fontSize, height, sx, width]);

    return (
        <Button
            className={className}
            size={size}
            color={color}
            type={type}
            disabled={disabled || loading}
            sx={buttonSx}
            variant={variant}
            disableElevation
            startIcon={
                startIcon
                && (
                    loading
                        ? <CircularProgress size={20} />
                        : <FontAwesomeIcon icon={startIcon} />
                )
            }
            endIcon={endIcon && <FontAwesomeIcon icon={endIcon} />}
            onClick={onClick}
        >
            <Typography variant="subtitle1">
                {title}
            </Typography>
        </Button>
    );
}

export default React.memo(DefaultButton);
