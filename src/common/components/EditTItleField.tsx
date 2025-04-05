import EditTitleFieldInput from './EditTitleFieldInput';
import useBooleanStateValue from '../hooks/useBooleanStateValue';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import React, { useCallback } from 'react';

const SX = {
    height: 1,
    display: 'table-cell',
    verticalAlign: 'middle',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
};

interface EditTitleFieldProps {
    title: string;
    className?: string;
    placeholder?: string;
    authorized?: boolean;
    color?: string;
    pr?: number;
    variant?: Variant;
    onChange: (value: string) => void;
    onClose?: () => void;
    maxWidth?: number | string;
    inputHeight?: number | string;
    inputFontSize?: number | string;
    inputFontWeight?: number | string;
    inputBorder?: string;
    defaultEditing?: boolean;
}

export default function EditTitleField(props: EditTitleFieldProps) {
    const {
        title,
        className,
        placeholder = 'Add title',
        authorized = true,
        color = 'texts.secondary',
        pr = 0,
        variant = 'body2',
        onChange,
        onClose,
        maxWidth = '350px',
        inputHeight = 32,
        inputFontSize = 'inherit',
        inputFontWeight = 'inherit',
        inputBorder = 'borders.4',
        defaultEditing = false,
    } = props;
    const [editing, setEditing, unsetEditing] = useBooleanStateValue(defaultEditing);

    const edit = useCallback(() => {
        if (authorized) setEditing();
    }, [authorized, setEditing]);

    const handleEditClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
        unsetEditing();
    }, [onClose, unsetEditing]);

    if (editing) {
        return (
            <EditTitleFieldInput
                className={className}
                placeholder={placeholder}
                title={title}
                onChange={onChange}
                onClose={handleEditClose}
                maxWidth={maxWidth}
                inputHeight={inputHeight}
                inputFontSize={inputFontSize}
                inputFontWeight={inputFontWeight}
                inputBorder={inputBorder}
            />
        );
    }

    return (
        <Typography
            className={className}
            onClick={edit}
            variant={variant}
            pr={pr}
            maxWidth={maxWidth}
            color={(title && color) || 'texts.tertiary'}
            sx={SX}
        >
            {title || placeholder}
        </Typography>
    );
}
