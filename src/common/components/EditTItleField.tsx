import EditTitleFieldInput from './EditTitleFieldInput';
import useBooleanStateValue from '../hooks/useBooleanStateValue';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import React from 'react';

interface EditTitleFieldProps {
    title: string;
    color?: string;
    pr?: number;
    variant?: Variant;
    endpoint: string;
    onChange?: (value: string) => void;
    reqData?: object;
    maxWidth?: number | string;
    inputHeight?: number | string;
    inputFontSize?: number | string;
    inputFontWeight?: number | string;
    inputBorder?: string;
    inputP?: number;
}

export default function EditTitleField(props: EditTitleFieldProps) {
    const {
        title,
        color = 'text.secondary',
        pr = 0,
        variant = 'body2',
        endpoint,
        onChange,
        reqData,
        maxWidth = '350px',
        inputHeight = 32,
        inputFontSize = 'inherit',
        inputFontWeight = 'inherit',
        inputBorder = 'borders.4',
        inputP = 1,
    } = props;
    const [editing, setEditing, unsetEditing] = useBooleanStateValue();

    if (editing) {
        return (
            <EditTitleFieldInput
                title={title}
                onChange={onChange}
                onClose={unsetEditing}
                endpoint={endpoint}
                reqData={reqData}
                maxWidth={maxWidth}
                inputHeight={inputHeight}
                inputFontSize={inputFontSize}
                inputFontWeight={inputFontWeight}
                inputBorder={inputBorder}
                inputP={inputP}
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
