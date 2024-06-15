import DefaultButton from './DefaultButton';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import React from 'react';

interface DefaultFormButtonProps {
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'info' | 'warning' | 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'button' | 'toggle';
    loading: boolean;
    startIcon?: IconProp;
    title?: string;
    onSubmit?: () => void;
    width?: string | number;
    height?: string | number;
}

export default function DefaultFormButton(props: DefaultFormButtonProps) {
    const {
        loading, startIcon = faAdd, title = 'Create', onSubmit, color, variant, width, height,
    } = props;

    return (
        <DefaultButton
            variant={variant}
            color={color}
            sx={{
                mt: 3,
                float: 'right',
            }}
            title={title}
            type="submit"
            disabled={loading}
            fontSize="0.875rem"
            onClick={onSubmit}
            loading={loading}
            startIcon={startIcon}
            width={width}
            height={height}
        />
    );
}
