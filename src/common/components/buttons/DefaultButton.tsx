import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

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
    color?: 'primary' | 'secondary' | 'button';
}
export default function DefaultButton(props: DefaultButtonProps) {
    const {
        startIcon,
        endIcon,
        onClick,
        type = 'button',
        title,
        disabled = false,
        sx = {},
        fontSize = '0.75rem',
        variant = 'contained',
        loading = false,
        color = 'button',
    } = props;

    return (
        <Button
            size="small"
            color={color}
            type={type}
            disabled={disabled}
            sx={{
                border: 1,
                borderColor: 'borders.4',
                '.MuiButton-startIcon': {
                    display: 'flex',
                    alignItems: 'center',
                    svg: { fontSize: 16 },
                },
                '.MuiTypography-root': { fontSize },
                ...sx,
            }}
            variant={variant}
            disableElevation
            startIcon={
                startIcon
                && (
                    loading
                        ? <CircularProgress size={20} sx={{ color: 'text.foreground' }} />
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
