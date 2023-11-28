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
    onChange: (value: string) => void;
    reqData?: object;
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
                maxWidth: '350px',
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
