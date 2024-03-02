import DefaultButton from './DefaultButton';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAdd } from '@fortawesome/pro-light-svg-icons';
import React from 'react';

interface DefaultFormButtonProps {
    loading: boolean;
    startIcon?: IconProp;
    title?: string;
    onSubmit?: () => void;
}

export default function DefaultFormButton(props: DefaultFormButtonProps) {
    const {
        loading, startIcon = faAdd, title = 'Create', onSubmit,
    } = props;

    return (
        <DefaultButton
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
        />
    );
}
