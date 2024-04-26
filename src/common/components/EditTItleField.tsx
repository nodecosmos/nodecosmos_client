import EditTitleFieldInput from './EditTitleFieldInput';
import useBooleanStateValue from '../hooks/useBooleanStateValue';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import React, { useCallback } from 'react';

interface EditTitleFieldProps {
    title: string;
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
        color = 'text.secondary',
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

    const handleEditClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
        unsetEditing();
    }, [onClose, unsetEditing]);

    if (editing) {
        return (
            <EditTitleFieldInput
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
            onClick={setEditing}
            variant={variant}
            sx={{
                pr,
                height: 1,
                display: 'table-cell',
                verticalAlign: 'middle',
                maxWidth,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: (title && color) || 'text.tertiary',
            }}
        >
            {title || 'Click to add title'}
        </Typography>
    );
}
